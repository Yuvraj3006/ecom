const express = require('express')
const Theme = require('../models/Theme')
const router = express.Router()

// Get active theme
router.get('/active', async (req, res) => {
  try {
    const theme = await Theme.getActiveTheme()
    if (!theme) {
      return res.status(404).json({ message: 'No active theme found' })
    }

    res.json({ theme })
  } catch (error) {
    console.error('Get active theme error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all themes (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const themes = await Theme.find()
      .populate('createdBy', 'firstName lastName')
      .populate('lastModifiedBy', 'firstName lastName')
      .sort({ createdAt: -1 })

    res.json({ themes })
  } catch (error) {
    console.error('Get all themes error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create theme (admin)
router.post('/admin', async (req, res) => {
  try {
    const themeData = {
      ...req.body,
      createdBy: req.body.userId
    }

    const theme = new Theme(themeData)
    await theme.save()

    res.status(201).json({
      message: 'Theme created successfully',
      theme
    })
  } catch (error) {
    console.error('Create theme error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update theme (admin)
router.put('/admin/:id', async (req, res) => {
  try {
    const { userId, ...updateData } = req.body
    updateData.lastModifiedBy = userId

    const theme = await Theme.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' })
    }

    res.json({
      message: 'Theme updated successfully',
      theme
    })
  } catch (error) {
    console.error('Update theme error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Activate theme (admin)
router.put('/admin/:id/activate', async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id)
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' })
    }

    await theme.activate()

    res.json({
      message: 'Theme activated successfully',
      theme
    })
  } catch (error) {
    console.error('Activate theme error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete theme (admin)
router.delete('/admin/:id', async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id)
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' })
    }

    if (theme.isActive) {
      return res.status(400).json({ 
        message: 'Cannot delete active theme' 
      })
    }

    await Theme.findByIdAndDelete(req.params.id)

    res.json({ message: 'Theme deleted successfully' })
  } catch (error) {
    console.error('Delete theme error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get theme CSS variables
router.get('/:id/css', async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id)
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' })
    }

    const cssVariables = theme.generateCSSVariables()
    
    res.setHeader('Content-Type', 'text/css')
    res.send(`:root {\n${cssVariables}\n}`)
  } catch (error) {
    console.error('Get theme CSS error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get active theme CSS variables
router.get('/active/css', async (req, res) => {
  try {
    const theme = await Theme.getActiveTheme()
    if (!theme) {
      return res.status(404).json({ message: 'No active theme found' })
    }

    const cssVariables = theme.generateCSSVariables()
    
    res.setHeader('Content-Type', 'text/css')
    res.send(`:root {\n${cssVariables}\n}`)
  } catch (error) {
    console.error('Get active theme CSS error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
