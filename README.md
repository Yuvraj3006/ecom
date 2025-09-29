# CyberOptics - Futuristic Eyewear Platform

A cutting-edge eyewear e-commerce platform inspired by Warby Parker's UX and Lenskart's innovations, featuring a **white + cyberpunk pink aesthetic** with AI-powered frame recommendations.

## 🚀 Features

### 🎨 Design & UX
- **Cyberpunk Pink Theme**: Futuristic white and neon pink color scheme
- **Glassmorphic UI**: Modern glass-effect components with backdrop blur
- **Neon Glow Effects**: Interactive elements with cyberpunk-inspired lighting
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Smooth Animations**: Framer Motion powered micro-interactions

### 🤖 AI-Powered Recommendations
- **Face Shape Detection**: Real-time camera analysis using TensorFlow.js
- **Smart Quiz System**: Multi-step Frame Finder quiz with personalization
- **Hybrid Recommendations**: Combines AI face analysis with user preferences
- **Dynamic Results**: Personalized frame suggestions based on multiple factors

### 🛍️ E-Commerce Features
- **Product Catalog**: Comprehensive eyewear collection with advanced filtering
- **Virtual Try-On**: AR-powered frame preview (WebXR integration ready)
- **Shopping Cart**: Persistent cart with local storage
- **User Accounts**: Profile management with quiz history
- **Order Management**: Complete checkout flow with Stripe integration ready

### 🔧 Admin Panel
- **Shopify-Style Dashboard**: Comprehensive admin interface
- **Product Management**: Full CRUD operations for frames and lenses
- **Theme Customization**: Real-time color and typography editing
- **Analytics Dashboard**: Quiz engagement and sales metrics
- **User Management**: Customer insights and order tracking

### 🏗️ Technical Architecture
- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, MongoDB with Mongoose
- **State Management**: Zustand for client-side state
- **Authentication**: NextAuth.js with JWT tokens
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion with custom cyberpunk effects

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd cyberpunk-eyewear-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas and update MONGODB_URI in .env
```

5. **Seed the database**
```bash
npm run seed
```

6. **Start the development servers**
```bash
# Start both frontend and backend
npm run dev:full

# Or start individually
npm run dev      # Frontend (Next.js) on http://localhost:3000
npm run server   # Backend (Express) on http://localhost:5000
```

## 🎯 Usage

### For Customers
1. **Browse Products**: Explore the futuristic eyewear collection
2. **Take the Quiz**: Use the Frame Finder quiz for personalized recommendations
3. **AI Face Analysis**: Optional camera-based face shape detection
4. **Virtual Try-On**: Preview frames with AR technology
5. **Shop & Checkout**: Add to cart and complete purchase

### For Administrators
1. **Access Admin Panel**: Navigate to `/admin` (login required)
2. **Manage Products**: Add, edit, or remove eyewear items
3. **Customize Theme**: Real-time color and typography adjustments
4. **View Analytics**: Track quiz completions and sales metrics
5. **Manage Users**: Customer insights and order management

## 🔑 Default Login

**Admin Account:**
- Email: `admin@cyberoptics.com`
- Password: `password123`

## 🛠️ Development

### Project Structure
```
cyberpunk-eyewear-platform/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── quiz/              # Quiz pages
│   └── shop/              # Shop pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── quiz/             # Quiz components
│   ├── ui/               # Reusable UI components
│   └── sections/         # Page sections
├── design-system/        # Theme configuration
├── lib/                  # Utility functions
├── server/               # Express backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── middleware/      # Custom middleware
└── types/               # TypeScript definitions
```

### Available Scripts
```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run server       # Start Express backend
npm run dev:full     # Start both frontend and backend
npm run seed         # Seed database with sample data
npm run lint         # Run ESLint
```

### Adding New Components
1. Create component in appropriate directory
2. Follow the design system patterns
3. Use TypeScript for type safety
4. Include proper variants and states
5. Add to component exports

### Customizing the Theme
1. Edit `design-system/design-system.json`
2. Update Tailwind config if needed
3. Use CSS custom properties for dynamic changes
4. Test across all components

## 🎨 Design System

### Colors
- **Primary**: `#FF0080` (Cyberpunk Pink)
- **Secondary**: `#FFFFFF` (White)  
- **Accent**: `#B026FF` (Electric Purple)
- **Electric Blue**: `#00D4FF`

### Typography
- **Headings**: Orbitron (futuristic)
- **Body**: Inter (readable)
- **Mono**: Fira Code (technical)

### Effects
- **Glassmorphism**: `backdrop-blur-md bg-white/20`
- **Neon Glow**: `shadow-neon-glow`
- **Gradients**: Primary and hover variations

## 🔧 Configuration

### Environment Variables
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/cyberoptics

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret

# Payment (Optional)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Development
NODE_ENV=development
PORT=5000
```

### MongoDB Collections
- `users` - User accounts and profiles
- `products` - Eyewear catalog
- `orders` - Purchase records
- `quizzes` - Quiz configurations
- `banners` - Homepage banners
- `themes` - Theme settings

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

### Manual Deployment
1. Build the application: `npm run build`
2. Set up production database
3. Configure environment variables
4. Start with: `npm start`

## 🧪 Testing

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Test Structure
- Unit tests for utilities and components
- Integration tests for API routes
- E2E tests for critical user flows

## 📚 API Documentation

### Products API
```
GET    /api/products              # List products
GET    /api/products/:id          # Get product
POST   /api/products              # Create product (admin)
PUT    /api/products/:id          # Update product (admin)
DELETE /api/products/:id          # Delete product (admin)
```

### Quiz API
```
GET    /api/quiz                  # Get quiz configuration
POST   /api/quiz/complete         # Submit quiz results
GET    /api/quiz/results/:id      # Get quiz results
```

### Recommendations API
```
POST   /api/products/recommendations  # Get personalized recommendations
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Warby Parker** - UX inspiration and engagement strategies
- **Lenskart** - Innovation in eyewear e-commerce
- **Vercel** - Deployment and hosting platform
- **Radix UI** - Accessible component primitives
- **TensorFlow.js** - AI-powered face detection
- **Framer Motion** - Smooth animations and interactions

## 🐛 Known Issues

- Face detection requires camera permissions
- AR try-on is in development
- Some animations may be reduced on low-end devices

## 🔮 Roadmap

- [ ] WebXR virtual try-on integration
- [ ] Real-time inventory management
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced AI recommendations

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@cyberoptics.com
- Documentation: [docs.cyberoptics.com](https://docs.cyberoptics.com)

---

**Built with ❤️ and ⚡ by the CyberOptics Team**