require('dotenv').config()
const mongoose = require('mongoose')

// Import models
const User = require('./models/User')
const Product = require('./models/Product')
const Quiz = require('./models/Quiz')
const Banner = require('./models/Banner')
const Theme = require('./models/Theme')
const Order = require('./models/Order')

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cyberoptics', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ MongoDB Connected')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// Seed data
const seedProducts = [
  {
    name: 'Cyber Neon Frame',
    slug: 'cyber-neon-frame',
    description: 'Futuristic frames with neon pink accents and LED integration. Perfect for the cyberpunk aesthetic with advanced blue light filtering technology.',
    shortDescription: 'Futuristic frames with neon pink accents',
    category: 'frame',
    subcategory: 'eyeglasses',
    brand: 'CyberOptics',
    model: 'CN-001',
    sku: 'CO-CN-001',
    price: 299,
    comparePrice: 399,
    images: [
      {
        url: '/images/products/cyber-neon-frame-1.jpg',
        alt: 'Cyber Neon Frame - Front View',
        isPrimary: true
      },
      {
        url: '/images/products/cyber-neon-frame-2.jpg',
        alt: 'Cyber Neon Frame - Side View',
        isPrimary: false
      }
    ],
    attributes: {
      faceShape: ['oval', 'square', 'heart'],
      style: ['cyberpunk', 'futuristic', 'bold'],
      colors: ['neon-pink', 'matte-black'],
      materials: ['titanium', 'carbon-fiber'],
      features: ['blue-light-filtering', 'anti-reflective', 'scratch-resistant'],
      frameType: 'full-rim',
      bridgeWidth: 18,
      lensWidth: 52,
      templeLength: 140,
      weight: 28
    },
    inventory: {
      total: 100,
      available: 85,
      reserved: 15
    },
    isActive: true,
    isFeatured: true,
    isNew: true,
    ratings: {
      average: 4.8,
      count: 127
    },
    salesCount: 89,
    tags: ['cyberpunk', 'neon', 'futuristic', 'blue-light', 'trending'],
    seo: {
      title: 'Cyber Neon Frame - Futuristic Eyewear | CyberOptics',
      description: 'Experience the future with our Cyber Neon Frame featuring LED accents and advanced blue light protection.',
      keywords: ['cyberpunk glasses', 'neon frames', 'futuristic eyewear', 'blue light blocking']
    }
  },
  {
    name: 'Quantum Edge',
    slug: 'quantum-edge',
    description: 'Minimalist design meets quantum technology. These frames feature shape-memory alloy construction and adaptive lens technology.',
    shortDescription: 'Minimalist quantum technology frames',
    category: 'frame',
    subcategory: 'eyeglasses',
    brand: 'CyberOptics',
    model: 'QE-002',
    sku: 'CO-QE-002',
    price: 399,
    comparePrice: 499,
    images: [
      {
        url: '/images/products/quantum-edge-1.jpg',
        alt: 'Quantum Edge - Front View',
        isPrimary: true
      }
    ],
    attributes: {
      faceShape: ['oval', 'round', 'diamond'],
      style: ['minimalist', 'tech', 'futuristic'],
      colors: ['metallic', 'chrome'],
      materials: ['titanium', 'stainless-steel'],
      features: ['photochromic', 'anti-reflective', 'uv-protection'],
      frameType: 'semi-rimless',
      bridgeWidth: 16,
      lensWidth: 54,
      templeLength: 142,
      weight: 22
    },
    inventory: {
      total: 75,
      available: 68,
      reserved: 7
    },
    isActive: true,
    isFeatured: true,
    ratings: {
      average: 4.9,
      count: 94
    },
    salesCount: 67,
    tags: ['quantum', 'minimalist', 'tech', 'adaptive', 'premium']
  },
  {
    name: 'Holographic Dream',
    slug: 'holographic-dream',
    description: 'Revolutionary holographic coating that shifts colors in different lighting. Made with bio-compatible materials for all-day comfort.',
    shortDescription: 'Color-shifting holographic frames',
    category: 'frame',
    subcategory: 'eyeglasses',
    brand: 'CyberOptics',
    model: 'HD-003',
    sku: 'CO-HD-003',
    price: 449,
    comparePrice: 599,
    images: [
      {
        url: '/images/products/holographic-dream-1.jpg',
        alt: 'Holographic Dream - Front View',
        isPrimary: true
      }
    ],
    attributes: {
      faceShape: ['heart', 'diamond', 'oval'],
      style: ['artistic', 'futuristic', 'bold'],
      colors: ['holographic'],
      materials: ['acetate', 'titanium'],
      features: ['scratch-resistant', 'anti-reflective'],
      frameType: 'cat-eye',
      bridgeWidth: 19,
      lensWidth: 50,
      templeLength: 138,
      weight: 26
    },
    inventory: {
      total: 50,
      available: 32,
      reserved: 18
    },
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    ratings: {
      average: 4.7,
      count: 156
    },
    salesCount: 123,
    tags: ['holographic', 'artistic', 'unique', 'color-shifting']
  },
  {
    name: 'Neon Circuit',
    slug: 'neon-circuit',
    description: 'Circuit board inspired design with integrated micro-LEDs. Perfect for gamers and tech enthusiasts.',
    shortDescription: 'Circuit board design with LED integration',
    category: 'frame',
    subcategory: 'eyeglasses',
    brand: 'CyberOptics',
    model: 'NC-004',
    sku: 'CO-NC-004',
    price: 349,
    images: [
      {
        url: '/images/products/neon-circuit-1.jpg',
        alt: 'Neon Circuit - Front View',
        isPrimary: true
      }
    ],
    attributes: {
      faceShape: ['square', 'round'],
      style: ['cyberpunk', 'tech', 'gaming'],
      colors: ['neon-pink', 'electric-blue'],
      materials: ['carbon-fiber', 'plastic'],
      features: ['blue-light-filtering'],
      frameType: 'full-rim',
      bridgeWidth: 17,
      lensWidth: 53,
      templeLength: 141,
      weight: 31
    },
    inventory: {
      total: 80,
      available: 71,
      reserved: 9
    },
    isActive: true,
    isFeatured: false,
    ratings: {
      average: 4.6,
      count: 89
    },
    salesCount: 78,
    tags: ['circuit', 'gaming', 'led', 'tech']
  },
  {
    name: 'Blue Light Pro Lens',
    slug: 'blue-light-pro-lens',
    description: 'Advanced blue light filtering lens with 99% protection. Compatible with all CyberOptics frames.',
    shortDescription: 'Advanced blue light filtering lens',
    category: 'lens',
    subcategory: 'blue-light',
    brand: 'CyberOptics',
    model: 'BLP-001',
    sku: 'CO-BLP-001',
    price: 149,
    images: [
      {
        url: '/images/products/blue-light-lens-1.jpg',
        alt: 'Blue Light Pro Lens',
        isPrimary: true
      }
    ],
    attributes: {
      features: ['blue-light-filtering', 'anti-reflective', 'scratch-resistant'],
      colors: ['clear']
    },
    inventory: {
      total: 200,
      available: 178,
      reserved: 22
    },
    isActive: true,
    ratings: {
      average: 4.9,
      count: 234
    },
    salesCount: 189,
    tags: ['blue-light', 'protection', 'lens', 'gaming', 'office']
  },
  {
    name: 'Progressive Smart Lens',
    slug: 'progressive-smart-lens',
    description: 'AI-enhanced progressive lenses that adapt to your visual needs throughout the day.',
    shortDescription: 'AI-enhanced progressive lenses',
    category: 'lens',
    subcategory: 'progressive',
    brand: 'CyberOptics',
    model: 'PSL-002',
    sku: 'CO-PSL-002',
    price: 299,
    images: [
      {
        url: '/images/products/progressive-lens-1.jpg',
        alt: 'Progressive Smart Lens',
        isPrimary: true
      }
    ],
    attributes: {
      features: ['progressive', 'anti-reflective', 'photochromic'],
      colors: ['clear']
    },
    inventory: {
      total: 100,
      available: 89,
      reserved: 11
    },
    isActive: true,
    ratings: {
      average: 4.8,
      count: 67
    },
    salesCount: 45,
    tags: ['progressive', 'smart', 'ai', 'adaptive']
  }
]

