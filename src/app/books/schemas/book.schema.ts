import { z } from 'zod'

// Esquema de validación para un libro
export const BookSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  author: z.string().min(1, 'El autor es requerido'),
  description: z.string().optional(),
  cover_url: z.string().url('La URL de la portada no es válida').optional(),
  link: z.string().url('El enlace del libro no es válido'),
  access: z.enum(['free', 'paid'], {
    errorMap: () => ({ message: 'El acceso debe ser "free" o "paid"' })
  }),
})

export type Book = z.infer<typeof BookSchema>

export type ValidationResult = 
  | { success: true; data: Book }
  | { success: false; error: string }

export function validateBook(formData: FormData): ValidationResult {
  try {
    const title = formData.get('title')
    const author = formData.get('author')
    const description = formData.get('description')
    const link = formData.get('link')
    const access = formData.get('access')

    // Ya no es necesario buscar cover_url, ya que ahora manejamos un archivo
    // La URL real se generará después de cargar el archivo a Supabase Storage

    const result = BookSchema.safeParse({
      title,
      author,
      description: description || undefined,
      link,
      access,
    })

    if (!result.success) {
      // Extraer el primer mensaje de error
      const firstError = result.error.errors[0]
      return { success: false, error: firstError.message }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (err) {
    console.error('Error en validación:', err)
    return {
      success: false,
      error: 'Ha ocurrido un error en la validación'
    }
  }
} 