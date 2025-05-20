import BookCollectionSection from "@/app/books/components/BookCollectionSection";

const EMPTY_BOOKS_LIST = {
  message: "No tienes libros guardados aún.",
  href: "/",
  contentLink: "Empezar a explorar",
};

export default function SavedPage() {
  return (
    <BookCollectionSection
      titleSection="Libros guardados"
      emptyBooksList={EMPTY_BOOKS_LIST}
      noHasAddLink
    />
  );
}