const seedQuiz = {
  title: 'Frame Finder Quiz',
  description: 'Discover your perfect eyewear with our AI-powered quiz',
  isActive: true,
  questions: [
    {
      id: 'face-shape',
      title: 'What\'s your face shape?',
      type: 'single',
      options: [
        {
          value: 'oval',
          label: 'Oval',
          description: 'Balanced proportions, slightly longer than wide',
          weight: 1
        },
        {
          value: 'round',
          label: 'Round',
          description: 'Equal width and length, soft curves',
          weight: 1
        },
        {
          value: 'square',
          label: 'Square',
          description: 'Strong jawline, equal width and length',
          weight: 1
        },
        {
          value: 'heart',
          label: 'Heart',
          description: 'Wider forehead, narrower chin',
          weight: 1
        },
        {
          value: 'diamond',
          label: 'Diamond',
          description: 'Narrow forehead and chin, wider cheekbones',
          weight: 1
        }
      ],
      required: true,
      order: 1
    },
    {
      id: 'style-preference',
      title: 'What\'s your style vibe?',
      type: 'multiple',
      options: [
        {
          value: 'cyberpunk',
          label: 'Cyberpunk',
          description: 'Bold, futuristic, neon accents',
          weight: 1
        },
        {
          value: 'minimalist',
          label: 'Minimalist',
          description: 'Clean, simple, understated',
          weight: 1
        },
        {
          value: 'vintage',
          label: 'Vintage',
          description: 'Classic, retro-inspired designs',
          weight: 1
        },
        {
          value: 'tech',
          label: 'Tech-Forward',
          description: 'High-tech, innovative features',
          weight: 1
        },
        {
          value: 'artistic',
          label: 'Artistic',
          description: 'Unique, creative, expressive',
          weight: 1
        }
      ],
      required: true,
      order: 2
    },
    {
      id: 'lifestyle',
      title: 'How do you spend your time?',
      type: 'multiple',
      options: [
        {
          value: 'work',
          label: 'Office Work',
          description: 'Professional, long hours at computer',
          weight: 1
        },
        {
          value: 'creative',
          label: 'Creative Work',
          description: 'Design, art, content creation',
          weight: 1
        },
        {
          value: 'active',
          label: 'Active Lifestyle',
          description: 'Sports, outdoor activities',
          weight: 1
        },
        {
          value: 'social',
          label: 'Social Events',
          description: 'Parties, networking, events',
          weight: 1
        },
        {
          value: 'gaming',
          label: 'Gaming/Streaming',
          description: 'Long hours in front of screens',
          weight: 1
        }
      ],
      required: true,
      order: 3
    },
    {
      id: 'colors',
      title: 'What colors speak to you?',
      type: 'multiple',
      options: [
        {
          value: 'neon-pink',
          label: 'Neon Pink',
          description: 'Bold, energetic, attention-grabbing',
          weight: 1
        },
        {
          value: 'electric-blue',
          label: 'Electric Blue',
          description: 'Cool, tech-inspired, calming',
          weight: 1
        },
        {
          value: 'holographic',
          label: 'Holographic',
          description: 'Iridescent, color-shifting',
          weight: 1
        },
        {
          value: 'metallic',
          label: 'Metallic',
          description: 'Silver, gold, chrome finishes',
          weight: 1
        },
        {
          value: 'matte-black',
          label: 'Matte Black',
          description: 'Sleek, sophisticated, versatile',
          weight: 1
        }
      ],
      required: true,
      order: 4
    },
    {
      id: 'budget',
      title: 'What\'s your budget range?',
      type: 'single',
      options: [
        {
          value: 'under-200',
          label: 'Under $200',
          description: 'Quality frames at great value',
          weight: 1
        },
        {
          value: '200-400',
          label: '$200 - $400',
          description: 'Premium materials and design',
          weight: 1
        },
        {
          value: '400-600',
          label: '$400 - $600',
          description: 'High-end frames with advanced features',
          weight: 1
        },
        {
          value: '600-plus',
          label: '$600+',
          description: 'Luxury frames with cutting-edge technology',
          weight: 1
        }
      ],
      required: true,
      order: 5
    }
  ],
  results: {
    algorithm: 'weighted',
    recommendations: {
      enabled: true,
      maxResults: 6
    }
  },
  settings: {
    allowRetake: true,
    showProgress: true,
    randomizeQuestions: false,
    requireLogin: false
  }
}

