'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/app/ssr/server'
import { SaveBookResult } from '../types/saved.type'

export async function toggleSaveBook(bookId: string): Promise<SaveBookResult> {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session.userId) {
      return {
        error: 'Debes iniciar sesión para guardar libros'
      }
    }

    const supabase = createServerSupabaseClient()
    
    // Comprobar si el libro ya está guardado
    const { data: existingSave } = await supabase
      .from('saved')
      .select('*')
      .eq('user_id', session.userId)
      .eq('book_id', bookId)
      .single()
    
    let result: SaveBookResult;
    
    // Si ya existe, lo eliminamos (toggle off)
    if (existingSave) {
      const { error } = await supabase
        .from('saved')
        .delete()
        .eq('user_id', session.userId)
        .eq('book_id', bookId)
      
      if (error) throw error
      
      result = { success: true, saved: false, data: null }
    } 
    // Si no existe, lo guardamos (toggle on)
    else {
      const { data, error } = await supabase
        .from('saved')
        .insert({
          user_id: session.userId,
          book_id: bookId
        })
        .select()
        .single()
      
      if (error) throw error
      
      result = { success: true, saved: true, data }
    }
    
    // Revalidar las rutas relevantes
    revalidatePath('/books')
    revalidatePath('/saved')
    
    return result
  } catch (error) {
    console.error('Error al guardar/eliminar libro:', error)
    return {
      error: 'Ha ocurrido un error al procesar tu solicitud'
    }
  }
} 