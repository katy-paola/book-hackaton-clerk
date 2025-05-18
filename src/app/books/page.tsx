import { Suspense } from 'react'
import Link from 'next/link'
import BookCard from './components/BookCard'
import Loading from './loading'
import { getAllBooks } from './services/book.service'

// Componente que se encarga de la carga de datos
async function BooksList() {
  const { data: books, error } = await getAllBooks()

  if (error) {
    throw new Error(`Error al cargar los libros: ${error.message}`)
  }

  if (!books || books.length === 0) {
    return <p className="no-books-message">No hay libros disponibles.</p>
  }

  return (
    <div className="books-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default function BooksPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Catálogo de Libros</h1>
        
        <Link href="/books/add">
          <button className="button">
            Agregar Libro
          </button>
        </Link>
      </div>
      
      <Suspense fallback={<Loading />}>
        <BooksList />
      </Suspense>
    </div>
  )
} 