const seedBanners = [
  {
    title: 'New Cyber Collection',
    subtitle: 'Experience the Future of Eyewear',
    description: 'Discover our latest cyberpunk-inspired frames with AI-powered recommendations',
    image: '/images/banners/cyber-collection-banner.jpg',
    ctaText: 'Shop Now',
    ctaLink: '/shop?collection=cyber',
    isActive: true,
    priority: 1,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    backgroundColor: '#FF0080',
    textColor: '#FFFFFF',
    position: 'hero'
  },
  {
    title: 'Take the Frame Finder Quiz',
    subtitle: 'AI-Powered Personalization',
    description: 'Get personalized frame recommendations based on your face shape and style',
    image: '/images/banners/quiz-banner.jpg',
    ctaText: 'Start Quiz',
    ctaLink: '/quiz',
    isActive: true,
    priority: 2,
    backgroundColor: '#B026FF',
    textColor: '#FFFFFF',
    position: 'secondary'
  }
]

const seedTheme = {
  name: 'Cyberpunk Pink',
  description: 'Futuristic white and cyberpunk pink theme',
  isActive: true,
  colors: {
    primary: '#FF0080',
    secondary: '#FFFFFF',
    accent: '#B026FF',
    electricBlue: '#00D4FF',
    neutralDark: '#111111',
    neutralLight: '#F8F9FA',
    neutralGray: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  },
  typography: {
    heading: 'Orbitron, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'Fira Code, monospace'
  },
  effects: {
    glassmorphism: true,
    neonGlow: true,
    gradients: true
  }
}

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@cyberoptics.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4SH2jQ2bRq', // password123
    role: 'admin',
    isActive: true,
    profile: {
      avatar: '/images/avatars/admin.jpg',
      bio: 'CyberOptics platform administrator'
    }
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4SH2jQ2bRq', // password123
    role: 'user',
    isActive: true,
    profile: {
      faceShape: 'oval',
      preferences: {
        style: ['cyberpunk', 'tech'],
        colors: ['neon-pink', 'metallic'],
        budget: '200-400'
      }
    }
  }
]

