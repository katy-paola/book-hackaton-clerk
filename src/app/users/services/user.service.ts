import { createServerSupabaseClient } from '@/app/ssr/client'
import { Database } from '@/types/database.types'

type User = Database['public']['Tables']['users']['Insert']
type UserResponse = {
  data: Database['public']['Tables']['users']['Row'] | null;
  error: Error | null;
}

export async function getUserById(id: string): Promise<UserResponse> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      // Si el error es "no se encontró el registro", retornamos null sin error
      if (error.code === 'PGRST116') {
        return { data: null, error: null }
      }
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { data: null, error: error as Error }
  }
}

export async function createUser(user: User): Promise<UserResponse> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single()

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error creating user:', error)
    return { data: null, error: error as Error }
  }
}

export async function ensureUserExists(
  id: string, 
  userData: { email: string; name: string; avatar: string }
): Promise<UserResponse> {
  // 1. Intentamos obtener el usuario
  const { data: existingUser, error: fetchError } = await getUserById(id)
  
  // Si hubo un error al obtener el usuario, retornamos el error
  if (fetchError) {
    return { data: null, error: fetchError }
  }
  
  // Si el usuario ya existe, lo retornamos
  if (existingUser) {
    return { data: existingUser, error: null }
  }
  
  // 2. Si no existe, lo creamos
  return await createUser({
    id,
    email: userData.email,
    name: userData.name,
    avatar: userData.avatar
  })
} 