'use client';

import './css/user.css';
import UserProfileClient from './components/UserProfileClient';
import { BookWithIdAndCategories } from '../books/types/book.type';
import { getAllCategories } from '../books/services/category.service';

// Mock data until we implement real data fetching
const MOCK_BOOKS: BookWithIdAndCategories[] = [];

// Server component
export default async function UserProfilePage() {
  const { data: categories } = await getAllCategories();

  return (
    <UserProfileClient
      books={MOCK_BOOKS}
      categories={categories || []}
    />
  );
}
