import { createServerSupabaseClient } from '@/app/ssr/server'
import { auth } from '@clerk/nextjs/server'
import { Tables } from '@/types/database.types'

type BookRow = Tables<'books'>
type SavedBooksResponse = {
  data: BookRow[] | null;
  error: Error | null;
}

// Función para obtener todos los libros guardados del usuario
export async function getSavedBooks(): Promise<SavedBooksResponse> {
  try {
    const session = await auth()
    if (!session.userId) {
      return { data: null, error: new Error('No autenticado') }
    }
    
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('saved')
      .select('*, books(*)')
      .eq('user_id', session.userId)
    
    if (error) throw error
    
    return { 
      data: data.map(saved => saved.books), 
      error: null 
    }
  } catch (error) {
    console.error('Error al obtener libros guardados:', error)
    return { data: null, error: error as Error }
  }
}

// Función para verificar si un libro está guardado por el usuario actual
export async function isBookSaved(bookId: string): Promise<boolean> {
  try {
    const session = await auth()
    if (!session.userId) return false
    
    const supabase = createServerSupabaseClient()
    const { data } = await supabase
      .from('saved')
      .select('*')
      .eq('user_id', session.userId)
      .eq('book_id', bookId)
      .single()
    
    return !!data
  } catch (error) {
    console.error('Error al verificar libro guardado:', error)
    return false
  }
} 