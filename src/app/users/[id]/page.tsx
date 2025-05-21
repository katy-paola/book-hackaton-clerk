import "../css/user.css";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUserById } from "@/app/users/services/user.service";
import { getBooksByUser } from "@/app/books/services/book.service";
import { getCategories } from "@/app/books/actions";
import BookCard from "@/app/books/components/BookCard";
import Loading from "./loading";
import EditProfileClient from "./components/EditProfileClient";
import { auth } from "@clerk/nextjs/server";
import BookCollectionSectionClient from "@/app/books/components/BookCollectionSectionClient";

// Componente que carga los libros del usuario
async function UserBooks({ userId }: { userId: string }) {
  const { data: books, error } = await getBooksByUser(userId);

  if (error) {
    throw new Error(`Error al cargar los libros: ${error.message}`);
  }

  if (!books || books.length === 0) {
    return (
      <p className="no-books-message">
        Este usuario aún no ha publicado libros.
      </p>
    );
  }

  return (
    <div className="books-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

// Componente para mostrar la info del usuario
async function UserInfo({
  userId,
  isOwnProfile,
}: {
  userId: string;
  isOwnProfile: boolean;
}) {
  const { data: user, error } = await getUserById(userId);

  if (error || !user) {
    notFound();
  }

  return (
    <section className="profile-container">
      <header className="profile-header"></header>
      {isOwnProfile ? (
        <EditProfileClient user={user} />
      ) : (
        <div className="profile-user-info">
          <img
            className="profile-avatar"
            src={user.avatar}
            alt={`Avatar de ${user.name}`}
            width={40}
            height={40}
          />
          <h1 className="profile-user-name">{user.name}</h1>
        </div>
      )}
    </section>
  );
}

export default async function UserProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { userId } = await auth();
  const isOwnProfile = userId === params.id;
  const { data: books, error } = await getBooksByUser(params.id);
  const categories = await getCategories();

  const EMPTY_BOOKS_LIST = {
    message: "Empieza a construir tu lista personal de libros.",
    href: "/add-book-prueba",
    contentLink: "Agregar mi primer libro",
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <UserInfo userId={params.id} isOwnProfile={isOwnProfile} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <BookCollectionSectionClient
          titleSection="Mis libros"
          emptyBooksList={EMPTY_BOOKS_LIST}
          books={books ?? []}
          categories={categories}
        />
      </Suspense>
    </>
  );
}
