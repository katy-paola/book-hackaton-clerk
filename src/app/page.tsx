import BookCollectionSection from "./books/components/BookCollectionSection";
import styles from "./page.module.css";

const EMPTY_BOOKS_LIST = {
  message:
    "Aún no hay libros publicados, puedes empezar por crear tu lista personal.",
  href: "/add-book-prueba",
  contentLink: "Agregar mi primer libro",
};

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
      <BookCollectionSection
        titleSection="Libros publicados"
        emptyBooksList={EMPTY_BOOKS_LIST}
      />
    </section>
  );
}
