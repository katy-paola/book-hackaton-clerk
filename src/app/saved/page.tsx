import { Suspense } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { getSavedBooks } from './services/saved.service'
import BookCard from '@/app/books/components/BookCard'
import Loading from './loading'

// Componente que muestra la lista de libros guardados
async function SavedBooksList() {
  const { data: books, error } = await getSavedBooks()

  if (error) {
    throw new Error(`Error al cargar libros guardados: ${error.message}`)
  }

  if (!books || books.length === 0) {
    return (
      <div className="no-saved-books">
        <p className="no-books-message">Aún no has guardado ningún libro.</p>
        <Link href="/books" className="button">
          Explorar catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="books-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default async function SavedBooksPage() {
  // Verificar si el usuario está autenticado
  const { userId } = await auth()
  if (!userId) {
    redirect('/books')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Mis Libros Guardados</h1>
        <Link href="/books" className="back-button">
          ← Volver al catálogo
        </Link>
      </div>
      
      <Suspense fallback={<Loading />}>
        <SavedBooksList />
      </Suspense>
    </div>
  )
} 