import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getBookById } from "@/app/books/services/book.service";
import FormStepOne from "../../components/FormStepOne";
import FormStepTwo from "../../components/FormStepTwo";
import EditBookForm from "./EditBookForm";

export default async function EditBookPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const bookId = params.id;

  // Verificar si el usuario está autenticado
  const { userId } = await auth();
  if (!userId) {
    redirect("/books");
  }

  // Obtener el libro
  const { data: book, error } = await getBookById(bookId);

  // Verificar si el libro existe y pertenece al usuario
  if (error || !book) {
    redirect("/books");
  }

  if (book.user_id !== userId) {
    // Si el libro no pertenece al usuario, redireccionar
    redirect("/books");
  }

  return (
    <main className="edit-book-page">
      <header className="edit-book-header">
        <h1 className="edit-book-title">Editar libro</h1>
      </header>

      <EditBookForm book={book} />
    </main>
  );
}
