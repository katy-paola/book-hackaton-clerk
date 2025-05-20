import "../css/user.css";
import BookCollectionSection from "@/app/books/components/BookCollectionSection";

const EMPTY_BOOKS_LIST = {
  message: "No tienes libros guardados aún.",
  href: "/",
  contentLink: "Empezar a explorar",
};

export default function SavedPage() {
  return (
    <section className="saved-container">
      <BookCollectionSection
        titleSection="Libros guardados"
        emptyBooksList={EMPTY_BOOKS_LIST}
        noHasAddLink
      />
    </section>
  );
}
