import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function CurrentUserProfilePage() {
  const session = await auth()
  
  // Si no hay usuario autenticado, redirigir a la página de autenticación
  if (!session.userId) {
    redirect('/auth')
  }
  
  // Redirigir al perfil del usuario actual
  redirect(`/users/${session.userId}`)
} 