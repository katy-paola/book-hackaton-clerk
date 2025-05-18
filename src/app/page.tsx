import Link from 'next/link'
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Biblioteca de Libros</h1>
      <p>Aplicación para compartir y descubrir libros</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link href="/books">
          <button>Ver catálogo de libros</button>
        </Link>
      </div>
    </div>
  );
}
