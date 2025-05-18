import { createServerSupabaseClient } from '@/app/ssr/client'
import { Book } from '../schemas/book.schema'
import { Database } from '@/types/database.types'

type BookWithId = Book & { user_id: string }
type BookResponse = {
  data: Database['public']['Tables']['books']['Row'][] | null;
  error: Error | null;
}

type SingleBookResponse = {
  data: Database['public']['Tables']['books']['Row'] | null;
  error: Error | null;
}

// Función para obtener todos los libros
export async function getAllBooks(): Promise<BookResponse> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        users:user_id(name, avatar),
        book_categories(
          categories(id, name)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching books:', error)
    return { data: null, error: error as Error }
  }
}

// Función para agregar un libro
export async function addBook(book: BookWithId): Promise<BookResponse> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('books')
      .insert(book)
      .select()

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error adding book:', error)
    return { data: null, error: error as Error }
  }
}

// Función para obtener libros de un usuario específico
export async function getBooksByUser(userId: string): Promise<BookResponse> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        users:user_id(name, avatar),
        book_categories(
          categories(id, name)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching user books:', error)
    return { data: null, error: error as Error }
  }
}

// Función para obtener un libro específico por ID
export async function getBookById(bookId: string): Promise<SingleBookResponse> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        users:user_id(name, avatar),
        book_categories(
          categories(id, name)
        )
      `)
      .eq('id', bookId)
      .single()

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching book:', error)
    return { data: null, error: error as Error }
  }
} 