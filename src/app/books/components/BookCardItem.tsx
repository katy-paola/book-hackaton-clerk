import Link from "next/link";
import More from "@/components/icons/More";

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
  title,
  category,
  author,
  accessType,
  bookLink,
}: BookProps) {
  return (
    <a href="#" className="books-container-link">
      <article className="books-item">
        <header className="books-item-header">
          <span className="book-category">{category}</span>
          <h3 className="book-title">{title}</h3>
          <div className="book-info">
            <p className="book-author">{author}</p>
            <small className="book-access-type">{accessType}</small>
          </div>
        </header>
        <div className="book-ctas-container">
          <Link href={bookLink} className="book-main-cta">
            Ir al libro
          </Link>
          <div>
            <button className="more-icon-container" aria-label="Más acciones">
              <More />
            </button>
            <ul className="book-more-menu" role="menu">
              <li role="menuitem">
                <Link className="book-more-menu-item" href={`/books/${book_id}`}>Ver detalles</Link>
              </li>
              <li role="menuitem">
                {/* Si el libro ya está guardado, se muestra "Quitar libro". */}
                <button className="book-more-menu-item">Guardar libro</button>
              </li>
              <li role="menuitem">
                <Link className="book-more-menu-item" href="#">Editar</Link>
              </li>
              <li role="menuitem">
                <button className="book-more-menu-item">Eliminar</button>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </a>
  );
}
