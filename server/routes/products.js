const express = require('express')
const Product = require('../models/Product')
const router = express.Router()

// Get all products with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subcategory,
      minPrice,
      maxPrice,
      colors,
      faceShape,
      style,
      search,
      sort = 'createdAt',
      order = 'desc',
      featured,
      onSale
    } = req.query

    const filter = { isActive: true }

    // Category filter
    if (category) {
      filter.category = category
    }

    // Subcategory filter
    if (subcategory) {
      filter.subcategory = subcategory
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    // Colors filter
    if (colors) {
      const colorArray = colors.split(',')
      filter['attributes.colors'] = { $in: colorArray }
    }

    // Face shape filter
    if (faceShape) {
      filter['attributes.faceShape'] = { $in: faceShape.split(',') }
    }

    // Style filter
    if (style) {
      filter['attributes.style'] = { $in: style.split(',') }
    }

    // Search filter
    if (search) {
      filter.$text = { $search: search }
    }

    // Featured filter
    if (featured === 'true') {
      filter.isFeatured = true
    }

    // On sale filter
    if (onSale === 'true') {
      filter.isOnSale = true
    }

    // Sort options
    const sortOptions = {}
    sortOptions[sort] = order === 'desc' ? -1 : 1

    const products = await Product.find(filter)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('relatedProducts', 'name price images')
      .populate('crossSellProducts', 'name price images')
      .populate('upsellProducts', 'name price images')

    const total = await Product.countDocuments(filter)

    res.json({
      products,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
        limit: Number(limit)
      }
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('relatedProducts', 'name price images slug')
      .populate('crossSellProducts', 'name price images slug')
      .populate('upsellProducts', 'name price images slug')

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Increment view count
    product.viewCount += 1
    await product.save()

    res.json({ product })
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get product by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('relatedProducts', 'name price images slug')
      .populate('crossSellProducts', 'name price images slug')
      .populate('upsellProducts', 'name price images slug')

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Increment view count
    product.viewCount += 1
    await product.save()

    res.json({ product })
  } catch (error) {
    console.error('Get product by slug error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get featured products
router.get('/featured/list', async (req, res) => {
  try {
    const { limit = 8 } = req.query

    const products = await Product.find({
      isActive: true,
      isFeatured: true
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit))

    res.json({ products })
  } catch (error) {
    console.error('Get featured products error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get related products
router.get('/:id/related', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const relatedProducts = await Product.find({
      _id: { $in: product.relatedProducts },
      isActive: true
    }).limit(4)

    res.json({ products: relatedProducts })
  } catch (error) {
    console.error('Get related products error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get product recommendations based on quiz results
router.post('/recommendations', async (req, res) => {
  try {
    const { faceShape, style, lifestyle, colors, budget } = req.body

    const filter = { isActive: true }

    // Face shape matching
    if (faceShape) {
      filter['attributes.faceShape'] = { $in: [faceShape] }
    }

    // Style matching
    if (style && style.length > 0) {
      filter['attributes.style'] = { $in: style }
    }

    // Color matching
    if (colors && colors.length > 0) {
      filter['attributes.colors'] = { $in: colors }
    }

    // Budget matching
    if (budget) {
      switch (budget) {
        case 'under-200':
          filter.price = { $lt: 200 }
          break
        case '200-400':
          filter.price = { $gte: 200, $lt: 400 }
          break
        case '400-600':
          filter.price = { $gte: 400, $lt: 600 }
          break
        case '600-plus':
          filter.price = { $gte: 600 }
          break
      }
    }

    const products = await Product.find(filter)
      .sort({ 'ratings.average': -1, salesCount: -1 })
      .limit(6)

    res.json({ products })
  } catch (error) {
    console.error('Get recommendations error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params
    const { page = 1, limit = 12 } = req.query

    const products = await Product.find({
      $text: { $search: query },
      isActive: true
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Product.countDocuments({
      $text: { $search: query },
      isActive: true
    })

    res.json({
      products,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
        limit: Number(limit)
      }
    })
  } catch (error) {
    console.error('Search products error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get product categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Product.distinct('category', { isActive: true })
    const subcategories = await Product.distinct('subcategory', { isActive: true })
    const colors = await Product.distinct('attributes.colors', { isActive: true })
    const styles = await Product.distinct('attributes.style', { isActive: true })
    const faceShapes = await Product.distinct('attributes.faceShape', { isActive: true })

    res.json({
      categories,
      subcategories,
      colors,
      styles,
      faceShapes
    })
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
