'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { deleteBook } from '../actions'

type BookActionProps = {
  bookId: string;
  userId: string | null;
}

export default function BookCardActions({ bookId, userId }: BookActionProps) {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Si aún no se ha cargado el usuario o no hay usuario actual, no mostrar nada
  if (!isLoaded || !user) {
    return null;
  }
  
  // Si el libro no pertenece al usuario actual, no mostrar acciones
  if (user.id !== userId) {
    return null;
  }
  
  const handleDelete = async () => {
    // Confirmar la eliminación
    if (!confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      return;
    }
    
    setIsDeleting(true);
    setError(null);
    
    try {
      const result = await deleteBook(bookId);
      
      if ('error' in result) {
        setError(result.error);
      } else {
        // Recargar la página para mostrar los cambios
        router.refresh();
      }
    } catch (error) {
      setError('Error al eliminar el libro');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="owner-actions">
      <Link 
        href={`/books/${bookId}/edit`} 
        className="edit-button"
        title="Editar libro"
      >
        ✏️
      </Link>
      
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="delete-button"
        title="Eliminar libro"
      >
        🗑️
      </button>
      
      {error && <div className="action-error">{error}</div>}
    </div>
  );
} 