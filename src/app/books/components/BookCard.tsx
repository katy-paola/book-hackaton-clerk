import { Database } from "@/types/database.types"

type Book = Database['public']['Tables']['books']['Row']

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="card">
      <div className="book-content">
        <div className="book-cover">
          <img 
            src={book.cover_url} 
            alt={`Portada de ${book.title}`} 
            className="book-image"
          />
        </div>
        
        <div className="book-details">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-info">
            <strong>Autor:</strong> {book.author}
          </p>
          <p className="book-info">
            <strong>Categoría:</strong> {book.category}
          </p>
          <p className="book-access">
            <span className={`access-badge ${book.access === 'free' ? 'free' : 'paid'}`}>
              {book.access === 'free' ? 'Gratuito' : 'De pago'}
            </span>
          </p>
          
          {book.description && (
            <p className="book-description">
              {book.description}
            </p>
          )}
          
          <a 
            href={book.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="button view-button"
          >
            Ver libro
          </a>
        </div>
      </div>
    </div>
  )
} 