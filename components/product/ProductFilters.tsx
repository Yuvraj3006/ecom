'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { X, Filter } from 'lucide-react'

interface FilterState {
  category: string[]
  priceRange: [number, number]
  colors: string[]
  faceShape: string[]
  style: string[]
  materials: string[]
}

export function ProductFilters() {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [0, 1000],
    colors: [],
    faceShape: [],
    style: [],
    materials: []
  })

  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    { value: 'eyeglasses', label: 'Eyeglasses' },
    { value: 'sunglasses', label: 'Sunglasses' },
    { value: 'blue-light', label: 'Blue Light' }
  ]

  const colors = [
    { value: 'neon-pink', label: 'Neon Pink', color: '#FF0080' },
    { value: 'electric-blue', label: 'Electric Blue', color: '#0066FF' },
    { value: 'holographic', label: 'Holographic', color: '#FF0080' },
    { value: 'metallic', label: 'Metallic', color: '#C0C0C0' },
    { value: 'matte-black', label: 'Matte Black', color: '#111111' }
  ]

  const faceShapes = [
    { value: 'oval', label: 'Oval' },
    { value: 'round', label: 'Round' },
    { value: 'square', label: 'Square' },
    { value: 'heart', label: 'Heart' },
    { value: 'diamond', label: 'Diamond' }
  ]

  const styles = [
    { value: 'cyberpunk', label: 'Cyberpunk' },
    { value: 'futuristic', label: 'Futuristic' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'artistic', label: 'Artistic' }
  ]

  const materials = [
    { value: 'acetate', label: 'Acetate' },
    { value: 'titanium', label: 'Titanium' },
    { value: 'stainless-steel', label: 'Stainless Steel' },
    { value: 'carbon-fiber', label: 'Carbon Fiber' }
  ]

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }))
  }

  const handlePriceRangeChange = (index: number, value: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: index === 0 
        ? [value, prev.priceRange[1]]
        : [prev.priceRange[0], value]
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 1000],
      colors: [],
      faceShape: [],
      style: [],
      materials: []
    })
  }

  const activeFiltersCount = Object.values(filters).flat().length

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-1">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent 
          filters={filters}
          onFilterChange={handleFilterChange}
          onPriceRangeChange={handlePriceRangeChange}
          onClearFilters={clearFilters}
          categories={categories}
          colors={colors}
          faceShapes={faceShapes}
          styles={styles}
          materials={materials}
        />
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold">Filters</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full">
              <FilterContent 
                filters={filters}
                onFilterChange={handleFilterChange}
                onPriceRangeChange={handlePriceRangeChange}
                onClearFilters={clearFilters}
                categories={categories}
                colors={colors}
                faceShapes={faceShapes}
                styles={styles}
                materials={materials}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface FilterContentProps {
  filters: FilterState
  onFilterChange: (filterType: keyof FilterState, value: string) => void
  onPriceRangeChange: (index: number, value: number) => void
  onClearFilters: () => void
  categories: Array<{ value: string; label: string }>
  colors: Array<{ value: string; label: string; color: string }>
  faceShapes: Array<{ value: string; label: string }>
  styles: Array<{ value: string; label: string }>
  materials: Array<{ value: string; label: string }>
}

function FilterContent({
  filters,
  onFilterChange,
  onPriceRangeChange,
  onClearFilters,
  categories,
  colors,
  faceShapes,
  styles,
  materials
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-heading text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-medium text-neutral-dark mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.category.includes(category.value)}
                onChange={() => onFilterChange('category', category.value)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-neutral-gray">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-neutral-dark mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => onPriceRangeChange(0, Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Min"
            />
            <span className="text-neutral-gray">to</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => onPriceRangeChange(1, Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Max"
            />
          </div>
          <div className="text-sm text-neutral-gray">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="font-medium text-neutral-dark mb-3">Colors</h4>
        <div className="space-y-2">
          {colors.map(color => (
            <label key={color.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.colors.includes(color.value)}
                onChange={() => onFilterChange('colors', color.value)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.color }}
                />
                <span className="text-sm text-neutral-gray">{color.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Face Shape */}
      <div>
        <h4 className="font-medium text-neutral-dark mb-3">Face Shape</h4>
        <div className="space-y-2">
          {faceShapes.map(shape => (
            <label key={shape.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.faceShape.includes(shape.value)}
                onChange={() => onFilterChange('faceShape', shape.value)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-neutral-gray">{shape.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <h4 className="font-medium text-neutral-dark mb-3">Style</h4>
        <div className="space-y-2">
          {styles.map(style => (
            <label key={style.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.style.includes(style.value)}
                onChange={() => onFilterChange('style', style.value)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-neutral-gray">{style.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <h4 className="font-medium text-neutral-dark mb-3">Materials</h4>
        <div className="space-y-2">
          {materials.map(material => (
            <label key={material.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.materials.includes(material.value)}
                onChange={() => onFilterChange('materials', material.value)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-neutral-gray">{material.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
