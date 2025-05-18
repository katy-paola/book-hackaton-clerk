import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/app/ssr/client'

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from('categories').select('*')
    
    if (error) {
      return NextResponse.json(
        { error: 'Error al obtener categorías' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error en la ruta de API de categorías:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 