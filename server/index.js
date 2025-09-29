const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cyberoptics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Models
const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const Quiz = require('./models/Quiz')
const Banner = require('./models/Banner')
const Theme = require('./models/Theme')

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/quiz', require('./routes/quiz'))
app.use('/api/banners', require('./routes/banners'))
app.use('/api/themes', require('./routes/themes'))
app.use('/api/users', require('./routes/users'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CyberOptics API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`🚀 CyberOptics API server running on port ${PORT}`)
})
