import { Suspense } from 'react';
import Link from 'next/link';
import BookCard from './components/BookCard';
import Loading from './loading';
import CategoryFilterWrapper from './components/CategoryFilterWrapper';
import AccessFilter from './components/AccessFilter';
import { getFilteredBooks } from './services/book.service';

type BooksListProps = {
  selectedCategories?: string[];
  selectedAccessTypes?: string[];
};

// Componente que se encarga de la carga de datos
async function BooksList({
  selectedCategories = [],
  selectedAccessTypes = [],
}: BooksListProps) {
  // Obtener libros con los filtros aplicados
  const { data: books, error } = await getFilteredBooks({
    categoryIds: selectedCategories,
    accessTypes: selectedAccessTypes,
  });

  if (error) {
    throw new Error(`Error al cargar los libros: ${error.message}`);
  }

  if (!books || books.length === 0) {
    return (
      <p className="no-books-message">
        No hay libros disponibles con los filtros seleccionados.
      </p>
    );
  }

  return (
    <div className="books-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default async function BooksPage(props: {
  searchParams: Promise<{ categories?: string; access?: string }>;
}) {
  const searchParams = await props.searchParams;
  // Obtener categorías seleccionadas de los parámetros de búsqueda
  const selectedCategories = searchParams.categories
    ? searchParams.categories.split(',')
    : [];

  // Obtener tipos de acceso seleccionados
  const selectedAccessTypes = searchParams.access
    ? searchParams.access.split(',')
    : [];

  // Determinar si hay algún filtro activo
  const hasActiveFilters =
    selectedCategories.length > 0 || selectedAccessTypes.length > 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Catálogo de Libros</h1>

        <Link href="/books/add">
          <button className="button">Agregar Libro</button>
        </Link>
      </div>

      <div className="page-content-with-sidebar">
        <aside className="page-sidebar">
          <Suspense fallback={<div>Cargando filtros...</div>}>
            <CategoryFilterWrapper />
          </Suspense>

          <div className="filter-divider"></div>

          <AccessFilter />

          {hasActiveFilters && (
            <div className="active-filters">
              <p className="active-filters-count">
                {selectedCategories.length > 0 && (
                  <span>
                    {selectedCategories.length}{' '}
                    {selectedCategories.length === 1
                      ? 'categoría'
                      : 'categorías'}
                  </span>
                )}
                {selectedCategories.length > 0 &&
                  selectedAccessTypes.length > 0 && <span> + </span>}
                {selectedAccessTypes.length > 0 && (
                  <span>
                    Acceso:{' '}
                    {selectedAccessTypes
                      .map((type) =>
                        type === 'free' ? 'Gratuito' : 'De pago'
                      )
                      .join(' y ')}
                  </span>
                )}
              </p>
            </div>
          )}
        </aside>

        <main className="page-main-content">
          <Suspense fallback={<Loading />}>
            <BooksList
              selectedCategories={selectedCategories}
              selectedAccessTypes={selectedAccessTypes}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
