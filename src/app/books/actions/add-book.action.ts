'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { validateBook } from '../schemas/book.schema'
import { addBook as addBookService } from '../services/book.service'
import { ensureUserExists } from '@/app/users/services/user.service'
import { Database } from '@/types/database.types'

type BookRow = Database['public']['Tables']['books']['Row']
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

    // Obtenemos los datos del usuario actual de Clerk
    const user = await currentUser()
    if (!user) {
      return {
        error: 'No se pudo obtener la información del usuario'
      }
    }

    // Preparamos los datos del usuario para Supabase
    const userData = {
      email: user.emailAddresses[0]?.emailAddress || '',
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuario',
      // Usamos la imagen de perfil de Clerk o una imagen por defecto
      avatar: user.imageUrl || 'https://via.placeholder.com/150'
    }

    // Verificar si el usuario existe en Supabase, si no, crearlo
    const { error: userError } = await ensureUserExists(
      session.userId,
      userData
    )

    if (userError) {
      return {
        error: `Error al verificar/crear el usuario: ${userError.message}`
      }
    }

    // Valida los datos del formulario
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