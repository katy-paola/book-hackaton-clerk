import "../css/books.css";

import { getBookById } from "../services/book.service";
import { Suspense } from "react";
import Loading from "@/app/loading";
import BookDetailsClient from "./components/BookDetailsClient";

export default async function BookDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { data: book } = await getBookById(params.id);
  book?.access;
  book?.author;
  book?.book_categories;
  book?.cover_url;
  book?.description;
  book?.id;
  book?.link;
  book?.users?.name;
  return (
    <Suspense fallback={<Loading />}>
      <BookDetailsClient book={book} />
    </Suspense>
  );
}
