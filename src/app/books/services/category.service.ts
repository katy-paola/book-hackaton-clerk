import { createServerSupabaseClient } from '@/app/ssr/client'
import { Tables } from '@/types/database.types'

type CategoryRow = Tables<'categories'>
type CategoryResponse = {
  data: CategoryRow[] | null;
  error: Error | null;
}

// Obtener todas las categorías disponibles
export async function getAllCategories(): Promise<CategoryResponse> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) {
      throw error
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { data: null, error: error as Error }
  }
}

// Guardar relaciones entre libro y categorías
export async function saveBookCategories(bookId: string, categoryIds: string[]): Promise<{error: Error | null}> {
  try {
    const supabase = createServerSupabaseClient()
    
    // Crear array de objetos con las relaciones libro-categoría
    const bookCategoryRelations = categoryIds.map(categoryId => ({
      book_id: bookId,
      category_id: categoryId
    }))
    
    // Insertar todas las relaciones
    const { error } = await supabase
      .from('book_categories')
      .insert(bookCategoryRelations)
    
    if (error) throw error
    
    return { error: null }
  } catch (error) {
    console.error('Error saving book categories:', error)
    return { error: error as Error }
  }
} 