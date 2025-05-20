'use server'

import { createServerSupabaseClient } from '@/app/ssr/client'
import { TablesUpdate } from '@/types/database.types'

export async function updateUserAction(
  userId: string, 
  userData: TablesUpdate<'users'>
) {
  try {
    const supabase = createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error updating user:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido al actualizar el usuario' 
    }
  }
} 