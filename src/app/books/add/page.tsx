'use client'

import { useState, useRef, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { addBook } from '../actions'
import Link from 'next/link'

// Componente de botón de envío con estado de carga integrado
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`button ${pending ? 'disabled' : ''}`}
    >
      {pending ? 'Agregando...' : 'Agregar Libro'}
    </button>
  )
}

export default function AddBookPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Esta función limpia el mensaje después de 5 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [message])

  async function handleSubmit(formData: FormData) {
    setMessage(null)
    const result = await addBook(formData)
    
    if ('error' in result) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ type: 'success', text: 'Libro agregado con éxito' })
      // Limpiar formulario usando la referencia en lugar de querySelector
      formRef.current?.reset()
    }
  }
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Agregar Nuevo Libro</h1>
        <Link href="/books" className="back-button">
          ← Volver al catálogo
        </Link>
      </div>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form ref={formRef} action={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Título:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Autor:
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Categoría:
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="form-input"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="cover_url" className="form-label">
            URL de la Portada:
          </label>
          <input
            id="cover_url"
            name="cover_url"
            type="url"
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="link" className="form-label">
            Enlace del Libro:
          </label>
          <input
            id="link"
            name="link"
            type="url"
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="access" className="form-label">
            Tipo de Acceso:
          </label>
          <select 
            id="access" 
            name="access" 
            required
            className="form-input"
          >
            <option value="">Selecciona una opción</option>
            <option value="free">Gratuito</option>
            <option value="paid">De pago</option>
          </select>
        </div>
        
        <SubmitButton />
      </form>
    </div>
  )
} 