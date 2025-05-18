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

// Función para obtener categorías que tienen libros asociados
export async function getCategoriesWithBooks(): Promise<{
  data: { id: string; name: string; book_count: number }[] | null;
  error: Error | null;
}> {
  try {
    const supabase = createServerSupabaseClient()
    
    // Consulta para obtener categorías con el conteo de libros asociados
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id, 
        name, 
        book_categories!inner(book_id)
      `)
    
    if (error) {
      throw error
    }
    
    // Procesar los resultados para contar libros por categoría
    const categoriesWithCount = data.map(category => {
      return {
        id: category.id,
        name: category.name,
        book_count: category.book_categories ? category.book_categories.length : 0
      }
    }).filter(category => category.book_count > 0)
    
    return { data: categoriesWithCount, error: null }
  } catch (error) {
    console.error('Error fetching categories with books:', error)
    return { data: null, error: error as Error }
  }
}

// Función para obtener libros filtrados por categorías y/o acceso
export async function getFilteredBooks(
  filters: {
    categoryIds?: string[];
    accessTypes?: string[];
  }
): Promise<BookResponse> {
  try {
    const { categoryIds = [], accessTypes = [] } = filters;
    const supabase = createServerSupabaseClient()
    
    // Si no hay filtros activos, devolver todos los libros
    if (categoryIds.length === 0 && accessTypes.length === 0) {
      return getAllBooks()
    }
    
    // Iniciar la consulta base
    let query = supabase
      .from('books')
      .select(`
        *,
        users:user_id(name, avatar),
        book_categories(
          categories(id, name)
        )
      `)
    
    // Si hay categorías seleccionadas, aplicar filtro con inner join
    if (categoryIds.length > 0) {
      // Modificar la consulta para usar inner join con categorías
      query = supabase
        .from('books')
        .select(`
          *,
          users:user_id(name, avatar),
          book_categories!inner(
            categories!inner(id, name)
          )
        `)
        .filter('book_categories.categories.id', 'in', `(${categoryIds.join(',')})`)
    }
    
    // Si hay filtros de acceso, aplicarlos
    if (accessTypes.length > 0 && accessTypes.length < 2) {
      // Si solo hay un tipo seleccionado, usamos eq
      query = query.eq('access', accessTypes[0] as 'free' | 'paid')
    } else if (accessTypes.length === 2) {
      // Si están ambos tipos seleccionados, no filtramos por acceso
      // ya que queremos mostrar todos los libros (pero mantenemos los otros filtros)
    }
    
    // Ordenar resultados
    query = query.order('created_at', { ascending: false })
    
    // Ejecutar la consulta
    const { data, error } = await query
    
    if (error) {
      throw error
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching filtered books:', error)
    return { data: null, error: error as Error }
  }
}

// Función para obtener libros filtrados por categorías (mantener por compatibilidad)
export async function getBooksByCategories(categoryIds: string[]): Promise<BookResponse> {
  return getFilteredBooks({ categoryIds })
} 