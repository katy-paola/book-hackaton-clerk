import { Tables } from '@/types/database.types';

export type BookRow = Tables<'books'>;

export type BookWithId = BookRow & { user_id: string | null };
export type BookWithIdAndCategories = BookWithId & {
  users: { name: string; avatar: string } | null;
  book_categories: { categories: { id: string; name: string } }[];
};

export type BookResponse = {
  data: BookWithIdAndCategories[] | null;
  error: Error | null;
};

export type SingleBookResponse = {
  data: BookWithIdAndCategories | null;
  error: Error | null;
};
