import ArrowDown from "@/components/icons/ArrowDown";
import { useRef, useState } from "react";

interface CategoriesSelectProps {
  options: string[];
  label?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
}

export default function CategoriesSelect({
  options,
  placeholder = "Finanzas",
  onSelect,
}: CategoriesSelectProps) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? options.filter((opt) => opt.toLowerCase().includes(query.toLowerCase()))
    : options;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowList(true);
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    setShowList(false);
    if (onSelect) onSelect(value);
  };

  const focusInput = () => {
    inputRef.current?.focus();
    setShowList(true);
  };

  return (
    <div className="categories-select">
      <label htmlFor="autocomplete-input" className="form-field-base">
        Categoría
      </label>
      <div className="input-select-container">
        <input
          ref={inputRef}
          id="autocomplete-input"
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
          className="input-select"
          placeholder={placeholder}
        />
        <button
          type="button"
          tabIndex={-1}
          className="input-select-icon-button"
          onMouseDown={(e) => {
            e.preventDefault();
            setShowList((prev) => {
              if (prev) {
                // Si está abierto, ciérralo
                return false;
              } else {
                // Si está cerrado, ábrelo y haz focus
                focusInput();
                return true;
              }
            });
          }}
        >
          <ArrowDown />
        </button>

        {showList && filtered.length > 0 && (
          <ul className="select-list-categories">
            {filtered.map((option) => (
              <li
                key={option}
                className="select-list-category"
                onMouseDown={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
