import Close from "../../../components/icons/Close";
import Search from "../../../components/icons/Search";

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
            <label className="item-categories" htmlFor="finanzas">
              <input
                id="finanzas"
                type="checkbox"
                name="finanzas"
                value="finanzas"
              />
              Finanzas
            </label>
            <label className="item-categories" htmlFor="matematicas">
              <input
                id="matematicas"
                type="checkbox"
                name="matematicas"
                value="matematicas"
              />
              Matemáticas
            </label>
            <label className="item-categories" htmlFor="programacion">
              <input
                id="programacion"
                type="checkbox"
                name="programacion"
                value="programacion"
              />
              Programación
            </label>
            <label className="item-categories" htmlFor="autoayuda">
              <input
                id="autoayuda"
                type="checkbox"
                name="autoayuda"
                value="autoayuda"
              />
              Autoayuda
            </label>
            <label className="item-categories" htmlFor="literatura">
              <input
                id="literatura"
                type="checkbox"
                name="literatura"
                value="literatura"
              />
              Literatura
            </label>
          </div>
          <button type="button" className="all-categories-button">
            Ver todas las categorías
          </button>
        </fieldset>
        <fieldset className="container-access-type">
          <legend className="filter-form-legend">Tipo de acceso</legend>
          <div className="list-categories">
            <label className="item-categories" htmlFor="gratis">
              <input id="gratis" type="checkbox" name="gratis" value="gratis" />
              Gratis
            </label>
            <label className="item-categories" htmlFor="de-pago">
              <input
                id="de-pago"
                type="checkbox"
                name="de-pago"
                value="de-pago"
              />
              De pago
            </label>
          </div>
        </fieldset>
        <button type="submit" className="form-filter-submit-button">
          Aplicar filtros
        </button>
      </fieldset>
    </form>
  );
}
