'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Loading } from '@/components/ui/Loading'
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingBag, 
  Settings,
  Eye,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Palette,
  HelpCircle,
  Bell,
  Calendar,
  Sparkles
} from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  revenue: number
  conversionRate: number
  avgOrderValue: number
  quizCompletions: number
  activeUsers: number
}

const mockStats: DashboardStats = {
  totalProducts: 156,
  totalOrders: 1234,
  totalUsers: 5678,
  revenue: 45678.90,
  conversionRate: 3.2,
  avgOrderValue: 189.50,
  quizCompletions: 892,
  activeUsers: 234
}

interface Product {
  id: string
  name: string
  price: number
  category: string
  status: 'active' | 'inactive' | 'draft'
  inventory: number
  sales: number
}

const mockProducts: Product[] = [
  { id: '1', name: 'Cyber Neon Frame', price: 299, category: 'Frames', status: 'active', inventory: 45, sales: 120 },
  { id: '2', name: 'Quantum Edge', price: 399, category: 'Frames', status: 'active', inventory: 32, sales: 89 },
  { id: '3', name: 'Holographic Dream', price: 449, category: 'Frames', status: 'inactive', inventory: 0, sales: 156 },
  { id: '4', name: 'Blue Light Pro', price: 149, category: 'Lenses', status: 'active', inventory: 78, sales: 234 },
]

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const,
      description: 'Monthly revenue growth'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      change: '+8.2%',
      changeType: 'positive' as const,
      description: 'Orders this month'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      change: '+2.1%',
      changeType: 'positive' as const,
      description: 'Active products'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: '+15.3%',
      changeType: 'positive' as const,
      description: 'Registered users'
    },
    {
      title: 'Quiz Completions',
      value: stats.quizCompletions.toLocaleString(),
      icon: HelpCircle,
      change: '+23.1%',
      changeType: 'positive' as const,
      description: 'Frame finder completions'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: Eye,
      change: '+7.8%',
      changeType: 'positive' as const,
      description: 'Users online now'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      change: '-0.5%',
      changeType: 'negative' as const,
      description: 'Quiz to purchase rate'
    },
    {
      title: 'Avg Order Value',
      value: `$${stats.avgOrderValue}`,
      icon: BarChart3,
      change: '+5.1%',
      changeType: 'positive' as const,
      description: 'Average order value'
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'inactive': return 'destructive'
      case 'draft': return 'warning'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-heading font-bold gradient-text mb-2">
              CyberOptics Admin
            </h1>
            <p className="text-neutral-gray text-lg">
              Manage your futuristic eyewear platform
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="w-4 h-4" />
            </Button>
            <Button variant="neon">
              <Plus className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white/60 backdrop-blur-md rounded-xl p-1 border border-white/30 shadow-glassmorphic">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`
                    flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                    ${selectedTab === tab.id
                      ? 'bg-gradient-primary text-white shadow-neon-glow transform scale-105'
                      : 'text-neutral-dark hover:bg-white/50 hover:text-primary hover:shadow-soft-card'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card 
                    key={index} 
                    variant="cyberpunk" 
                    hover="lift"
                    className="group"
                  >
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-neutral-gray group-hover:text-primary transition-colors">
                        {stat.title}
                      </CardTitle>
                      <Icon className="w-5 h-5 text-primary group-hover:animate-pulse" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-heading font-bold text-neutral-dark mb-2">
                        {stat.value}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          stat.changeType === 'positive' ? 'text-success' : 'text-error'
                        }`}>
                          {stat.change}
                        </p>
                        <p className="text-xs text-neutral-gray">
                          {stat.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quick Actions */}
            <Card variant="glassmorphic" padding="lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="cyberpunk" className="justify-start h-16">
                    <Package className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Add Product</div>
                      <div className="text-xs opacity-70">Create new frame</div>
                    </div>
                  </Button>
                  <Button variant="cyberpunk" className="justify-start h-16">
                    <Users className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Manage Users</div>
                      <div className="text-xs opacity-70">View all users</div>
                    </div>
                  </Button>
                  <Button variant="cyberpunk" className="justify-start h-16">
                    <ShoppingBag className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">View Orders</div>
                      <div className="text-xs opacity-70">Process orders</div>
                    </div>
                  </Button>
                  <Button variant="cyberpunk" className="justify-start h-16">
                    <Palette className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Theme Editor</div>
                      <div className="text-xs opacity-70">Customize design</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card variant="glassmorphic" padding="lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'New order #1234 received', time: '2 minutes ago', type: 'order', user: 'John Doe' },
                    { action: 'Product "Cyber Neon" inventory updated', time: '15 minutes ago', type: 'product', user: 'Admin' },
                    { action: 'New user registration', time: '1 hour ago', type: 'user', user: 'Jane Smith' },
                    { action: 'Quiz completed with recommendations', time: '2 hours ago', type: 'quiz', user: 'Mike Johnson' },
                    { action: 'Theme colors updated', time: '3 hours ago', type: 'theme', user: 'Admin' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 px-4 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/40 transition-all duration-300">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-primary rounded-full mr-4 animate-pulse"></div>
                        <div>
                          <span className="text-sm font-medium text-neutral-dark">{activity.action}</span>
                          <div className="text-xs text-neutral-gray">by {activity.user}</div>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-gray bg-white/50 px-2 py-1 rounded-full">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {selectedTab === 'products' && (
          <div className="space-y-6">
            {/* Products Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-heading font-bold text-neutral-dark">Product Management</h2>
                <p className="text-neutral-gray">Manage your eyewear catalog</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-gray" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input-cyberpunk pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="neon">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            {/* Products Table */}
            <Card variant="glassmorphic" padding="none">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-4 font-heading font-semibold text-neutral-dark">Product</th>
                      <th className="text-left p-4 font-heading font-semibold text-neutral-dark">Category</th>
                      <th className="text-left p-4 font-heading font-semibold text-neutral-dark">Price</th>
                      <th className="text-left p-4 font-heading font-semibold text-neutral-dark">Inventory</th>
                      <th className="text-left p-4 font-heading font-semibold text-neutral-dark">Sales</th>
                      <th className="text-left p-4 font-heading font-semibold text-neutral-dark">Status</th>
                      <th className="text-left p-4 font-heading font-semibold text-neutral-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-white/10 hover:bg-white/20 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-neutral-dark">{product.name}</div>
                          <div className="text-sm text-neutral-gray">ID: {product.id}</div>
                        </td>
                        <td className="p-4 text-neutral-dark">{product.category}</td>
                        <td className="p-4 font-mono text-neutral-dark">${product.price}</td>
                        <td className="p-4">
                          <span className={`font-mono ${
                            product.inventory < 10 ? 'text-error' : 
                            product.inventory < 30 ? 'text-warning' : 'text-success'
                          }`}>
                            {product.inventory}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-neutral-dark">{product.sales}</td>
                        <td className="p-4">
                          <Badge variant={getStatusBadgeVariant(product.status)}>
                            {product.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon-sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon-sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon-sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Theme Tab */}
        {selectedTab === 'theme' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-2">Theme Customization</h2>
              <p className="text-neutral-gray">Customize the look and feel of your platform</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Color Scheme */}
              <Card variant="cyberpunk" padding="lg">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Color Scheme</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Primary Color</label>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full border-2 border-white shadow-neon-glow"></div>
                        <input type="color" value="#FF0080" className="w-16 h-10 border-0 rounded cursor-pointer" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Accent Color</label>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent rounded-full border-2 border-white shadow-neon-glow"></div>
                        <input type="color" value="#B026FF" className="w-16 h-10 border-0 rounded cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <Button variant="neon" className="w-full">
                    Apply Color Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Typography */}
              <Card variant="cyberpunk" padding="lg">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Typography</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Heading Font</label>
                    <select className="input-cyberpunk">
                      <option>Orbitron (Current)</option>
                      <option>Rajdhani</option>
                      <option>Exo 2</option>
                      <option>Audiowide</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Body Font</label>
                    <select className="input-cyberpunk">
                      <option>Inter (Current)</option>
                      <option>Poppins</option>
                      <option>Source Sans Pro</option>
                      <option>Nunito Sans</option>
                    </select>
                  </div>
                  <Button variant="neon" className="w-full">
                    Apply Font Changes
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <Card variant="neon" padding="lg">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-background p-8 rounded-lg border border-primary/20">
                  <h1 className="text-4xl font-heading font-bold gradient-text mb-4">
                    CyberOptics Preview
                  </h1>
                  <p className="text-neutral-gray mb-6">
                    This is how your theme changes will look on the frontend.
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="default">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="neon">Neon Button</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs placeholder */}
        {!['overview', 'products', 'theme'].includes(selectedTab) && (
          <Card variant="glassmorphic" padding="xl">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-neon-glow">
                {tabs.find(tab => tab.id === selectedTab)?.icon && 
                  React.createElement(tabs.find(tab => tab.id === selectedTab)!.icon, { 
                    className: "w-8 h-8 text-white" 
                  })
                }
              </div>
              <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2">
                {tabs.find(tab => tab.id === selectedTab)?.label} Management
              </h3>
              <p className="text-neutral-gray mb-6">
                This section is under development. Advanced {selectedTab} management features coming soon.
              </p>
              <Button variant="cyberpunk">
                Request Early Access
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}