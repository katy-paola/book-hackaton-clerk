'use server'

import { createServerSupabaseClient } from '@/app/ssr/client'
import { Tables } from '@/types/database.types'

type CategoryRow = Tables<'categories'>

// Server action to fetch all categories
export async function fetchCategoriesAction(): Promise<{
  success: boolean;
  data: CategoryRow[] | null;
  error: string | null;
}> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) {
      throw error
    }
    
    return { success: true, data, error: null }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { 
      success: false, 
      data: null, 
      error: error instanceof Error ? error.message : 'Error desconocido al cargar categorías' 
    }
  }
} 