"use client";

import "./css/user.css";
import BookCollectionSection from "../books/components/BookCollectionSection";
import EditProfileClient from "./components/EditProfileClient";

const CURRENT_USER = {
  avatar: "./consts/avatars/hombre-gafas-cabello-ondulado.png",
  email: "pipe.jaider@gmail.com",
  id: "user_2xFFhuwrZm12KcvvCYiHj358F4F",
  name: "Andrés Vizcaíno",
};

export default function UserProfilePage() {
  const EMPTY_BOOKS_LIST = {
    message: "Empieza a construir tu lista personal de libros.",
    href: "/add-book-prueba",
    contentLink: "Agregar mi primer libro",
  };

  return (
    <section className="profile-container">
      <header className="profile-header">
        <EditProfileClient user={CURRENT_USER} />
      </header>
      <BookCollectionSection
        titleSection="Mis libros"
        emptyBooksList={EMPTY_BOOKS_LIST}
      />
    </section>
  );
}
