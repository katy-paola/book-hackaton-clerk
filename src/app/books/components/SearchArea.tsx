"use client";

import { useState, useEffect } from "react";
import Close from "../../../components/icons/Close";
import Search from "../../../components/icons/Search";
import Filter from "../../../components/icons/Filter";
import FilterForm from "./FilterForm";
import FilterFormDesktop from "./FilterFormDesktop";
import CategoriesFilterForm from "./CategoriesFilterForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { CategoryRow } from "../services/category.service";

interface SearchAreaProps {
  categories: CategoryRow[];
}

type DrawerView = "filters" | "categories";

export default function SearchArea({ categories }: SearchAreaProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<DrawerView>("filters");

  // Cerrar el drawer cuando cambian los parámetros de búsqueda
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [searchParams]);

  const toggleDrawer = () => {
    const newState = !isDrawerOpen;
    setIsDrawerOpen(newState);
    // Resetear la vista al cerrar el drawer
    if (!newState) {
      setDrawerView("filters");
    }
    // Evitar que el scroll del body se mueva cuando el drawer está abierto
    document.body.style.overflow = newState ? "hidden" : "auto";
  };

  const showCategoriesView = () => setDrawerView("categories");
  const showFiltersView = () => setDrawerView("filters");

  // Limpiar el estilo al desmontar el componente
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="search-area-container">
      <div role="search" className="search-area">
        <div className="search-input-container">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar libros..."
            aria-label="Buscar por título, autor, descripción o nombre de quien publicó"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
          />
          <span className="search-icon-container">
            <Search />
          </span>
        </div>
        <button
          className="filter-icon-container"
          aria-label="Botón de filtros"
          onClick={toggleDrawer}
          aria-expanded={isDrawerOpen}
        >
          <Filter />
        </button>
      </div>

      {/* Drawer de filtros */}
      <div
        className={`filter-drawer-overlay ${isDrawerOpen ? "open" : ""}`}
        onClick={toggleDrawer}
        aria-hidden={!isDrawerOpen}
      />

      <div
        className={`filter-drawer ${isDrawerOpen ? "open" : ""}`}
        aria-modal="true"
        role="dialog"
        aria-label="Filtros de búsqueda"
      >
        <div className="filter-drawer-header">
          <button type="button" className="close-button" onClick={toggleDrawer}>
            <Close />
            Cerrar
          </button>
        </div>
        <div className="filter-drawer-content">
          {drawerView === "filters" ? (
            <FilterForm
              categories={categories}
              onClose={toggleDrawer}
              onShowAllCategories={showCategoriesView}
            />
          ) : (
            <CategoriesFilterForm
              categories={categories}
            />
          )}
        </div>
      </div>
    </>
  );
}
