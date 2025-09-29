const express = require('express')
const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')
const router = express.Router()

// Create new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, shipping, billing, payment } = req.body

    // Validate items and check inventory
    for (const item of items) {
      const product = await Product.findById(item.product)
      if (!product) {
        return res.status(400).json({ message: `Product ${item.product} not found` })
      }

      if (!product.isAvailable(item.quantity)) {
        return res.status(400).json({ 
          message: `Insufficient inventory for ${product.name}` 
        })
      }
    }

    // Calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.product)
      const itemTotal = product.price * item.quantity
      subtotal += itemTotal

      orderItems.push({
        product: item.product,
        variant: item.variant,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
        prescription: item.prescription
      })
    }

    const tax = subtotal * 0.08 // 8% tax
    const shippingCost = shipping.method === 'express' ? 15 : 0
    const total = subtotal + tax + shippingCost

    // Create order
    const order = new Order({
      user: userId,
      items: orderItems,
      pricing: {
        subtotal,
        tax,
        shipping: shippingCost,
        total
      },
      shipping,
      billing,
      payment
    })

    await order.save()

    // Update inventory
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { 'inventory.available': -item.quantity } }
      )
    }

    res.status(201).json({
      message: 'Order created successfully',
      order
    })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const filter = { user: req.params.userId }

    if (status) {
      filter.status = status
    }

    const orders = await Order.find(filter)
      .populate('items.product', 'name images slug')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Order.countDocuments(filter)

    res.json({
      orders,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
        limit: Number(limit)
      }
    })
  } catch (error) {
    console.error('Get user orders error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name images slug brand')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json({ order })
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, message } = req.body
    const { userId } = req.body

    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    await order.updateStatus(status, message, userId)

    res.json({
      message: 'Order status updated successfully',
      order
    })
  } catch (error) {
    console.error('Update order status error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Cancel order
router.put('/:id/cancel', async (req, res) => {
  try {
    const { reason } = req.body

    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({ 
        message: 'Cannot cancel order that has been shipped' 
      })
    }

    // Restore inventory
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { 'inventory.available': item.quantity } }
      )
    }

    order.status = 'cancelled'
    order.notes.internal = reason
    await order.save()

    res.json({
      message: 'Order cancelled successfully',
      order
    })
  } catch (error) {
    console.error('Cancel order error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all orders (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const { page = 1, limit = 20, status, dateFrom, dateTo } = req.query
    const filter = {}

    if (status) {
      filter.status = status
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {}
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom)
      if (dateTo) filter.createdAt.$lte = new Date(dateTo)
    }

    const orders = await Order.find(filter)
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Order.countDocuments(filter)

    res.json({
      orders,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
        limit: Number(limit)
      }
    })
  } catch (error) {
    console.error('Get all orders error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get order analytics (admin)
router.get('/admin/analytics', async (req, res) => {
  try {
    const { period = '30d' } = req.query
    
    let dateFilter = {}
    const now = new Date()
    
    switch (period) {
      case '7d':
        dateFilter = { createdAt: { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } }
        break
      case '30d':
        dateFilter = { createdAt: { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } }
        break
      case '90d':
        dateFilter = { createdAt: { $gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) } }
        break
    }

    const analytics = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$pricing.total' },
          averageOrderValue: { $avg: '$pricing.total' },
          statusBreakdown: {
            $push: '$status'
          }
        }
      }
    ])

    const statusCounts = {}
    if (analytics[0]?.statusBreakdown) {
      analytics[0].statusBreakdown.forEach(status => {
        statusCounts[status] = (statusCounts[status] || 0) + 1
      })
    }

    res.json({
      totalOrders: analytics[0]?.totalOrders || 0,
      totalRevenue: analytics[0]?.totalRevenue || 0,
      averageOrderValue: analytics[0]?.averageOrderValue || 0,
      statusBreakdown: statusCounts
    })
  } catch (error) {
    console.error('Get order analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
