import Link from "next/link";
import More from "@/components/icons/More";
import BookHeader from "./BookHeader";

interface BookProps {
  id: string;
  user_id: string;
  title: string;
  category: string;
  author: string;
  accessType: string;
  bookLink: string;
}

export default function BookCardItem({
  id,
  title,
  category,
  author,
  accessType,
  bookLink,
}: BookProps) {
  return (
    <article>
      <BookHeader
        title={title}
        category={category}
        author={author}
        accessType={accessType}
      />
      <div>
        <Link href={bookLink}>Ir al libro</Link>
        <div>
          <button
            id="menu-actions-button-1"
            aria-label="Más acciones"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="menu1"
          >
            <More />
          </button>
          <ul role="menu" aria-labelledby="menu-actions-button-1" id="menu-1">
            <li role="menuitem">
              <Link href={`/books/${id}`}>Ver detalles</Link>
            </li>
            <li role="menuitem">
              {/* Si el libro ya está guardado, se muestra "Quitar libro". */}
              <button>Guardar libro</button>
            </li>
            <li role="menuitem">
              <Link href="#">Editar</Link>
            </li>
            <li role="menuitem">
              <button>Eliminar</button>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
