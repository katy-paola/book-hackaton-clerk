'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toggleSaveBook } from '../actions/toggle-save.action'

export default function SaveBookButton({ 
  bookId, 
  initialSaved 
}: { 
  bookId: string; 
  initialSaved: boolean 
}) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(initialSaved)
  const [isPending, setIsPending] = useState(false)

  async function handleToggleSave() {
    setIsPending(true)
    
    // Optimistic update
    setIsSaved(!isSaved)
    
    try {
      const result = await toggleSaveBook(bookId)
      
      if ('error' in result) {
        // Revert optimistic update on error
        setIsSaved(isSaved)
        console.error(result.error)
      }
      
      // Force a revalidation of the current page 
      router.refresh()
    } catch (error) {
      // Revert optimistic update on error
      setIsSaved(isSaved)
      console.error('Error al guardar libro:', error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      onClick={handleToggleSave}
      disabled={isPending}
      className={`save-button ${isSaved ? 'saved' : ''}`}
      aria-label={isSaved ? 'Eliminar de guardados' : 'Guardar libro'}
      title={isSaved ? 'Eliminar de guardados' : 'Guardar libro'}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill={isSaved ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2"
        className="save-icon"
      >
        <path 
          d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
        />
      </svg>
      <span className="save-label">
        {isSaved ? 'Guardado' : 'Guardar'}
      </span>
    </button>
  )
} 