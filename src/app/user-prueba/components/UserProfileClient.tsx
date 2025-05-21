'use client';

import '../css/user.css';
import BookCollectionSectionClient from '../../books/components/BookCollectionSectionClient';
import EditProfileClient from './EditProfileClient';
import { BookWithIdAndCategories } from '../../books/types/book.type';
import { CategoryRow } from '../../books/services/category.service';

const CURRENT_USER = {
  avatar: '../consts/avatars/hombre-gafas-cabello-ondulado.png',
  email: 'pipe.jaider@gmail.com',
  id: 'user_2xFFhuwrZm12KcvvCYiHj358F4F',
  name: 'Andrés Vizcaíno',
};

interface UserProfileClientProps {
  books: BookWithIdAndCategories[];
  categories?: CategoryRow[];
}

export default function UserProfileClient({
  books,
  categories = [],
}: UserProfileClientProps) {
  const EMPTY_BOOKS_LIST = {
    message: 'Empieza a construir tu lista personal de libros.',
    href: '/add-book-prueba',
    contentLink: 'Agregar mi primer libro',
  };

  return (
    <section className="profile-container">
      <header className="profile-header">
        <EditProfileClient user={CURRENT_USER} />
      </header>
      <BookCollectionSectionClient
        titleSection="Mis libros"
        emptyBooksList={EMPTY_BOOKS_LIST}
        books={books}
        categories={categories}
      />
    </section>
  );
}
