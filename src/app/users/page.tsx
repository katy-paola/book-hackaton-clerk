import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function CurrentUserProfilePage() {
  const session = await auth()
  
  // Si no hay usuario autenticado, redirigir al catálogo
  if (!session.userId) {
    redirect('/books')
  }
  
  // Redirigir al perfil del usuario actual
  redirect(`/users/${session.userId}`)
} 