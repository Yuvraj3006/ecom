const express = require('express')
const User = require('../models/User')
const Order = require('../models/Order')
const router = express.Router()

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, phone, dateOfBirth, preferences } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (phone) user.phone = phone
    if (dateOfBirth) user.dateOfBirth = dateOfBirth
    if (preferences) user.preferences = { ...user.preferences, ...preferences }

    await user.save()

    res.json({
      message: 'Profile updated successfully',
      user
    })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Add address
router.post('/:id/addresses', async (req, res) => {
  try {
    const { type, street, city, state, zipCode, country, isDefault } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // If this is set as default, unset other defaults of the same type
    if (isDefault) {
      user.addresses.forEach(addr => {
        if (addr.type === type) {
          addr.isDefault = false
        }
      })
    }

    user.addresses.push({
      type,
      street,
      city,
      state,
      zipCode,
      country,
      isDefault: isDefault || false
    })

    await user.save()

    res.json({
      message: 'Address added successfully',
      user
    })
  } catch (error) {
    console.error('Add address error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update address
router.put('/:id/addresses/:addressId', async (req, res) => {
  try {
    const { street, city, state, zipCode, country, isDefault } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const address = user.addresses.id(req.params.addressId)
    if (!address) {
      return res.status(404).json({ message: 'Address not found' })
    }

    if (street) address.street = street
    if (city) address.city = city
    if (state) address.state = state
    if (zipCode) address.zipCode = zipCode
    if (country) address.country = country
    if (isDefault !== undefined) {
      if (isDefault) {
        // Unset other defaults of the same type
        user.addresses.forEach(addr => {
          if (addr.type === address.type && addr._id.toString() !== req.params.addressId) {
            addr.isDefault = false
          }
        })
      }
      address.isDefault = isDefault
    }

    await user.save()

    res.json({
      message: 'Address updated successfully',
      user
    })
  } catch (error) {
    console.error('Update address error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete address
router.delete('/:id/addresses/:addressId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.addresses.id(req.params.addressId).remove()
    await user.save()

    res.json({
      message: 'Address deleted successfully',
      user
    })
  } catch (error) {
    console.error('Delete address error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Add prescription
router.post('/:id/prescriptions', async (req, res) => {
  try {
    const prescriptionData = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.prescriptions.push(prescriptionData)
    await user.save()

    res.json({
      message: 'Prescription added successfully',
      user
    })
  } catch (error) {
    console.error('Add prescription error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update prescription
router.put('/:id/prescriptions/:prescriptionId', async (req, res) => {
  try {
    const updateData = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const prescription = user.prescriptions.id(req.params.prescriptionId)
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' })
    }

    Object.assign(prescription, updateData)
    await user.save()

    res.json({
      message: 'Prescription updated successfully',
      user
    })
  } catch (error) {
    console.error('Update prescription error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete prescription
router.delete('/:id/prescriptions/:prescriptionId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.prescriptions.id(req.params.prescriptionId).remove()
    await user.save()

    res.json({
      message: 'Prescription deleted successfully',
      user
    })
  } catch (error) {
    console.error('Delete prescription error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Add to wishlist
router.post('/:id/wishlist', async (req, res) => {
  try {
    const { productId } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId)
      await user.save()
    }

    res.json({
      message: 'Product added to wishlist',
      user
    })
  } catch (error) {
    console.error('Add to wishlist error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Remove from wishlist
router.delete('/:id/wishlist/:productId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId)
    await user.save()

    res.json({
      message: 'Product removed from wishlist',
      user
    })
  } catch (error) {
    console.error('Remove from wishlist error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get user orders
router.get('/:id/orders', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const filter = { user: req.params.id }

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

// Get user analytics (admin)
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

    const analytics = await User.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          newUsers: { $sum: 1 },
          activeUsers: {
            $sum: {
              $cond: [{ $gte: ['$lastLogin', new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)] }, 1, 0]
            }
          }
        }
      }
    ])

    res.json({
      totalUsers: analytics[0]?.totalUsers || 0,
      newUsers: analytics[0]?.newUsers || 0,
      activeUsers: analytics[0]?.activeUsers || 0
    })
  } catch (error) {
    console.error('Get user analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
