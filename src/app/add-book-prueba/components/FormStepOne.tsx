import ArrowDown from "@/components/icons/ArrowDown";
import { useState } from "react";

interface CategoriesSelect {
  options: string[];
  label?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
}

function CategoriesSelect({
  options,
  label = "Search",
  placeholder = "Finanzas",
  onSelect,
}: CategoriesSelect) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

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
    const input = document.getElementById("autocomplete-input");
    input?.focus();
  };

  return (
    <div className="w-full max-w-md">
      <label htmlFor="autocomplete-input" className="block mb-1 font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id="autocomplete-input"
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowList(true)}
          onBlur={() => setTimeout(() => setShowList(false), 100)}
          className="w-full border px-3 py-2 pr-10 rounded-md"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={focusInput}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          <ArrowDown />
        </button>

        {showList && filtered.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow">
            {filtered.map((option) => (
              <li
                key={option}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
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

const options = [
  "Finanzas",
  "Matemáticas",
  "Autoayuda",
  "Programación",
  "Educación",
  "Salud y bienestar",
  "Literatura",
];

export default function FormStepOne() {
  return (
    <form>
      <fieldset>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Título
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Ej.: Hábitos atómicos"
              className="form-input"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">Categorías</label>
          <CategoriesSelect options={options} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Descripción
            <textarea
              id="description"
              name="description"
              className="form-input"
              rows={4}
            />
          </label>
        </div>

        <button>Siguiente</button>
      </fieldset>
    </form>
  );
}
