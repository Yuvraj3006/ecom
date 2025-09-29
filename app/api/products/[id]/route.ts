import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${params.id}`)
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Product API error:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}


