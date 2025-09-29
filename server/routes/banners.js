const express = require('express')
const Banner = require('../models/Banner')
const router = express.Router()

// Get active banners
router.get('/active', async (req, res) => {
  try {
    const { position, audience, location, device } = req.query
    const filters = {}

    if (position) filters.position = position
    if (audience) filters['targeting.audience'] = audience
    if (location) filters['targeting.location'] = location
    if (device) filters['targeting.device'] = device

    const banners = await Banner.getActiveBanners(filters)

    res.json({ banners })
  } catch (error) {
    console.error('Get active banners error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all banners (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const { page = 1, limit = 20, isActive, type, position } = req.query
    const filter = {}

    if (isActive !== undefined) filter['settings.isActive'] = isActive === 'true'
    if (type) filter.type = type
    if (position) filter.position = position

    const banners = await Banner.find(filter)
      .populate('createdBy', 'firstName lastName')
      .populate('lastModifiedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Banner.countDocuments(filter)

    res.json({
      banners,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
        limit: Number(limit)
      }
    })
  } catch (error) {
    console.error('Get all banners error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create banner (admin)
router.post('/admin', async (req, res) => {
  try {
    const bannerData = {
      ...req.body,
      createdBy: req.body.userId
    }

    const banner = new Banner(bannerData)
    await banner.save()

    res.status(201).json({
      message: 'Banner created successfully',
      banner
    })
  } catch (error) {
    console.error('Create banner error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update banner (admin)
router.put('/admin/:id', async (req, res) => {
  try {
    const { userId, ...updateData } = req.body
    updateData.lastModifiedBy = userId

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' })
    }

    res.json({
      message: 'Banner updated successfully',
      banner
    })
  } catch (error) {
    console.error('Update banner error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete banner (admin)
router.delete('/admin/:id', async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id)

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' })
    }

    res.json({ message: 'Banner deleted successfully' })
  } catch (error) {
    console.error('Delete banner error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Record banner impression
router.post('/:id/impression', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id)
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' })
    }

    await banner.recordImpression()

    res.json({ message: 'Impression recorded' })
  } catch (error) {
    console.error('Record impression error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Record banner click
router.post('/:id/click', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id)
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' })
    }

    await banner.recordClick()

    res.json({ message: 'Click recorded' })
  } catch (error) {
    console.error('Record click error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Record banner conversion
router.post('/:id/conversion', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id)
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' })
    }

    await banner.recordConversion()

    res.json({ message: 'Conversion recorded' })
  } catch (error) {
    console.error('Record conversion error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get banner analytics (admin)
router.get('/admin/:id/analytics', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id)
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' })
    }

    const analytics = {
      impressions: banner.analytics.impressions,
      clicks: banner.analytics.clicks,
      conversions: banner.analytics.conversions,
      ctr: banner.clickThroughRate,
      conversionRate: banner.conversionRate
    }

    res.json({ analytics })
  } catch (error) {
    console.error('Get banner analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
