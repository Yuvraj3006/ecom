export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  category: string
  subcategory: string
  brand: string
  model: string
  sku: string
  price: number
  comparePrice?: number
  images: Array<{
    url: string
    alt: string
    isPrimary: boolean
  }>
  attributes: {
    faceShape?: string[]
    style?: string[]
    colors?: string[]
    materials?: string[]
    features?: string[]
    frameType?: string
    bridgeWidth?: number
    lensWidth?: number
    templeLength?: number
    weight?: number
  }
  inventory: {
    total: number
    available: number
    reserved: number
  }
  isActive: boolean
  isFeatured: boolean
  isNew: boolean
  isOnSale: boolean
  ratings: {
    average: number
    count: number
  }
  salesCount: number
  viewCount: number
  relatedProducts?: string[]
  crossSellProducts?: string[]
  upsellProducts?: string[]
  tags?: string[]
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  frameId?: string
  lensId?: string
  prescription?: any
}

export interface Order {
  _id: string
  user: string
  items: Array<{
    product: string
    variant?: string
    quantity: number
    price: number
    total: number
    prescription?: any
  }>
  pricing: {
    subtotal: number
    tax: number
    shipping: number
    total: number
  }
  shipping: {
    method: string
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
  }
  billing: {
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
  }
  payment: {
    method: string
    status: string
    transactionId?: string
  }
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  trackingNumber?: string
  notes: {
    internal?: string
    customer?: string
  }
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: string
  preferences?: {
    faceShape?: string
    style?: string[]
    colors?: string[]
    budget?: string
  }
  addresses?: Array<{
    type: 'shipping' | 'billing'
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    isDefault: boolean
  }>
  prescriptions?: Array<{
    eye: 'left' | 'right'
    sphere: number
    cylinder: number
    axis: number
    pupillaryDistance: number
    doctorName: string
    doctorPhone: string
    expirationDate: string
    uploadDate: string
  }>
  quizResults?: Array<{
    faceShape: string
    style: string[]
    lifestyle: string[]
    colors: string[]
    recommendations: string[]
    completedAt: string
  }>
  wishlist?: string[]
  role: 'customer' | 'staff' | 'admin'
  isActive: boolean
  lastLogin?: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface QuizResult {
  faceShape: string
  style: string
  lifestyle: string
  colors: string[]
  recommendations: string[]
  completedAt: Date
}


