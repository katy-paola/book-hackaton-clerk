import { NextResponse } from 'next/server'
import { ensureUserExists } from './users/services/user.service'
import { auth, currentUser } from '@clerk/nextjs/server'

export async function syncUserMiddleware() {
  try {
    const session = await auth()
    
    // Solo proceder si el usuario está autenticado
    if (session.userId) {
      const user = await currentUser()
      
      if (user) {
        // Crear objeto de usuario básico
        const userData = {
          email: user.emailAddresses[0]?.emailAddress || '',
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuario',
          avatar: user.imageUrl || 'https://via.placeholder.com/150'
        }
        
        // Sincronizar con Supabase sin importar el resultado
        // Esto ocurre en paralelo con la solicitud principal
        ensureUserExists(session.userId, userData).catch(error => 
          console.error('Error al sincronizar usuario:', error)
        )
      }
    }
  } catch (error) {
    console.error('Error en middleware de sincronización:', error)
    // No bloquear la solicitud en caso de error
  }
  
  // Continuar con la solicitud, esto no es un middleware bloqueante
  return NextResponse.next()
} 