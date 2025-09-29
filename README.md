# CyberOptics - Cyberpunk Eyewear Platform

A futuristic eyewear e-commerce platform featuring AI-powered frame recommendations, AR try-on technology, and a cyberpunk aesthetic.

## Features

- 🎯 **AI-Powered Frame Finder Quiz** - Personalized recommendations based on face shape, style, and lifestyle
- 🥽 **AR Try-On Experience** - Virtual try-on using camera and AR technology
- 🛒 **Advanced Shopping Cart** - Full e-commerce functionality with cart management
- 👤 **User Authentication** - Secure login/registration with NextAuth.js
- 📱 **Responsive Design** - Mobile-first design with cyberpunk aesthetics
- 🎨 **Modern UI Components** - Glassmorphic design with neon accents
- 🛍️ **Product Management** - Full CRUD operations for products
- 📊 **Admin Dashboard** - Analytics and order management
- 💳 **Payment Integration** - Stripe payment processing
- 🔍 **Advanced Search & Filters** - Product filtering and search functionality

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **NextAuth.js** - Authentication
- **Zustand** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

### Additional Libraries
- **Three.js** - 3D graphics for AR
- **TensorFlow.js** - Machine learning for face detection
- **Stripe** - Payment processing
- **Concurrently** - Run multiple processes

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

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
   cp .env.example .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/cyberoptics
   API_BASE_URL=http://localhost:5000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   JWT_SECRET=your-jwt-secret-here
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Seed the database**
   ```bash
   npm run server
   # In another terminal
   node server/seed.js
   ```

6. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start individually
   npm run dev        # Frontend (port 3000)
   npm run server     # Backend (port 5000)
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
cyberpunk-eyewear-platform/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── account/           # User account pages
│   ├── admin/             # Admin dashboard
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── product/           # Product pages
│   ├── quiz/              # Frame finder quiz
│   └── shop/              # Shop page
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── cart/             # Cart components
│   ├── layout/           # Layout components
│   ├── product/          # Product components
│   ├── providers/        # Context providers
│   ├── quiz/             # Quiz components
│   ├── sections/         # Homepage sections
│   └── ui/               # UI components
├── server/               # Backend server
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── middleware/       # Custom middleware
├── types/                # TypeScript types
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Key Features Implementation

### 1. Frame Finder Quiz
- Interactive multi-step quiz
- AI-powered recommendations
- Face shape analysis
- Style and lifestyle matching
- Personalized results

### 2. AR Try-On
- Camera integration
- Face detection using TensorFlow.js
- 3D frame overlay with Three.js
- Real-time try-on experience

### 3. Shopping Experience
- Product catalog with advanced filtering
- Search functionality
- Shopping cart with persistence
- Checkout process with Stripe integration

### 4. User Management
- Authentication with NextAuth.js
- User profiles and preferences
- Order history
- Prescription management

### 5. Admin Dashboard
- Product management
- Order tracking
- Analytics and reporting
- User management

## API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products
- `POST /api/products/recommendations` - Get AI recommendations

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status

### Quiz
- `GET /api/quiz/active` - Get active quiz
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/history/:userId` - Get user quiz history

## Database Models

### User
- Personal information
- Preferences and quiz results
- Addresses and prescriptions
- Order history

### Product
- Product details and attributes
- Inventory management
- Ratings and reviews
- SEO metadata

### Order
- Order items and pricing
- Shipping and billing
- Payment information
- Status tracking

### Quiz
- Quiz questions and analytics
- Completion tracking
- Popular answers analysis

## Styling and Design

The platform uses a cyberpunk aesthetic with:
- **Color Palette**: Neon pinks, electric blues, holographic effects
- **Typography**: Orbitron for headings, Inter for body text
- **Components**: Glassmorphic design with backdrop blur
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## Development Scripts

```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run server       # Start backend server
npm run dev:full     # Start both frontend and backend
```

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Create new project on Railway/Heroku
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Get connection string
3. Update MONGODB_URI in environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@cyberoptics.com or create an issue in the repository.


