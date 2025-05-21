'use server'

import { auth } from '@clerk/nextjs/server'
import { createServerSupabaseClient } from '@/app/ssr/server'
import { Tables } from '@/types/database.types'

type CategoryRow = Tables<'categories'>
type AddCategoryResult = 
  | { success: true; data: CategoryRow }
  | { error: string; success?: never }

export async function addCategory(name: string): Promise<AddCategoryResult> {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session.userId) {
      return {
        error: 'Debes iniciar sesión para crear categorías'
      }
    }

    // Validar datos
    if (!name || name.trim().length < 2) {
      return {
        error: 'La categoría debe tener al menos 2 caracteres'
      }
    }

    const supabase = createServerSupabaseClient()
    
    // Comprobar si la categoría ya existe (case insensitive)
    const { data: existingCategory } = await supabase
      .from('categories')
      .select('*')
      .ilike('name', name.trim())
      .maybeSingle()
    
    if (existingCategory) {
      return {
        error: 'Esta categoría ya existe'
      }
    }
    
    // Insertar la nueva categoría
    const { data, error } = await supabase
      .from('categories')
      .insert({ name: name.trim() })
      .select()
      .single()
    
    if (error) throw error
    
    return { 
      success: true,
      data
    }
  } catch (error) {
    console.error('Error al crear categoría:', error)
    return {
      error: 'Ha ocurrido un error al crear la categoría'
    }
  }
} 