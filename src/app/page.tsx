import BookCollectionSection from "./books/components/BookCollectionSection";
import "./home.css";

const EMPTY_BOOKS_LIST = {
  message:
    "Aún no hay libros publicados, puedes empezar por crear tu lista personal.",
  href: "/add-book-prueba",
  contentLink: "Agregar mi primer libro",
};

export default function Home() {
  return (
    <section>
      <section className="about">
        <h1 className="main-title">BooK - No pierdas tus libros por leer</h1>
        <p className="main-description">
          Crea tu colección personal, explora listas públicas y mantén a mano
          todo lo que quieres leer.
        </p>
      </section>
      <BookCollectionSection
        titleSection="Publicado por otros"
        emptyBooksList={EMPTY_BOOKS_LIST}
      />
    </section>
  );
}
