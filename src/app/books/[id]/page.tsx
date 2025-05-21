import "../css/books.css";
import Delete from "@/components/icons/Delete";
import Edit from "@/components/icons/Edit";
import Save from "@/components/icons/Save";
import Link from "next/link";
import DeleteModal from "./components/DeleteModal";

export default function BookDetailsPage() {
  return (
    <main className="book-details-container">
      <header className="book-details-header">
        <h1 className="book-details-title">Hábitos atómicos</h1>
        <div className="book-details-info">
          <p className="book-details-author">James Clear</p>
          <small className="book-details-access-type">De pago</small>
        </div>
        <p className="book-details-category">
          Libro de <span>Autoayuda</span>
        </p>
      </header>
      <section className="book-details-content">
        <img
          className="book-details-cover"
          src="/portada-prueba.png"
          alt=""
          width={343}
          height={517}
        />
        <p className="book-details-description">
          Este libro innovador nos revela exactamente cómo esos cambios
          minúsculos pueden crecer hasta llegar a cambiar nuestra carrera
          profesional, nuestras relaciones y todos los aspectos de nuestra vida.
        </p>
        <div className="book-details-ctas-container">
          <Link className="book-details-main-cta" href="#">
            Ir al libro
          </Link>
          <Link className="book-details-edit" href="#">
            <Edit />
          </Link>
          <button className="book-details-delete">
            <Delete />
          </button>
          <button className="book-details-save">
            <Save />
          </button>
        </div>
        <p className="book-details-user">
          Publicado por{" "}
          <a className="book-details-user-link" href="#">
            Andrés Vizcaíno
          </a>
        </p>
      </section>
      <DeleteModal />
    </main>
  );
}
