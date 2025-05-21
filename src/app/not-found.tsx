import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">¿Perdido entre libros?</h2>
      <p className="not-found-description">
        No encontramos esa página. Puedes volver al inicio y seguir explorando.
      </p>
      <Link className="not-found-link" href="/">
        Ir al inicio
      </Link>
    </section>
  );
}
