const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Import models
const User = require('./models/User')
const Product = require('./models/Product')
const Quiz = require('./models/Quiz')
const Banner = require('./models/Banner')
const Theme = require('./models/Theme')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cyberoptics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const seedData = async () => {
  try {
    console.log('🌱 Starting seed data creation...')

    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})
    await Quiz.deleteMany({})
    await Banner.deleteMany({})
    await Theme.deleteMany({})

    // Create admin user
    const adminUser = new User({
      email: 'admin@cyberoptics.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      emailVerified: true
    })
    await adminUser.save()
    console.log('✅ Admin user created')

    // Create sample users
    const users = [
      {
        email: 'alex@example.com',
        password: 'password123',
        firstName: 'Alex',
        lastName: 'Chen',
        role: 'customer'
      },
      {
        email: 'maya@example.com',
        password: 'password123',
        firstName: 'Maya',
        lastName: 'Rodriguez',
        role: 'customer'
      }
    ]

    for (const userData of users) {
      const user = new User(userData)
      await user.save()
    }
    console.log('✅ Sample users created')

    // Create products
    const products = [
      {
        name: 'Cyber Neon',
        slug: 'cyber-neon',
        description: 'Bold geometric frames with neon pink accents that scream cyberpunk aesthetic. Perfect for those who want to make a statement.',
        shortDescription: 'Bold geometric frames with neon accents',
        category: 'frame',
        subcategory: 'eyeglasses',
        brand: 'CyberOptics',
        model: 'CN-001',
        sku: 'CN-001-PK',
        price: 299,
        comparePrice: 399,
        images: [
          { url: '/images/frames/cyber-neon-1.jpg', alt: 'Cyber Neon Frame Front View', isPrimary: true },
          { url: '/images/frames/cyber-neon-2.jpg', alt: 'Cyber Neon Frame Side View', isPrimary: false },
          { url: '/images/frames/cyber-neon-3.jpg', alt: 'Cyber Neon Frame Detail', isPrimary: false }
        ],
        attributes: {
          faceShape: ['oval', 'round', 'heart'],
          style: ['cyberpunk', 'futuristic', 'bold'],
          colors: ['neon-pink', 'electric-blue'],
          materials: ['acetate', 'titanium'],
          features: ['blue-light-filtering', 'anti-reflective'],
          frameType: 'full-rim',
          bridgeWidth: 18,
          lensWidth: 52,
          templeLength: 140,
          weight: 25
        },
        inventory: {
          total: 50,
          available: 50,
          reserved: 0
        },
        isActive: true,
        isFeatured: true,
        isNew: true,
        ratings: {
          average: 4.8,
          count: 24
        }
      },
      {
        name: 'Quantum Edge',
        slug: 'quantum-edge',
        description: 'Sharp angular design with metallic finish that embodies the future of eyewear. Sleek and sophisticated.',
        shortDescription: 'Sharp angular design with metallic finish',
        category: 'frame',
        subcategory: 'eyeglasses',
        brand: 'CyberOptics',
        model: 'QE-002',
        sku: 'QE-002-SL',
        price: 349,
        comparePrice: 449,
        images: [
          { url: '/images/frames/quantum-edge-1.jpg', alt: 'Quantum Edge Frame Front View', isPrimary: true },
          { url: '/images/frames/quantum-edge-2.jpg', alt: 'Quantum Edge Frame Side View', isPrimary: false }
        ],
        attributes: {
          faceShape: ['square', 'oval'],
          style: ['futuristic', 'minimalist', 'tech'],
          colors: ['silver', 'black', 'gold'],
          materials: ['titanium', 'stainless-steel'],
          features: ['magnetic-temples', 'adjustable-nose-pads'],
          frameType: 'semi-rimless',
          bridgeWidth: 19,
          lensWidth: 54,
          templeLength: 145,
          weight: 22
        },
        inventory: {
          total: 30,
          available: 30,
          reserved: 0
        },
        isActive: true,
        isFeatured: true,
        ratings: {
          average: 4.6,
          count: 18
        }
      },
      {
        name: 'Holographic Dream',
        slug: 'holographic-dream',
        description: 'Iridescent frames that shift colors in the light, creating a mesmerizing holographic effect. Truly unique.',
        shortDescription: 'Iridescent frames that shift colors',
        category: 'frame',
        subcategory: 'eyeglasses',
        brand: 'CyberOptics',
        model: 'HD-003',
        sku: 'HD-003-HG',
        price: 399,
        comparePrice: 499,
        images: [
          { url: '/images/frames/holographic-dream-1.jpg', alt: 'Holographic Dream Frame Front View', isPrimary: true },
          { url: '/images/frames/holographic-dream-2.jpg', alt: 'Holographic Dream Frame Detail', isPrimary: false }
        ],
        attributes: {
          faceShape: ['oval', 'heart', 'diamond'],
          style: ['artistic', 'futuristic', 'unique'],
          colors: ['holographic', 'rainbow'],
          materials: ['acetate', 'holographic-film'],
          features: ['color-shifting', 'uv-protection'],
          frameType: 'full-rim',
          bridgeWidth: 17,
          lensWidth: 50,
          templeLength: 135,
          weight: 28
        },
        inventory: {
          total: 20,
          available: 20,
          reserved: 0
        },
        isActive: true,
        isFeatured: true,
        ratings: {
          average: 4.9,
          count: 31
        }
      },
      {
        name: 'Neon Circuit',
        slug: 'neon-circuit',
        description: 'Circuit-pattern frames with LED-like effects that glow in the dark. Perfect for tech enthusiasts.',
        shortDescription: 'Circuit-pattern frames with LED effects',
        category: 'frame',
        subcategory: 'eyeglasses',
        brand: 'CyberOptics',
        model: 'NC-004',
        sku: 'NC-004-GR',
        price: 279,
        comparePrice: 349,
        images: [
          { url: '/images/frames/neon-circuit-1.jpg', alt: 'Neon Circuit Frame Front View', isPrimary: true },
          { url: '/images/frames/neon-circuit-2.jpg', alt: 'Neon Circuit Frame Glow Effect', isPrimary: false }
        ],
        attributes: {
          faceShape: ['round', 'oval'],
          style: ['cyberpunk', 'tech', 'gaming'],
          colors: ['green', 'blue', 'pink'],
          materials: ['acetate', 'glow-in-dark'],
          features: ['glow-effect', 'circuit-pattern'],
          frameType: 'full-rim',
          bridgeWidth: 18,
          lensWidth: 51,
          templeLength: 142,
          weight: 26
        },
        inventory: {
          total: 40,
          available: 40,
          reserved: 0
        },
        isActive: true,
        isFeatured: false,
        ratings: {
          average: 4.4,
          count: 15
        }
      }
    ]

    for (const productData of products) {
      const product = new Product(productData)
      await product.save()
    }
    console.log('✅ Products created')

    // Create quiz
    const quiz = new Quiz({
      title: 'Frame Finder Quiz',
      description: 'Discover your perfect frames with our AI-powered quiz',
      isActive: true,
      questions: [
        {
          id: 'face-shape',
          title: 'What\'s your face shape?',
          type: 'single',
          options: [
            { value: 'oval', label: 'Oval', description: 'Balanced proportions, slightly longer than wide' },
            { value: 'round', label: 'Round', description: 'Equal width and length, soft curves' },
            { value: 'square', label: 'Square', description: 'Strong jawline, equal width and length' },
            { value: 'heart', label: 'Heart', description: 'Wider forehead, narrower chin' },
            { value: 'diamond', label: 'Diamond', description: 'Narrow forehead and chin, wider cheekbones' }
          ],
          required: true,
          order: 1
        },
        {
          id: 'style-preference',
          title: 'What\'s your style vibe?',
          type: 'multiple',
          options: [
            { value: 'cyberpunk', label: 'Cyberpunk', description: 'Bold, futuristic, neon accents' },
            { value: 'minimalist', label: 'Minimalist', description: 'Clean, simple, understated' },
            { value: 'vintage', label: 'Vintage', description: 'Classic, retro-inspired designs' },
            { value: 'tech', label: 'Tech-Forward', description: 'High-tech, innovative features' },
            { value: 'artistic', label: 'Artistic', description: 'Unique, creative, expressive' }
          ],
          required: true,
          order: 2
        },
        {
          id: 'lifestyle',
          title: 'How do you spend your time?',
          type: 'multiple',
          options: [
            { value: 'work', label: 'Office Work', description: 'Professional, long hours at computer' },
            { value: 'creative', label: 'Creative Work', description: 'Design, art, content creation' },
            { value: 'active', label: 'Active Lifestyle', description: 'Sports, outdoor activities' },
            { value: 'social', label: 'Social Events', description: 'Parties, networking, events' },
            { value: 'gaming', label: 'Gaming/Streaming', description: 'Long hours in front of screens' }
          ],
          required: true,
          order: 3
        },
        {
          id: 'colors',
          title: 'What colors speak to you?',
          type: 'multiple',
          options: [
            { value: 'neon-pink', label: 'Neon Pink', description: 'Bold, energetic, attention-grabbing' },
            { value: 'electric-blue', label: 'Electric Blue', description: 'Cool, tech-inspired, calming' },
            { value: 'holographic', label: 'Holographic', description: 'Iridescent, color-shifting' },
            { value: 'metallic', label: 'Metallic', description: 'Silver, gold, chrome finishes' },
            { value: 'matte-black', label: 'Matte Black', description: 'Sleek, sophisticated, versatile' }
          ],
          required: true,
          order: 4
        },
        {
          id: 'budget',
          title: 'What\'s your budget range?',
          type: 'single',
          options: [
            { value: 'under-200', label: 'Under $200', description: 'Quality frames at great value' },
            { value: '200-400', label: '$200 - $400', description: 'Premium materials and design' },
            { value: '400-600', label: '$400 - $600', description: 'High-end frames with advanced features' },
            { value: '600-plus', label: '$600+', description: 'Luxury frames with cutting-edge technology' }
          ],
          required: true,
          order: 5
        }
      ],
      results: {
        algorithm: 'weighted',
        categories: [
          { name: 'face-shape', weight: 0.3, questions: ['face-shape'] },
          { name: 'style', weight: 0.25, questions: ['style-preference'] },
          { name: 'lifestyle', weight: 0.2, questions: ['lifestyle'] },
          { name: 'colors', weight: 0.15, questions: ['colors'] },
          { name: 'budget', weight: 0.1, questions: ['budget'] }
        ],
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
    })
    await quiz.save()
    console.log('✅ Quiz created')

    // Create banners
    const banners = [
      {
        title: 'Welcome to CyberOptics',
        description: 'Discover the future of eyewear',
        type: 'hero',
        position: 'top',
        content: {
          image: {
            url: '/images/banners/hero-banner.jpg',
            alt: 'CyberOptics Hero Banner'
          },
          text: {
            heading: 'Welcome to the Future of Eyewear',
            subheading: 'AI-powered recommendations meet cyberpunk aesthetics',
            body: 'Experience personalized frames with our advanced quiz and AR try-on technology.',
            cta: {
              text: 'Start Frame Finder Quiz',
              url: '/quiz',
              style: 'primary'
            }
          }
        },
        targeting: {
          audience: 'all',
          location: 'homepage',
          device: 'all'
        },
        settings: {
          isActive: true,
          priority: 10,
          clickable: true,
          dismissible: false,
          animation: 'fade'
        },
        createdBy: adminUser._id
      },
      {
        title: 'New Collection Alert',
        description: 'Check out our latest cyberpunk frames',
        type: 'promotional',
        position: 'middle',
        content: {
          image: {
            url: '/images/banners/new-collection.jpg',
            alt: 'New Collection Banner'
          },
          text: {
            heading: 'New Collection: Holographic Dreams',
            subheading: 'Limited time offer - 20% off',
            cta: {
              text: 'Shop Now',
              url: '/shop',
              style: 'secondary'
            }
          }
        },
        targeting: {
          audience: 'all',
          location: 'shop',
          device: 'all'
        },
        settings: {
          isActive: true,
          priority: 5,
          clickable: true,
          dismissible: true,
          animation: 'slide'
        },
        createdBy: adminUser._id
      }
    ]

    for (const bannerData of banners) {
      const banner = new Banner(bannerData)
      await banner.save()
    }
    console.log('✅ Banners created')

    // Create default theme
    const defaultTheme = new Theme({
      name: 'Cyberpunk Default',
      isActive: true,
      colors: {
        primary: '#FF0080',
        secondary: '#FFFFFF',
        accent: '#B026FF',
        neutralDark: '#111111',
        neutralLight: '#F8F9FA',
        neutralGray: '#6B7280',
        gradientPrimary: 'linear-gradient(135deg, #FF0080 0%, #B026FF 100%)',
        gradientHover: 'linear-gradient(135deg, #FF4DB8 0%, #C158FF 100%)',
        gradientSubtle: 'linear-gradient(135deg, rgba(255,0,128,0.1) 0%, rgba(176,38,255,0.1) 100%)'
      },
      typography: {
        heading: {
          fontFamily: 'Orbitron, sans-serif'
        },
        body: {
          fontFamily: 'Inter, sans-serif'
        }
      },
      createdBy: adminUser._id
    })
    await defaultTheme.save()
    console.log('✅ Default theme created')

    console.log('🎉 Seed data creation completed successfully!')
    console.log('📊 Summary:')
    console.log(`   - Users: ${await User.countDocuments()}`)
    console.log(`   - Products: ${await Product.countDocuments()}`)
    console.log(`   - Quizzes: ${await Quiz.countDocuments()}`)
    console.log(`   - Banners: ${await Banner.countDocuments()}`)
    console.log(`   - Themes: ${await Theme.countDocuments()}`)

  } catch (error) {
    console.error('❌ Seed data creation failed:', error)
  } finally {
    mongoose.connection.close()
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedData()
}

module.exports = seedData
