import Link from 'next/link'
import AddBookForm from './AddBookForm'

export default function AddBookPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Agregar Nuevo Libro</h1>
        <Link href="/books" className="back-button">
          ← Volver al catálogo
        </Link>
      </div>
      
        <AddBookForm />
    </div>
  )
} 