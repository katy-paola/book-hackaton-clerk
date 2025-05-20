import Close from "../../../components/icons/Close";
import Search from "../../../components/icons/Search";
import Checkbox from "./Checkbox";
import { CATEGORIES, ACCESS_TYPES } from "../consts/checkboxes-data";

export default function FilterForm() {
  return (
    <form action="" className="filter-form" aria-label="Filtrar libros">
      <button type="button" className="close-button">
        <Close />
        Cerrar
      </button>
      <fieldset>
        <label htmlFor="search-input" className="search-input-container">
          <input
            className="search-input"
            id="search-input"
            type="search"
            name="search"
            placeholder="Buscar libros"
            aria-label="Buscar por título, autor, categoría, descripción o nombre de quien publicó"
          />
          <span className="search-icon-container">
            <Search />
          </span>
        </label>
        <fieldset className="container-categories">
          <legend className="filter-form-legend">Categorías</legend>
          <small className="number-selected-categories">
            Seleccionadas (0)
          </small>
          <div className="list-categories">
            {CATEGORIES.map((category) => (
              <Checkbox
                key={category.id}
                id={`${category.id}-filter-form`}
                name={category.name}
                value={category.value}
                label={category.label}
              />
            ))}
          </div>
          <button type="button" className="all-categories-button">
            Ver todas las categorías
          </button>
        </fieldset>
        <fieldset className="container-access-type">
          <legend className="filter-form-legend">Tipo de acceso</legend>
          <div className="list-categories">
            {ACCESS_TYPES.map((category) => (
              <Checkbox
                key={category.id}
                id={`${category.id}-access-type-filter-form`}
                name={category.name}
                value={category.value}
                label={category.label}
              />
            ))}
          </div>
        </fieldset>
        <button type="submit" className="form-filter-submit-button">
          Aplicar filtros
        </button>
      </fieldset>
    </form>
  );
}
