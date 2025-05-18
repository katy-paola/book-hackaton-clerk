'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { validateBook } from '../schemas/book.schema'
import { addBook as addBookService } from '../services/book.service'
import { saveBookCategories } from '../services/category.service'
import { BookRow } from '../types/book.type'

export type AddBookResult = 
  | { success: true; data: BookRow[] }
  | { error: string; success?: never }

export async function addBook(formData: FormData): Promise<AddBookResult> {
  try {
    // Verifica autenticación usando Clerk
    const session = await auth()
    if (!session.userId) {
      return {
        error: 'Debes iniciar sesión para agregar un libro'
      }
    }

    // Obtener categorías seleccionadas
    const categoryIds = formData.getAll('categories') as string[]
    
    // Validar que al menos hay una categoría seleccionada
    if (!categoryIds.length) {
      return { error: 'Debes seleccionar al menos una categoría' }
    }

    // Valida los datos del formulario básicos del libro
    const validation = validateBook(formData)
    if (!validation.success) {
      return { error: validation.error }
    }

    const bookData = validation.data
    
    // Usa la función del servicio para agregar el libro
    const { data, error } = await addBookService({
      ...bookData,
      user_id: session.userId
    })

    if (error) {
      // Manejo específico para errores conocidos
      const errorMessage = error.message || 'Error al agregar el libro'
      
      // Error de unicidad (depende de cómo esté configurada la BD)
      if ('code' in error && error.code === '23505') {
        return {
          error: 'Ya existe un libro con esas características'
        }
      }
      
      return { error: errorMessage }
    }

    if (data && data.length > 0) {
      // Guardar las relaciones libro-categorías
      const bookId = data[0].id
      const { error: categoriesError } = await saveBookCategories(bookId, categoryIds)
      
      if (categoriesError) {
        console.error('Error al guardar categorías:', categoriesError)
        // No fallamos completamente, el libro se guarda pero las categorías pueden fallar
      }
    }

    // Revalidar la ruta para actualizar la lista de libros
    revalidatePath('/books')

    return {
      success: true,
      data: data || []
    }
  } catch (error) {
    console.error('Error en la acción del servidor:', error)
    return {
      error: 'Ha ocurrido un error al agregar el libro'
    }
  }
} 