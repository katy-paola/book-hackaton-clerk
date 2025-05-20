import "./css/user.css";
import Image from "next/image";
import Edit from "@/components/icons/Edit";
import Close from "@/components/icons/Close";
import { AVATARS } from "./consts/avatars";
import BookCollectionSection from "../books/components/BookCollectionSection";

export const EMPTY_BOOKS_LIST = {
  message: "Empieza a construir tu lista personal de libros.",
  href: "/add-book-prueba",
  contentLink: "Agregar mi primer libro",
};

export default function UserProfilePage() {
  return (
    <section className="profile-container">
      <header>
        <Image
          src="/avatars/hombre-gafas-cabello-ondulado.png"
          alt="Foto de Andrés Vizcaíno"
          width={40}
          height={40}
        />
        <h1>Andrés Vizcaíno</h1>
        <button>
          <Edit />
        </button>
      </header>
      <ModalEditProfile />
      <BookCollectionSection
        titleSection="Mis libros"
        emptyBooksList={EMPTY_BOOKS_LIST}
      />
    </section>
  );
}

function ModalEditProfile() {
  return (
    <form action="">
      <button type="button">
        <Close />
        Cerrar
      </button>
      <fieldset>
        <legend>Editar perfil</legend>
        <fieldset>
          <legend>Avatar</legend>
          {AVATARS.map((avatar) => (
            <label key={avatar.id} htmlFor="">
              <Image src={avatar.src} alt={avatar.alt} width={60} height={60} />
              <input type="radio" name="avatar" />
            </label>
          ))}
        </fieldset>
        <label htmlFor="name">
          Cambiar nombre
          <input type="text" placeholder="Andrés Vizcaíno" name="name" />
        </label>
        <button>Guardar cambios</button>
      </fieldset>
    </form>
  );
}
