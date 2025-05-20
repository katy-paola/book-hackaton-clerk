import Close from "../../../components/icons/Close";
import Search from "../../../components/icons/Search";
import { CATEGORIES } from "../consts/checkboxes-data";
import Checkbox from "./Checkbox";

export default function CategoriesFilterForm() {
  return (
    <form
      action=""
      className="categories-filter-form"
      aria-label="Ver todas las categorías"
    >
      <button type="button" className="close-button">
        <Close />
        Cerrar
      </button>
      <fieldset className="container-categories">
        <legend className="filter-form-legend">Todas las categorías</legend>
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
          />
          <span className="search-icon-container">
            <Search />
          </span>
        </label>
        <small className="number-selected-categories">Seleccionadas (0)</small>
        <div className="list-categories">
          {CATEGORIES.map((category) => (
            <Checkbox
              key={category.id}
              id={`${category.id}-categories-filter-form`}
              name={category.name}
              value={category.value}
              label={category.label}
            />
          ))}
        </div>
        <button type="submit" className="form-filter-submit-button">
          Aplicar
        </button>
      </fieldset>
    </form>
  );
}
