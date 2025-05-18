import Link from "next/link"
import { Database } from "@/types/database.types"
import { Suspense } from "react"
import SaveBookButtonWrapper from "@/app/saved/components/SaveBookButtonWrapper"
import BookCardActions from "./BookCardActions"

// Updated type to include the joined users data and categories
type Book = Database['public']['Tables']['books']['Row'] & {
  users?: {
    name: string;
    avatar: string;
  } | null;
  book_categories?: {
    categories: {
      id: string;
      name: string;
    }
  }[];
}

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
          <div className="book-actions">
            <Suspense fallback={null}>
              <SaveBookButtonWrapper bookId={book.id} />
            </Suspense>
          </div>
        </div>
        
        <div className="book-details">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-info">
            <strong>Autor:</strong> {book.author}
          </p>
          
          {book.book_categories && book.book_categories.length > 0 && (
            <div className="book-categories">
              <strong>Categorías:</strong>
              <div className="category-tags">
                {book.book_categories.map(item => (
                  <span key={item.categories.id} className="category-tag">
                    {item.categories.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {book.users && book.user_id && (
            <div className="user-info">
              <strong>Agregado por:</strong>
              <Link 
                href={`/users/${book.user_id}`} 
                className="user-profile-link"
              >
                <div className="user-profile-preview">
                  <img 
                    src={book.users.avatar} 
                    alt={`Avatar de ${book.users.name}`} 
                    className="user-avatar-small" 
                  />
                  <span className="user-name">{book.users.name}</span>
                </div>
              </Link>
              
              {/* Acciones de propietario */}
              <Suspense fallback={null}>
                <BookCardActions 
                  bookId={book.id} 
                  userId={book.user_id} 
                />
              </Suspense>
            </div>
          )}
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
          
          <div className="book-buttons">
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
    </div>
  )
} 