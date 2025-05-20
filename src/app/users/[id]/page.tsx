import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUserById } from '@/app/users/services/user.service'
import { getBooksByUser } from '@/app/books/services/book.service'
import BookCard from '@/app/books/components/BookCard'
import Loading from './loading'
import EditProfileClient from './components/EditProfileClient'

// Componente que carga los libros del usuario
async function UserBooks({ userId }: { userId: string }) {
  const { data: books, error } = await getBooksByUser(userId)

  if (error) {
    throw new Error(`Error al cargar los libros: ${error.message}`)
  }

  if (!books || books.length === 0) {
    return <p className="no-books-message">Este usuario aún no ha publicado libros.</p>
  }

  return (
    <div className="books-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

// Componente para mostrar la info del usuario
async function UserInfo({ userId }: { userId: string }) {
  const { data: user, error } = await getUserById(userId)

  if (error || !user) {
    notFound()
  }

  return (
    <div className="user-profile">
      <div className="user-header">
        <img 
          src={user.avatar} 
          alt={`Avatar de ${user.name}`} 
          className="user-avatar"
        />
        <h2 className="user-name">{user.name}</h2>
      </div>
      
      <EditProfileClient user={user} />
    </div>
  )
}

export default async function UserProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="page-container">
      <div className="page-header">
        <Link href="/books" className="back-button">
          ← Volver al catálogo
        </Link>
      </div>
      
      <Suspense fallback={<Loading />}>
        <UserInfo userId={params.id} />
      </Suspense>
      
      <h3 className="section-title">Libros publicados</h3>
      
      <Suspense fallback={<Loading />}>
        <UserBooks userId={params.id} />
      </Suspense>
    </div>
  )
} 