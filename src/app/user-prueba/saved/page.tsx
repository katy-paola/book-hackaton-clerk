import '../css/user.css';
import BookCollectionSection from '@/app/books/components/BookCollectionSection';
import { BookWithIdAndCategories } from '@/app/books/types/book.type';

// Mock data until we implement real data fetching
const MOCK_BOOKS: BookWithIdAndCategories[] = [];

const EMPTY_BOOKS_LIST = {
  message: 'No tienes libros guardados aún.',
  href: '/',
  contentLink: 'Empezar a explorar',
};

export default function SavedPage() {
  return (
    <section className="saved-container">
      <BookCollectionSection
        titleSection="Libros guardados"
        emptyBooksList={EMPTY_BOOKS_LIST}
        noHasAddLink
        books={MOCK_BOOKS}
      />
    </section>
  );
}
