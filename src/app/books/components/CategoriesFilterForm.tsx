"use client";

import { useState, useEffect } from "react";
import Search from "../../../components/icons/Search";
import { CategoryRow } from "../services/category.service";
import Checkbox from "./Checkbox";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ArrowLeft from "@/components/icons/ArrowLeft";
import ArrowRight from "@/components/icons/ArrowRight";

interface CategoriesFilterFormProps {
  categories: CategoryRow[];
}

export default function CategoriesFilterForm({
  categories,
}: CategoriesFilterFormProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Local state for tracking selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 11;

  // Initialize state from URL params
  useEffect(() => {
    const categoriesParam = searchParams.get("categories");
    setSelectedCategories(categoriesParam ? categoriesParam.split(",") : []);
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

  // Apply filters when button is clicked
  const applyFilters = () => {
    const params = new URLSearchParams();

    // Add selected categories to params
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }

    // Preserve any other existing parameters (like access)
    const accessParam = searchParams.get("access");
    if (accessParam) {
      params.set("access", accessParam);
    }

    // Update URL without causing a full page reload
    const url = params.toString() ? `${pathname}?${params}` : pathname;
    router.push(url, { scroll: false });
    
    // Restablecer el scroll del body cuando se aplican los filtros
    document.body.style.overflow = "auto";
  };

  // Prevent default form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Reset to first page when searching
    setCurrentPage(1);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  // Get current page's categories
  const currentCategories = filteredCategories.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
  );

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="categories-filter-container">
      <div className="categories-filter-header">
        <h2 className="categories-filter-title">Todas las categorías</h2>
      </div>
      <form
        className="categories-filter-form"
        aria-label="Filtrar por categorías"
        onSubmit={handleSubmit}
      >
        <fieldset className="container-categories">
          <label
            htmlFor="search-categories-input"
            className="search-input-container"
          >
          <input
            className="search-input"
            id="search-categories-input"
            type="search"
            name="search"
            placeholder="Buscar categorías"
            aria-label="Buscar entre todas las categorías disponibles"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="search-icon-container">
            <Search />
          </span>
        </label>
        <small className="number-selected-categories">
          Seleccionadas ({selectedCategories.length})
          {filteredCategories.length > 0 && (
            <span className="categories-count">
              {" "}
              | Mostrando {currentCategories.length} de{" "}
              {filteredCategories.length}
            </span>
          )}
        </small>
        <div className="list-categories">
          {currentCategories.map((category) => (
            <Checkbox
              key={category.id}
              id={`${category.id}-categories-filter-form`}
              name={category.name}
              value={category.name}
              label={category.name}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCheckboxChange(category.id)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              type="button"
              className="pagination-button"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              <ArrowLeft />
            </button>
            <span className="page-indicator">
              Página {currentPage} de {totalPages}
            </span>
            <button
              type="button"
              className="pagination-button"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <ArrowRight />
            </button>
          </div>
        )}

        <button
          type="button"
          className="form-filter-submit-button"
          onClick={applyFilters}
        >
          Aplicar
          </button>
        </fieldset>
      </form>
    </div>
  );
}
