'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { addBook } from '../actions/add-book.action'
import CategorySelectorWrapper from '../components/CategorySelectorWrapper'
import { useFormStatus } from 'react-dom'

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
      {pending ? 'Creando...' : 'Crear Libro'}
    </button>
  )
}

// Estado inicial con tipo apropiado para el formulario
type FormState = {
  error: string | null;
  success: boolean;
  data: unknown | null;
};

export default function AddBookForm() {
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  // Estado del formulario
  const [formState, setFormState] = useState<FormState>({
    error: null, 
    success: false, 
    data: null
  });

  // Efecto para redireccionar después de un envío exitoso
  useEffect(() => {
    if (formState.success) {
      router.push('/books');
      router.refresh();
    }
  }, [formState.success, router]);

  // Manejador para previsualizar la imagen seleccionada
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        setFormState({
          error: 'El archivo seleccionado debe ser una imagen',
          success: false,
          data: null
        });
        e.target.value = '';
        setImagePreview(null);
        return;
      }
      
      // Validar el tamaño (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormState({
          error: 'La imagen no debe superar los 2MB',
          success: false,
          data: null
        });
        e.target.value = '';
        setImagePreview(null);
        return;
      }
      
      // Crear URL para previsualización
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Limpiar error si existe
      if (formState.error) {
        setFormState({
          error: null,
          success: false,
          data: null
        });
      }
    } else {
      setImagePreview(null);
    }
  };

  // Función para manejar la acción del formulario con categorías
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Obtener el formulario y crear FormData
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Agregar las categorías seleccionadas al FormData
    selectedCategories.forEach(categoryId => {
      formData.append('categories', categoryId);
    });
    
    // Llamar a la acción del servidor
    try {
      const result = await addBook(formData);
      
      if ('error' in result) {
        setFormState({ error: result.error, success: false, data: null });
      } else {
        setFormState({ error: null, success: true, data: result.data });
      }
    } catch {
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
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            className="form-input"
            rows={4}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="cover_image">Imagen de Portada</label>
          <input
            type="file"
            id="cover_image"
            name="cover_image"
            className="form-input"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <div className="image-preview">
              <img 
                src={imagePreview} 
                alt="Vista previa" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px', 
                  marginTop: '10px',
                  borderRadius: '4px'
                }} 
              />
            </div>
          )}
          <p className="input-help">Formato recomendado: JPG o PNG. Máximo 2MB.</p>
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
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="access">Tipo de Acceso</label>
          <select
            id="access"
            name="access"
            className="form-input"
            defaultValue="free"
          >
            <option value="free">Gratuito</option>
            <option value="paid">De pago</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Categorías</label>
          <CategorySelectorWrapper onChange={setSelectedCategories} />
        </div>

        <SubmitButton />
      </form>
    </div>
  )
} 