import console from 'console';
import BookCollectionSection from './books/components/BookCollectionSection';
import { getAllBooks } from './books/services/book.service';
import './home.css';
import { Suspense } from 'react';

const EMPTY_BOOKS_LIST = {
  message:
    'Aún no hay libros publicados, puedes empezar por crear tu lista personal.',
  href: '/add-book-prueba',
  contentLink: 'Agregar mi primer libro',
};

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    categories?: string;
    access?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const categories = searchParams?.categories?.split(',');
  const access = searchParams?.access?.split(',');

  const { data: books, error } = await getAllBooks({
    categories: categories,
    query: query,
    accessTypes: access,
  });

  if (error) {
    console.error('Error fetching books:', error);
    return <div>Error fetching books</div>;
  }

  return (
    <section>
      <section className="about">
        <h1 className="main-title">
          BooK - No pierdas tus libros por leer
        </h1>
        <p className="main-description">
          Crea tu colección personal, explora listas públicas y mantén
          a mano todo lo que quieres leer.
        </p>
      </section>

      <BookCollectionSection
        titleSection="Publicado por otros"
        books={books || []}
        searchQuery={query}
        emptyBooksList={EMPTY_BOOKS_LIST}
      />
    </section>
  );
}
