'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Search, X } from 'lucide-react'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Implement search functionality
      console.log('Searching for:', query)
    }
  }

  const clearSearch = () => {
    setQuery('')
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-gray" />
        <Input
          type="text"
          placeholder="Search frames, colors, styles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10 py-3 text-lg"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-neutral-gray" />
          </button>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        size="sm"
      >
        Search
      </Button>
    </form>
  )
}
