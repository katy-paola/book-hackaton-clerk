"use client";

import { useState, useEffect } from "react";
import { getCategories, type CategoryOption } from "../actions";
import CategoriesSelectOne from "./CategoriesSelectOne";

type FormStepOneProps = {
  formData: {
    title: string;
    description: string;
    category: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCategoryChange: (category: string) => void;
  onNext: () => void;
};

export default function FormStepOne({ 
  formData, 
  onInputChange, 
  onCategoryChange, 
  onNext 
}: FormStepOneProps) {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);
  
  // Get category name by ID for display
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Siguiente paso - Categoría actual:', formData.category);
    onNext();
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log('handleCategorySelect en FormStepOne:', categoryId);
    onCategoryChange(categoryId);
  };

  // Verificar el valor actual de la categoría
  useEffect(() => {
    console.log('Valor actual de la categoría en el estado:', formData.category);
  }, [formData.category]);

  return (
    <fieldset className="form-fieldset">
      <div className="form-field-container">
        <label className="form-field-base" htmlFor="title">
          Título
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            placeholder="Ej.: Hábitos atómicos"
            className="form-field-base-input"
            required
          />
        </label>
      </div>

      <div className="form-field-container form-field-container-categories">
        {isLoading ? (
          <div>Cargando categorías...</div>
        ) : (
          <>
            <div className="">
              <CategoriesSelectOne 
                options={categories} 
                onSelect={handleCategorySelect}
                selectedValue={formData.category}
              />
              {!formData.category && (
                <p className="text-select-category">Por favor selecciona una categoría</p>
              )}
            </div>
            <input
              type="hidden"
              name="category"
              value={formData.category || ''}
              required
            />
          </>
        )}
      </div>

      <div className="form-field-container">
        <label className="form-field-base" htmlFor="description">
          Descripción
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onInputChange}
            placeholder="Ej.: Este libro innovador nos revela exactamente cómo esos cambios minúsculos pueden crecer hasta llegar a cambiar nuestra carrera profesional, nuestras relaciones y todos los aspectos de nuestra vida."
            className="form-field-base-input"
            rows={3}
          />
        </label>
      </div>

      <button 
        type="button" 
        className="add-form-next-button w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        onClick={handleNext}
      >
        Siguiente
      </button>
    </fieldset>
  );
}
