'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Opcionalmente registrar el error en un servicio
    console.error('Error en la página de books:', error)
  }, [error])

  return (
    <div className="error-container">
      <h2 className="error-title">Algo salió mal</h2>
      <p className="error-message">
        {error.message || 'Ocurrió un error al cargar los libros'}
      </p>
      <button
        onClick={reset}
        className="button"
      >
        Intentar de nuevo
      </button>
    </div>
  )
} 