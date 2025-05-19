import Close from "../../../components/icons/Close";
import Search from "../../../components/icons/Search";

export default function FilterForm() {
  return (
    <form action="" aria-label="Filtrar libros">
      <button type="button">
        <Close />
        Cerrar
      </button>
      <fieldset>
        <label htmlFor="search-input">
          <Search />
          <input
            id="search-input"
            type="search"
            name="search"
            placeholder="Buscar libros"
            aria-label="Buscar por título, autor, categoría, descripción o nombre de quien publicó"
          />
        </label>
        <fieldset>
          <legend>Categorías</legend>
          <label htmlFor="finanzas">
            <input
              id="finanzas"
              type="checkbox"
              name="finanzas"
              value="finanzas"
            />
            Finanzas
          </label>
          <label htmlFor="matematicas">
            <input
              id="matematicas"
              type="checkbox"
              name="matematicas"
              value="matematicas"
            />
            Matemáticas
          </label>
          <label htmlFor="programacion">
            <input
              id="programacion"
              type="checkbox"
              name="programacion"
              value="programacion"
            />
            Programación
          </label>
          <label htmlFor="autoayuda">
            <input
              id="autoayuda"
              type="checkbox"
              name="autoayuda"
              value="autoayuda"
            />
            Autoayuda
          </label>
          <label htmlFor="literatura">
            <input
              id="literatura"
              type="checkbox"
              name="literatura"
              value="literatura"
            />
            Literatura
          </label>
          <button type="button">Ver todas las categorías</button>
        </fieldset>
        <fieldset>
          <legend>Tipo de acceso</legend>
          <label htmlFor="gratis">
            <input id="gratis" type="checkbox" name="gratis" value="gratis" />
            Gratis
          </label>
          <label htmlFor="de-pago">
            <input
              id="de-pago"
              type="checkbox"
              name="de-pago"
              value="de-pago"
            />
            De pago
          </label>
        </fieldset>
        <button type="submit">Aplicar filtros</button>
      </fieldset>
    </form>
  );
}
