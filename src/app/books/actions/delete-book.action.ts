'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/app/ssr/client'

export type DeleteBookResult = 
  | { success: true }
  | { error: string; success?: never }

export async function deleteBook(bookId: string): Promise<DeleteBookResult> {
  try {
    // Verificar autenticación
    const { userId } = await auth()
    if (!userId) {
      return { error: 'Debes iniciar sesión para eliminar un libro' }
    }

    const supabase = createServerSupabaseClient()
    
    // Primero verificamos que el libro pertenezca al usuario actual
    const { data: book, error: fetchError } = await supabase
      .from('books')
      .select('user_id')
      .eq('id', bookId)
      .single()
    
    if (fetchError) {
      return { error: 'Error al buscar el libro' }
    }
    
    if (!book) {
      return { error: 'Libro no encontrado' }
    }
    
    if (book.user_id !== userId) {
      return { error: 'No tienes permiso para eliminar este libro' }
    }
    
    // Primero eliminamos las relaciones con categorías
    await supabase
      .from('book_categories')
      .delete()
      .eq('book_id', bookId)
    
    // Luego eliminamos las relaciones con usuarios guardados
    await supabase
      .from('saved')
      .delete()
      .eq('book_id', bookId)
    
    // Finalmente eliminamos el libro
    const { error: deleteError } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId)
    
    if (deleteError) {
      return { error: 'Error al eliminar el libro' }
    }
    
    // Revalidar rutas
    revalidatePath('/books')
    revalidatePath('/users/[id]')
    revalidatePath('/saved')
    
    return { success: true }
  } catch (error) {
    console.error('Error al eliminar libro:', error)
    return { error: 'Ha ocurrido un error al eliminar el libro' }
  }
} 