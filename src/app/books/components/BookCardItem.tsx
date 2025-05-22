"use client";

import Link from "next/link";
import More from "@/components/icons/More";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import DeleteModal from "../[id]/components/DeleteModal";

interface BookProps {
  book_id: string;
  user_id: string;
  title: string;
  category: string;
  author: string;
  accessType: string;
  bookLink: string;
}

export default function BookCardItem({
  book_id,
  user_id,
  title,
  category,
  author,
  accessType,
  bookLink,
}: BookProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { signOut } = useClerk();
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const isBookOwner = isSignedIn && user.id === user_id;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const saveBook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isSignedIn) {
      redirect("/auth");
    } else {
      return;
    }
  };

  const goBookDetails = () => {
    redirect(`/books/${book_id}`);
  };
  return (
    <article className="books-item" onClick={goBookDetails}>
      <header className="books-item-header">
        <span className="book-category">{category}</span>
        <h3 className="book-title">{title}</h3>
        <div className="book-info">
          <p className="book-author">{author}</p>
          <small className="book-access-type">{accessType === "free" ? "Gratis" : "De pago"}</small>
        </div>
      </header>
      <div className="book-ctas-container">
        <Link
          href={bookLink}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="book-main-cta"
        >
          Ir al libro
        </Link>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            className="more-icon-container"
            aria-label="Más acciones"
          >
            <More />
          </button>
          {isMenuOpen && (
            <ul className="book-more-menu" role="menu">
              <li role="menuitem">
                <Link
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="book-more-menu-item"
                  href={`/books/${book_id}`}
                >
                  Ver detalles
                </Link>
              </li>
              {isBookOwner ? (
                <>
                  <li role="menuitem">
                    <Link
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="book-more-menu-item"
                      href={`/books/${book_id}/edit`}
                    >
                      Editar
                    </Link>
                  </li>
                  <li role="menuitem">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteModal(true);
                      }}
                      className="book-more-menu-item"
                    >
                      Eliminar
                    </button>
                  </li>
                </>
              ) : (
                <li role="menuitem">
                  {/* Si el libro ya está guardado, se muestra "Quitar libro". */}
                  <button onClick={saveBook} className="book-more-menu-item">
                    Guardar libro
                  </button>
                </li>
              )}
            </ul>
          )}
          {showDeleteModal && (
            <DeleteModal
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
        </div>
      </div>
    </article>
  );
}
