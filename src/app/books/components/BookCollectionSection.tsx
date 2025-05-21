import SecondaryHeader from '@/app/books/components/SecondaryHeader';
import EmptyBooksList from '@/app/books/components/EmptyBooksList';
import SearchArea from '@/app/books/components/SearchArea';
import BookCardItem from './BookCardItem';
import { BookWithIdAndCategories } from '../types/book.type';
import '../css/books.css';
import { getAllCategories } from '../services/category.service';

interface BookCollectionProps {
  titleSection: string;
  emptyBooksList: {
    message: string;
    href?: string;
    contentLink?: string;
  };
  noHasAddLink?: boolean;
  books: BookWithIdAndCategories[];
  searchQuery?: string;
  hasActiveFilters?: boolean;
}

export default async function BookCollectionSection({
  titleSection,
  emptyBooksList,
  noHasAddLink,
  books,
  searchQuery,
  hasActiveFilters,
}: BookCollectionProps) {
  const { message, href, contentLink } = emptyBooksList;
  const { data: categories, error: categoriesError } =
    await getAllCategories();
  const isEmpty = books.length === 0;

  return (
    <main className="book-collection-section">
      <SecondaryHeader
        title={titleSection}
        noHasAddLink={noHasAddLink}
      />
      <SearchArea categories={categories || []} />

      {isEmpty ? (
        <>
          {searchQuery && (
            <p className="results-message">
              No se encontraron resultados para "{searchQuery}".
              Intenta con otra palabra clave.
            </p>
          )}

          {hasActiveFilters && !searchQuery && (
            <p className="results-message">
              No se encontraron resultados que coincidan con los
              filtros aplicados.
            </p>
          )}

          {hasActiveFilters && (
            <div
              role="complementary"
              aria-label="Controles de filtros"
            >
              <button type="button" className="filter-reset-button">
                Limpiar filtros
              </button>
            </div>
          )}

          <EmptyBooksList
            message={message}
            href={href}
            contentLink={contentLink}
          />
        </>
      ) : (
        <>
          {searchQuery && (
            <p className="results-message">
              Se encontraron {books.length} resultados para "
              {searchQuery}".
            </p>
          )}

          <ul className="books-list">
            {books.map((book) => (
              <li key={book.id}>
                <BookCardItem
                  book_id={book.id}
                  user_id={book.user_id || ''}
                  title={book.title}
                  category={book.book_categories[0]?.categories.name}
                  author={book.author}
                  accessType={book.access}
                  bookLink={book.link}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
