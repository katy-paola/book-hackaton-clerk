'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/app/ssr/server'
import { validateBook } from '../schemas/book.schema'
import { Tables } from '@/types/database.types'
import { uploadBookCover } from '../services/storage.service'

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
      console.log(`${key}: ${typeof value === 'object' ? 'File object' : value}`);
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
      .select('user_id, cover_url')
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
    
    // Obtener los datos del libro
    const bookData = validation.data
    
    // Procesar la imagen de portada si se seleccionó una nueva
    let coverUrl = bookData.cover_url || book.cover_url;
    
    const coverFile = formData.get('cover') as File;
    if (coverFile && coverFile instanceof File && coverFile.size > 0) {
      console.log('Processing new cover image:', coverFile.name);
      
      // Cargar la nueva imagen a Supabase Storage
      const { url: newCoverUrl, error: uploadError } = await uploadBookCover(coverFile, userId);
      
      if (uploadError) {
        console.error('Error uploading cover image:', uploadError);
        return { error: 'Error al cargar la imagen de portada: ' + uploadError.message };
      }
      
      if (newCoverUrl) {
        console.log('New cover URL:', newCoverUrl);
        coverUrl = newCoverUrl;
      } else {
        console.log('No cover URL received from upload');
        return { error: 'No se pudo obtener la URL de la imagen cargada' };
      }
    } else {
      console.log('Using existing cover URL:', coverUrl);
    }
    
    // Actualizar datos del libro con la URL de la portada
    console.log('Book data to update:', {
      ...bookData,
      cover_url: coverUrl
    });
    
    // First update the book without retrieving data
    const { error: updateError } = await supabase
      .from('books')
      .update({
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        cover_url: coverUrl,
        access: bookData.access,
        link: bookData.link,
      })
      .eq('id', bookId)
    
    if (updateError) {
      console.error('Error updating book:', updateError);
      return { error: 'Error al actualizar el libro' }
    }
    
    // Then fetch the updated book
    const { data: updatedBook, error: fetchUpdatedError } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .single()
    
    if (fetchUpdatedError) {
      console.error('Error fetching updated book:', fetchUpdatedError);
      // Continue anyway, as the update was successful
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
    
    // Ensure we have a valid BookRow object
    const fallbackBook: BookRow = {
      id: bookId,
      title: bookData.title,
      author: bookData.author,
      description: bookData.description || null,
      cover_url: coverUrl || '', // Use the updated cover URL
      access: bookData.access,
      link: bookData.link,
      user_id: userId,
      created_at: null
    }
    
    return { 
      success: true, 
      data: updatedBook || fallbackBook
    }
  } catch (error) {
    console.error('Exception in editBook:', error);
    return { error: 'Ha ocurrido un error al editar el libro' }
  }
} 