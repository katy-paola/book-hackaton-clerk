import { useRef, useState, useEffect } from "react";

// Simple X icon component
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Simple ChevronDown icon component
const ChevronDown = ({ className = "" }) => (
  <svg 
    className={className}
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

interface CategoriesSelectProps {
  options: string[];
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
  label?: string;
  placeholder?: string;
}

export default function CategoriesSelect({
  options,
  selectedCategories = [],
  onChange,
  placeholder = "Selecciona categorías",
}: CategoriesSelectProps) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filtered = query
    ? options.filter(
        (opt) =>
          !selectedCategories.includes(opt) &&
          opt.toLowerCase().includes(query.toLowerCase())
      )
    : options.filter((opt) => !selectedCategories.includes(opt));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelect = (value: string) => {
    const newCategories = [...selectedCategories, value];
    onChange(newCategories);
    setQuery("");
    inputRef.current?.focus();
  };

  const removeCategory = (category: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedCategories.filter((c) => c !== category));
  };

  const toggleDropdown = () => {
    setShowList(!showList);
    if (!showList) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <div className="categories-select" ref={containerRef}>
      <label className="form-field-base">
        Categorías
      </label>
      <div className="relative">
        <div
          className="form-field-base-input flex flex-wrap items-center gap-2 p-2 min-h-[42px] cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {selectedCategories.length > 0 ? (
            selectedCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-800"
              >
                {category}
                <button
                  type="button"
                  onClick={(e) => removeCategory(category, e)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <XIcon />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setShowList(true)}
            className="flex-1 min-w-[100px] bg-transparent outline-none"
            placeholder={selectedCategories.length === 0 ? placeholder : ''}
          />
          <button
            type="button"
            onClick={toggleDropdown}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronDown className={`transition-transform ${showList ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showList && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {filtered.length > 0 ? (
              <ul className="py-1">
                {filtered.map((option) => (
                  <li
                    key={option}
                    onMouseDown={() => handleSelect(option)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No se encontraron resultados
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
