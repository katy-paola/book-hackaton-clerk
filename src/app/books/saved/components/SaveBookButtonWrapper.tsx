import { isBookSaved } from "../services/saved.service"
import SaveBookButton from "./SaveBookButton"

// Server component para verificar si un libro está guardado antes de renderizar el botón
export default async function SaveBookButtonWrapper({ bookId }: { bookId: string }) {
  // Verificar si el libro está guardado por el usuario actual
  const isSaved = await isBookSaved(bookId)
  
  // Renderizar botón de guardar con el estado inicial
  return <SaveBookButton bookId={bookId} initialSaved={isSaved} />
} 