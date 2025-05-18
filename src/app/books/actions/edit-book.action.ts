'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/app/ssr/client'
import { validateBook } from '../schemas/book.schema'
import { Tables } from '@/types/database.types'

type BookRow = Tables<'books'>

export type EditBookResult = 
  | { success: true; data: BookRow }
  | { error: string; success?: never }

export async function editBook(bookId: string, formData: FormData): Promise<EditBookResult> {
  try {
    console.log('Server action - editBook called');
    console.log('Book ID:', bookId);
    
    // Log form data
    console.log('Form data entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    // Verificar autenticación
    const { userId } = await auth()
    console.log('User ID:', userId);
    
    if (!userId) {
      console.log('Authentication failed: No user ID');
      return { error: 'Debes iniciar sesión para editar un libro' }
    }

    // Obtener las categorías seleccionadas
    const categoryIds = formData.getAll('categories') as string[]
    console.log('Categories IDs:', categoryIds);
    
    // Validar los datos del formulario
    const validation = validateBook(formData)
    if (!validation.success) {
      console.log('Validation failed:', validation.error);
      return { error: validation.error }
    }

    const supabase = createServerSupabaseClient()
    
    // Primero verificamos que el libro pertenezca al usuario actual
    const { data: book, error: fetchError } = await supabase
      .from('books')
      .select('user_id')
      .eq('id', bookId)
      .single()
    
    if (fetchError) {
      console.error('Error fetching book:', fetchError);
      return { error: 'Error al buscar el libro' }
    }
    
    if (!book) {
      console.log('Book not found');
      return { error: 'Libro no encontrado' }
    }
    
    if (book.user_id !== userId) {
      console.log(`Permission denied: book.user_id (${book.user_id}) !== userId (${userId})`);
      return { error: 'No tienes permiso para editar este libro' }
    }
    
    // Actualizar datos del libro
    const bookData = validation.data
    console.log('Book data to update:', bookData);
    
    const { data: updatedBook, error: updateError } = await supabase
      .from('books')
      .update({
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        cover_url: bookData.cover_url,
        access: bookData.access,
        link: bookData.link,
      })
      .eq('id', bookId)
      .select()
      .single()
    
    if (updateError) {
      console.error('Error updating book:', updateError);
      return { error: 'Error al actualizar el libro' }
    }
    
    // Actualizar categorías si se proporcionaron
    if (categoryIds.length > 0) {
      console.log('Updating categories...');
      
      // Eliminar categorías existentes
      const { error: deleteError } = await supabase
        .from('book_categories')
        .delete()
        .eq('book_id', bookId)
      
      if (deleteError) {
        console.error('Error deleting existing categories:', deleteError);
      }
      
      // Insertar nuevas categorías
      const bookCategories = categoryIds.map(categoryId => ({
        book_id: bookId,
        category_id: categoryId
      }))
      
      console.log('New book categories:', bookCategories);
      
      const { error: categoriesError } = await supabase
        .from('book_categories')
        .insert(bookCategories)
      
      if (categoriesError) {
        console.error('Error inserting new categories:', categoriesError);
        // No fallamos completamente si hay error en las categorías
      }
    } else {
      console.log('No categories to update');
    }
    
    // Revalidar rutas
    revalidatePath('/books')
    revalidatePath(`/books/${bookId}`)
    revalidatePath('/users/[id]')
    
    console.log('Book successfully updated');
    
    return { 
      success: true, 
      data: updatedBook 
    }
  } catch (error) {
    console.error('Exception in editBook:', error);
    return { error: 'Ha ocurrido un error al editar el libro' }
  }
} 