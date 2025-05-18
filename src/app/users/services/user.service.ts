import { createServerSupabaseClient } from '@/app/ssr/client'
import { UserRow } from '../types/user.type';

type UserResponse = {
  data: UserRow | null;
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


