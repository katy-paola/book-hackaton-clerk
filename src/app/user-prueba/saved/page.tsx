import "../css/user.css";
import BookCollectionSectionClient from "@/app/books/components/BookCollectionSectionClient";
import { getCategories } from "@/app/books/actions";
//import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const EMPTY_BOOKS_LIST = {
  message: "No tienes libros guardados aún.",
  href: "/",
  contentLink: "Empezar a explorar",
};

export default async function SavedPage(props: {
  searchParams?: Promise<{
    query?: string;
    categories?: string;
    access?: string;
  }>;
}) {
  //const { user, isSignedIn } = useUser();

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const categories = searchParams?.categories?.split(",");
  const access = searchParams?.access?.split(",");

  const allCategories = await getCategories();

  let savedBooks = null;

  return (
    <section className="saved-container">
      <BookCollectionSectionClient
        titleSection="Libros guardados"
        emptyBooksList={EMPTY_BOOKS_LIST}
        books={savedBooks || []}
        searchQuery={query}
        categories={allCategories}
      />
    </section>
  );
}
