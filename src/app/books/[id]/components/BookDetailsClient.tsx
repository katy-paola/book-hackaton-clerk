"use client";

import Link from "next/link";
import Edit from "@/components/icons/Edit";
import Delete from "@/components/icons/Delete";
import Save from "@/components/icons/Save";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { BookWithIdAndCategories } from "../../types/book.type";
import { useAuth } from "@clerk/nextjs";

export default function BookDetailsClient({
  book,
}: {
  book: BookWithIdAndCategories | null;
}) {
  const { userId, isSignedIn } = useAuth();
  const isOwn = userId === book?.user_id;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <main className="book-details-container">
      <header className="book-details-header">
        <h1 className="book-details-title">{book?.title}</h1>
        <div className="book-details-info">
          <p className="book-details-author">{book?.author}</p>
          <small className="book-details-access-type">
            {book?.access === "free" ? "Gratis" : "De pago"}
          </small>
        </div>
        <p className="book-details-category">
          Libro de <span>{book?.book_categories[0].categories.name}</span>
        </p>
      </header>
      <section className="book-details-content">
        <img
          className="book-details-cover"
          src={book?.cover_url}
          alt=""
          width={343}
          height={517}
        />
        <p className="book-details-description">{book?.description}</p>
        <div className="book-details-ctas-container">
          <Link className="book-details-main-cta" href={book?.link ?? "#"}>
            Ir al libro
          </Link>

          {!isSignedIn || !isOwn ? (
            <button className="book-details-save">
              <Save />
            </button>
          ) : (
            <>
              <Link
                className="book-details-edit"
                href={`/books/${book?.id}/edit`}
              >
                <Edit />
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
                className="book-details-delete"
              >
                <Delete />
              </button>
            </>
          )}
        </div>
        <p className="book-details-user">
          Publicado por{" "}
          <a
            className="book-details-user-link"
            href={`/users/${book?.user_id}`}
          >
            {book?.users?.name}
          </a>
        </p>
      </section>
      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </main>
  );
}
