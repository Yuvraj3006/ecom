'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Settings, 
  Palette,
  BarChart3,
  Eye,
  Sparkles
} from 'lucide-react'

const stats = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12%',
    changeType: 'positive',
    icon: Users
  },
  {
    title: 'Products',
    value: '156',
    change: '+3',
    changeType: 'positive',
    icon: Package
  },
  {
    title: 'Orders',
    value: '1,234',
    change: '+8%',
    changeType: 'positive',
    icon: ShoppingCart
  },
  {
    title: 'Revenue',
    value: '$45,678',
    change: '+15%',
    changeType: 'positive',
    icon: TrendingUp
  }
]

const quickActions = [
  {
    title: 'Manage Products',
    description: 'Add, edit, or remove products',
    icon: Package,
    href: '/admin/products',
    color: 'bg-blue-500'
  },
  {
    title: 'Theme Settings',
    description: 'Customize colors and styling',
    icon: Palette,
    href: '/admin/themes',
    color: 'bg-purple-500'
  },
  {
    title: 'Banner Management',
    description: 'Create and manage banners',
    icon: Eye,
    href: '/admin/banners',
    color: 'bg-green-500'
  },
  {
    title: 'Quiz Analytics',
    description: 'View quiz performance',
    icon: Sparkles,
    href: '/admin/quiz',
    color: 'bg-pink-500'
  }
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-heading font-bold text-neutral-dark">
                CyberOptics Admin
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                View Store
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'products', label: 'Products' },
                { id: 'orders', label: 'Orders' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'settings', label: 'Settings' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-gray hover:text-neutral-dark hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} variant="glassmorphic">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-gray">{stat.title}</p>
                        <p className="text-2xl font-bold text-neutral-dark">{stat.value}</p>
                        <p className={`text-sm ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <Card key={index} variant="glassmorphic" className="group hover:shadow-neon-glow transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-dark mb-1">
                            {action.title}
                          </h3>
                          <p className="text-sm text-neutral-gray">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card variant="glassmorphic">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Recent Orders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, customer: 'Alex Chen', product: 'Cyber Neon', amount: '$299', status: 'shipped' },
                      { id: 2, customer: 'Maya Rodriguez', product: 'Quantum Edge', amount: '$349', status: 'processing' },
                      { id: 3, customer: 'Jordan Kim', product: 'Holographic Dream', amount: '$399', status: 'delivered' }
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-neutral-dark">{order.customer}</p>
                          <p className="text-sm text-neutral-gray">{order.product}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-neutral-dark">{order.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card variant="glassmorphic">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Quiz Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-gray">Total Completions</span>
                      <span className="font-semibold text-neutral-dark">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-gray">Completion Rate</span>
                      <span className="font-semibold text-neutral-dark">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-gray">Avg. Completion Time</span>
                      <span className="font-semibold text-neutral-dark">2.3 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-gray">Top Face Shape</span>
                      <span className="font-semibold text-neutral-dark">Oval (34%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented here */}
        {activeTab !== 'overview' && (
          <Card variant="glassmorphic">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h3>
              <p className="text-neutral-gray">
                This section is under development. Full admin functionality coming soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
