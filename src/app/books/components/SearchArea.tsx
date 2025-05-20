import Search from "../../../components/icons/Search";
import Filter from "../../../components/icons/Filter";
import FilterForm from "./FilterForm";
import CategoriesFilterForm from "./CategoriesFilterForm";

export default function SearchArea() {
  return (
    <>
      <div role="search" className="search-area">
        <div className="search-input-container">
          <input
            className="search-input"
            type="text"
            name="search"
            placeholder="Buscar libros..."
            aria-label="Buscar por título, autor, categoría, descripción o nombre de quien publicó"
          />
          <span className="search-icon-container">
            <Search />
          </span>
        </div>
        <button className="filter-icon-container">
          <Filter />
        </button>
      </div>
      <section>
        <FilterForm />
        <CategoriesFilterForm />
      </section>
    </>
  );
}
