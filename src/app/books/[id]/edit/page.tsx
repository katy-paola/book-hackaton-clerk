import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { getBookById } from '@/app/books/services/book.service'

import EditBookForm from './EditBookForm'

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const bookId = params.id
  
  // Verificar si el usuario está autenticado
  const { userId } = await auth()
  if (!userId) {
    redirect('/books')
  }
  
  // Obtener el libro
  const { data: book, error } = await getBookById(bookId)
  
  // Verificar si el libro existe y pertenece al usuario
  if (error || !book) {
    redirect('/books')
  }
  
  if (book.user_id !== userId) {
    // Si el libro no pertenece al usuario, redireccionar
    redirect('/books')
  }
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Editar Libro</h1>
        <Link href="/books" className="back-button">
          ← Volver al catálogo
        </Link>
      </div>
      
     
        <EditBookForm book={book} />
    </div>
  )
} 