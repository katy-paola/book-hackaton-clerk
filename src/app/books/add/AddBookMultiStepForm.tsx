'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent, ChangeEvent } from 'react';
import FormStepOne from '../components/FormStepOne';
import FormStepTwo from '../components/FormStepTwo';
import { addBook } from '../actions/add-book.action';


type BookFormData = {
  title: string;
  description: string;
  author: string;
  cover_image: File | null;
  category: string;
  access: 'free' | 'paid';
  link: string;
};

export function AddBookMultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    description: '',
    author: '',
    cover_image: null,
    category: '',
    access: 'free',
    link: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambio de categoría
  const handleCategoryChange = (category: string) => {
    console.log('handleCategoryChange - Nueva categoría:', category);
    // Asegurarse de que la categoría no sea undefined o null
    if (category) {
      setFormData(prev => {
        console.log('Actualizando estado con categoría:', category);
        return {
          ...prev,
          category: category.trim() // Asegurar que no haya espacios en blanco
        };
      });
      // Limpiar cualquier error de categoría
      if (error === 'Selecciona una categoría') {
        setError(null);
      }
    } else {
      console.log('Intento de establecer categoría vacía');
    }
  };

  // Manejar cambio de tipo de acceso
  const handleAccessTypeChange = (access: 'free' | 'paid') => {
    setFormData(prev => ({
      ...prev,
      access
    }));
  };

  // Manejar cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setError('El archivo debe ser una imagen');
        return;
      }
      
      // Validar tamaño (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('La imagen no debe superar los 2MB');
        return;
      }
      
      // Crear previsualización
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Actualizar estado
      setFormData(prev => ({
        ...prev,
        cover_image: file
      }));
      
      // Limpiar error si existe
      if (error) setError(null);
    }
  };

  // Validar paso 1
  const validateStepOne = () => {
    console.log('Validando categoría:', formData.category);
    if (!formData.title.trim()) {
      setError('El título es requerido');
      return false;
    }
    if (!formData.category) {
      console.log('No se ha seleccionado ninguna categoría');
      setError('Selecciona una categoría');
      return false;
    }
    return true;
  };

  // Validar paso 2
  const validateStepTwo = () => {
    if (!formData.author.trim()) {
      setError('El autor es requerido');
      return false;
    }
    if (!formData.cover_image) {
      setError('La imagen de portada es requerida');
      return false;
    }
    return true;
  };

  // Siguiente paso
  const nextStep = () => {
    if (step === 1 && !validateStepOne()) return;
    setStep(step + 1);
    setError(null);
  };

  // Paso anterior
  const prevStep = () => {
    setStep(step - 1);
    setError(null);
  };

  // Función para enviar el formulario
  const submitForm = async () => {
    if (!validateStepTwo()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('author', formData.author);
      if (formData.cover_image) {
        formDataToSend.append('cover_image', formData.cover_image);
      }
      formDataToSend.append('category', formData.category);
      formDataToSend.append('access', formData.access);
      if (formData.link) {
        formDataToSend.append('link', formData.link);
      }
      
      const result = await addBook(formDataToSend);
      
      if ('error' in result) {
        setError(result.error);
      } else {
        router.push('/books');
        router.refresh();
      }
    } catch (err) {
      setError('Error al procesar el formulario');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejador para el envío del formulario
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  // Manejador para el botón de envío
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form className="add-form" onSubmit={handleFormSubmit}>
      {error && (
        <div className="message error">
          {error}
        </div>
      )}
      
      {step === 1 ? (
        <FormStepOne 
          formData={formData}
          onInputChange={handleInputChange}
          onCategoryChange={handleCategoryChange}
          onNext={nextStep}
        />
      ) : (
        <FormStepTwo 
          formData={{
            author: formData.author,
            access: formData.access,
            link: formData.link
          }}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onAccessTypeChange={handleAccessTypeChange}
          onPrev={prevStep}
          onSubmit={handleSubmit}
          imagePreview={imagePreview}
          isSubmitting={isSubmitting}
        />
      )}
    </form>
  );
}
