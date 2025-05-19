import Delete from "@/components/icons/Delete";
import Edit from "@/components/icons/Edit";
import Save from "@/components/icons/Save";
import Image from "next/image";
import Link from "next/link";

export default function BookDetailsPage() {
  return (
    <main>
      <header>
        <h1>
          Hábitos atómicos - <span>Autoayuda</span>
          <div>
            <p>James Clear</p>
            <small>De pago</small>
          </div>
        </h1>
      </header>
      <section>
        <Image src="/portada-prueba.png" alt="" width={343} height={517} />
        <p>
          Este libro innovador nos revela exactamente cómo esos cambios
          minúsculos pueden crecer hasta llegar a cambiar nuestra carrera
          profesional, nuestras relaciones y todos los aspectos de nuestra vida.
        </p>
        <div>
          <Link href="#">Ir al libro</Link>
          <Link href="#">
            <Edit />
          </Link>
          <button>
            <Delete />
          </button>
          <button>
            <Save />
          </button>
        </div>
        <p>
          Publicado por <a href="#">Andrés Vizcaíno</a>
        </p>
      </section>
    </main>
  );
}
