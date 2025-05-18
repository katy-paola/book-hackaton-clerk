'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { editBook } from '@/app/books/actions'
import CategorySelectorWrapper from '@/app/books/components/CategorySelectorWrapper'
import { useFormStatus } from 'react-dom'
import { Tables } from '@/types/database.types'

type BookRow = Tables<'books'>

type EditBookFormProps = {
  book: BookRow & {
    book_categories?: {
      categories: {
        id: string;
        name: string;
      }
    }[];
  }
}

// Componente para el botón de envío con estado de carga
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit" 
      className="button" 
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? 'Guardando...' : 'Guardar Cambios'}
    </button>
  )
}

// Estado inicial con tipo apropiado para el formulario
type FormState = {
  error: string | null;
  success: boolean;
  data: unknown | null;
};

export default function EditBookForm({ book }: EditBookFormProps) {
  const router = useRouter()
  
  // Extraer los IDs de categorías del libro
  const initialCategories = book.book_categories 
    ? book.book_categories.map(bc => bc.categories.id) 
    : []
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories)
  
  // Estado del formulario
  const [formState, setFormState] = useState<FormState>({
    error: null, 
    success: false, 
    data: null
  });

  // Efecto para redireccionar después de un envío exitoso
  useEffect(() => {
    if (formState.success) {
      router.push('/books')
      router.refresh()
    }
  }, [formState.success, router]);

  // Función para manejar la acción del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Obtener el formulario y crear FormData
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Agregar las categorías seleccionadas al FormData
    selectedCategories.forEach(categoryId => {
      formData.append('categories', categoryId);
    });
    
    // Logs para depuración
    console.log('Book ID:', book.id);
    console.log('Form data entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log('Selected categories:', selectedCategories);
    
    // Llamar a la acción del servidor
    try {
      const result = await editBook(book.id, formData);
      
      console.log('Edit result:', result);
      
      if ('error' in result) {
        setFormState({ error: result.error, success: false, data: null });
        console.error('Error from server:', result.error);
      } else {
        setFormState({ error: null, success: true, data: result.data });
      }
    } catch (error) {
      console.error('Exception caught:', error);
      setFormState({ 
        error: 'Error al procesar el formulario', 
        success: false, 
        data: null 
      });
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        {formState.error && (
          <div className="message error">{formState.error}</div>
        )}
        
        <div className="form-group">
          <label className="form-label" htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            required
            defaultValue={book.title}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            name="author"
            className="form-input"
            required
            defaultValue={book.author}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            className="form-input"
            rows={4}
            defaultValue={book.description || ''}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="cover_url">URL de Portada</label>
          <input
            type="url"
            id="cover_url"
            name="cover_url"
            className="form-input"
            placeholder="https://ejemplo.com/imagen.jpg"
            required
            defaultValue={book.cover_url}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="link">Enlace del Libro</label>
          <input
            type="url"
            id="link"
            name="link"
            className="form-input"
            required
            placeholder="https://ejemplo.com/libro"
            defaultValue={book.link}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="access">Tipo de Acceso</label>
          <select
            id="access"
            name="access"
            className="form-input"
            defaultValue={book.access}
          >
            <option value="free">Gratuito</option>
            <option value="paid">De pago</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Categorías</label>
          <CategorySelectorWrapper 
            onChange={setSelectedCategories}
            selectedIds={selectedCategories}
          />
        </div>

        <div className="form-actions">
          <SubmitButton />
          <button 
            type="button" 
            className="button button-secondary"
            onClick={() => router.back()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
} 