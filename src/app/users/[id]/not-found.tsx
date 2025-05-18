import Link from 'next/link'

export default function UserNotFound() {
  return (
    <div className="error-container">
      <h2>Usuario no encontrado</h2>
      <p>El usuario que estás buscando no existe o ha sido eliminado.</p>
      <Link href="/books" className="button">
        Volver al catálogo de libros
      </Link>
    </div>
  )
} 