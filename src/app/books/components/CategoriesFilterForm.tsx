import Close from "../../../components/icons/Close";
import Search from "../../../components/icons/Search";

export default function CategoriesFilterForm() {
  return (
    <form action="" aria-label="Ver todas las categorías">
      <button type="button">
        <Close />
        Cerrar
      </button>
      <fieldset>
        <legend>Categorías</legend>
        <label htmlFor="search-categories-input">
          <Search />
          <input
            id="search-categories-input"
            type="search"
            name="search"
            placeholder="Buscar categorías"
            aria-label="Buscar entre todas las categorías disponibles"
          />
        </label>
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
        <button type="submit">Aplicar</button>
      </fieldset>
    </form>
  );
}
