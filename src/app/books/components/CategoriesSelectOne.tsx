import ArrowDown from "@/components/icons/ArrowDown";
import { useRef, useState, useEffect } from "react";
import type { CategoryOption } from "../actions";

interface CategoriesSelectProps {
  options: CategoryOption[];
  label?: string;
  placeholder?: string;
  onSelect: (value: string) => void;
  selectedValue?: string;
}

export default function CategoriesSelectOne({
  options,
  placeholder = "Selecciona una categoría",
  onSelect,
  selectedValue = "",
}: CategoriesSelectProps) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtrar opciones basadas en la búsqueda
  const filtered = query
    ? options.filter(
        (opt) =>
          opt.name?.toLowerCase().includes(query.toLowerCase()) ||
          opt.id?.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  // Actualizar el valor mostrado cuando cambia la selección externa
  useEffect(() => {
    if (selectedValue) {
      const selectedCategory = options.find((opt) => opt.id === selectedValue);
      if (selectedCategory) {
        setQuery(selectedCategory.name);
      }
    } else {
      setQuery("");
    }
  }, [selectedValue, options]);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowList(true);
  };

  const handleSelect = (category: CategoryOption) => {
    setQuery(category.name);
    setShowList(false);
    onSelect(category.id);
  };

  const handleFocus = () => {
    setShowList(true);
  };

  const handleBlur = () => {
    // Pequeño retraso para permitir que se procese el clic en un ítem
    setTimeout(() => setShowList(false), 200);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowList(!showList);
    if (!showList) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="form-field-container" ref={containerRef}>
      <label className="form-field-base" htmlFor="category">
        Categoría
      </label>
      <div className="relative">
        <div className="input-select-container">
          <input
            ref={inputRef}
            id="category"
            type="text"
            className="input-select"
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
          />
          <button
            type="button"
            className="input-select-icon-button"
            onMouseDown={toggleDropdown}
            tabIndex={-1}
          >
            <div className={`transition-transform ${showList ? 'rotate-180' : ''}`}>
            <ArrowDown />
          </div>
          </button>
        </div>

        {showList && (
          <ul className="select-list-categories">
            {filtered.length > 0 ? (
              filtered.map((option) => (
                <li
                  key={option.id}
                  className="select-list-category"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(option);
                  }}
                >
                  {option.name}
                </li>
              ))
            ) : (
              <li className="select-list-category text-gray-500">
                No se encontraron categorías
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
