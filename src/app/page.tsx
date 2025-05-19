import styles from "./page.module.css";
import SecondaryHeader from "@/app/books/components/SecondaryHeader";
import EmptyBooksList from "@/app/books/components/EmptyBooksList";
import SearchArea from "@/app/books/components/SearchArea";
import { BOOKS } from "@/app/books/data-prueba/books-info";
import BookCardItem from "./books/components/BookCardItem";

export default function Home() {
  return (
    <section className={styles.page}>
      <h1>
        Nunca pierdas un libro. Guarda y organiza tus lecturas fácilmente.
      </h1>
      <p>
        Crea tu colección personal, explora listas públicas y mantén a mano todo
        lo que quieres leer.
      </p>
      <main>
        <SecondaryHeader title="Publicado por otros" />
        <section>
          <EmptyBooksList
            message="Aún no hay libros publicados, puedes empezar por crear tu lista personal."
            href="/add-book-prueba"
            contentLink="Agregar mi primer libro"
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
    </section>
  );
}
