import Search from "../../../components/icons/Search";
import Filter from "../../../components/icons/Filter";
import FilterForm from "./FilterForm";
import CategoriesFilterForm from "./CategoriesFilterForm";

export default function SearchArea() {
  return (
    <>
      <div role="search">
        <Search />
        <input
          type="text"
          name="search"
          placeholder="Buscar libros..."
          aria-label="Buscar por título, autor, categoría, descripción o nombre de quien publicó"
        />
      </div>
      <section>
        <Filter />
        <FilterForm />
        <CategoriesFilterForm />
      </section>
    </>
  );
}