// Seed functions
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...')

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Quiz.deleteMany({}),
      Banner.deleteMany({}),
      Theme.deleteMany({}),
      Order.deleteMany({})
    ])
    console.log('🗑️  Cleared existing data')

    // Seed products
    const products = await Product.insertMany(seedProducts)
    console.log(`✅ Seeded ${products.length} products`)

    // Seed quiz
    const quiz = await Quiz.create(seedQuiz)
    console.log('✅ Seeded quiz')

    // Seed banners
    const banners = await Banner.insertMany(seedBanners)
    console.log(`✅ Seeded ${banners.length} banners`)

    // Seed theme
    const theme = await Theme.create(seedTheme)
    console.log('✅ Seeded theme')

    // Seed users
    const users = await User.insertMany(seedUsers)
    console.log(`✅ Seeded ${users.length} users`)

    console.log('🎉 Database seeding completed successfully!')
    
    // Display summary
    console.log('\n📊 Seeding Summary:')
    console.log(`   Products: ${products.length}`)
    console.log(`   Quiz Questions: ${quiz.questions.length}`)
    console.log(`   Banners: ${banners.length}`)
    console.log(`   Users: ${users.length}`)
    console.log(`   Theme: ${theme.name}`)
    
    console.log('\n🔑 Default Login:')
    console.log('   Email: admin@cyberoptics.com')
    console.log('   Password: password123')

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  }
}

// Run seeding
const main = async () => {
  await connectDB()
  await seedDatabase()
  await mongoose.disconnect()
  console.log('✅ Database connection closed')
  process.exit(0)
}

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err)
  process.exit(1)
})

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  })
}

module.exports = { seedDatabase, connectDB }