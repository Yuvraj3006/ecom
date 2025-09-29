import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilters } from '@/components/product/ProductFilters'
import { SearchBar } from '@/components/product/SearchBar'

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">Shop Frames</span>
          </h1>
          <p className="text-lg text-neutral-gray">
            Discover our collection of cyberpunk-inspired eyewear
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <ProductFilters />
          </div>
          
          <div className="lg:w-3/4">
            <div className="mb-6">
              <SearchBar />
            </div>
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
