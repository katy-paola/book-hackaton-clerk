import SecondaryHeader from "@/app/books/components/SecondaryHeader";
import EmptyBooksList from "@/app/books/components/EmptyBooksList";
import SearchArea from "@/app/books/components/SearchArea";
import { BOOKS } from "@/app/books/data-prueba/books-info";
import BookCardItem from "./BookCardItem";

interface BookCollectionProps {
  titleSection: string;
  emptyBooksList: {
    message: string;
    href?: string;
    contentLink?: string;
  };
  noHasAddLink?: boolean
}

export default function BookCollectionSection({
  titleSection,
  emptyBooksList,
  noHasAddLink,
}: BookCollectionProps) {

  const {message, href, contentLink} = emptyBooksList

  return (
    <main>
      <SecondaryHeader title={titleSection} noHasAddLink={noHasAddLink} />
      <section>
        <EmptyBooksList
          message={message}
          href={href}
          contentLink={contentLink}
        />
        <SearchArea />
      </section>
      <p>Se encontraron 5 resultados para “Patrones de lectura”.</p>
      <p>
        No se encontraron resultados para “Patrones de lectura”. Intenta con
        otra palabra clave.
      </p>
      <p>
        No se encontraron resultados que coincidan con los filtros aplicados.
      </p>
      <div role="complementary" aria-label="Controles de filtros">
        <button type="button">Limpiar filtros</button>
      </div>
      <ul>
        {BOOKS.map((book) => (
          <li key={book.id}>
            <BookCardItem
              id={book.id}
              user_id={book.user_id}
              title={book.title}
              category={book.category}
              author={book.author}
              accessType={book.accessType}
              bookLink={book.bookLink}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
