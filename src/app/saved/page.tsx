import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Loading from "./loading";
import EmptyBooksList from "../books/components/EmptyBooksList";
import BookCardItem from "../books/components/BookCardItem";
import { getCategories } from "../books/actions";
import BookCollectionSectionClient from "../books/components/BookCollectionSectionClient";
import { getAllBooks } from "../books/services/book.service";

const EMPTY_BOOKS_LIST = {
  message: "No tienes libros guardados aún.",
  href: "/",
  contentLink: "Empezar a explorar",
};

const { message, href, contentLink } = EMPTY_BOOKS_LIST;

// Componente que muestra la lista de libros guardados
async function SavedBooksList(props: {
  searchParams?: Promise<{
    query?: string;
    categories?: string;
    access?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const categories = searchParams?.categories?.split(",");
  const access = searchParams?.access?.split(",");

  const allCategories = await getCategories();

  const { data: books, error } = await getAllBooks({
    categories: categories,
    query: query,
    accessTypes: access,
  });
  if (error) {
    throw new Error(`Error al cargar libros guardados: ${error.message}`);
  }

  if (!books || books.length === 0) {
    return (
      <EmptyBooksList message={message} href={href} contentLink={contentLink} />
    );
  }

  return (
    <>
      <BookCollectionSectionClient
        titleSection="Libros guardados"
        emptyBooksList={EMPTY_BOOKS_LIST}
        books={books}
        searchQuery={query}
        categories={allCategories}
      />
    </>
  );
}

export default async function SavedBooksPage() {
  // Verificar si el usuario está autenticado
  const { userId } = await auth();
  if (!userId) {
    redirect("/books");
  }

  return (
    <div className="page-container">
      <section className="saved-container">
        <Suspense fallback={<Loading />}>
          <SavedBooksList />
        </Suspense>
      </section>
    </div>
  );
}
