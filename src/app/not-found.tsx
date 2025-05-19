import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <h2>¿Perdido entre libros?</h2>
      <p>
        No encontramos esa página. Puedes volver al inicio y seguir explorando.
      </p>
      <Link href="/">Ir al inicio</Link>
    </section>
  );
}
