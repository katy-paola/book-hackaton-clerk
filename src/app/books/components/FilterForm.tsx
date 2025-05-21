'use client';

import { useState, useEffect } from 'react';
import Close from '../../../components/icons/Close';
import Checkbox from './Checkbox';
import { ACCESS_TYPES } from '../consts/checkboxes-data';
import { CategoryRow } from '../services/category.service';
import {
  useSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation';

interface FilterFormProps {
  categories: CategoryRow[];
}

export default function FilterForm({ categories }: FilterFormProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Local state for tracking selected filters
  const [selectedCategories, setSelectedCategories] = useState<
    string[]
  >([]);
  const [selectedAccessTypes, setSelectedAccessTypes] = useState<
    string[]
  >([]);

  // State to control whether to show all categories or just the first 5
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Initialize state from URL params
  useEffect(() => {
    const categoriesParam = searchParams.get('categories');
    const accessParam = searchParams.get('access');

    setSelectedCategories(
      categoriesParam ? categoriesParam.split(',') : []
    );

    setSelectedAccessTypes(accessParam ? accessParam.split(',') : []);
  }, [searchParams]);

  const handleCheckboxChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        // Si ya está seleccionada, la eliminamos
        return prev.filter((id) => id !== categoryId);
      } else {
        // Si no está seleccionada, la añadimos
        return [...prev, categoryId];
      }
    });
  };

  const handleCheckboxAccessType = (accessTypeId: string) => {
    setSelectedAccessTypes((prev) => {
      if (prev.includes(accessTypeId)) {
        // Si ya está seleccionado, lo eliminamos
        return prev.filter((id) => id !== accessTypeId);
      } else {
        // Si no está seleccionado, lo añadimos
        return [...prev, accessTypeId];
      }
    });
  };

  // Apply filters when button is clicked
  const applyFilters = () => {
    const params = new URLSearchParams();

    // Add selected categories to params
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    }

    // Add selected access types to params
    if (selectedAccessTypes.length > 0) {
      params.set('access', selectedAccessTypes.join(','));
    }

    // Update URL without causing a full page reload using Next.js 15 features
    const url = params.toString()
      ? `${pathname}?${params}`
      : pathname;
    router.push(url, { scroll: false });
  };

  // Prevent default form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Toggle showing all categories
  const toggleShowAllCategories = () => {
    setShowAllCategories((prev) => !prev);
  };

  // Get the categories to display (all or just the first 5)
  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 5);

  return (
    <form
      className="filter-form"
      aria-label="Filtrar libros"
      onSubmit={handleSubmit}
    >
      <button type="button" className="close-button">
        <Close />
        Cerrar
      </button>
      <fieldset>
        <fieldset className="container-categories">
          <legend className="filter-form-legend">Categorías</legend>
          <small className="number-selected-categories">
            Seleccionadas ({selectedCategories.length})
          </small>
          <div className="list-categories">
            {displayedCategories.map((category) => (
              <Checkbox
                key={category.id}
                id={`${category.id}-filter-form`}
                value={category.name}
                label={category.name}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
              />
            ))}
          </div>
          {categories.length > 5 && (
            <button
              type="button"
              className="all-categories-button"
              onClick={toggleShowAllCategories}
            >
              {showAllCategories
                ? 'Mostrar menos categorías'
                : 'Ver todas las categorías'}
            </button>
          )}
        </fieldset>
        <fieldset className="container-access-type">
          <legend className="filter-form-legend">
            Tipo de acceso
          </legend>
          <small className="number-selected-categories">
            Seleccionados ({selectedAccessTypes.length})
          </small>
          <div className="list-categories">
            {ACCESS_TYPES.map((category) => (
              <Checkbox
                key={category.id}
                id={`${category.id}-access-type-filter-form`}
                name={category.name}
                value={category.value}
                label={category.label}
                checked={selectedAccessTypes.includes(category.value)}
                onChange={() =>
                  handleCheckboxAccessType(category.value)
                }
              />
            ))}
          </div>
        </fieldset>
        <button
          type="button"
          className="form-filter-submit-button"
          onClick={applyFilters}
        >
          Aplicar filtros
        </button>
      </fieldset>
    </form>
  );
}
