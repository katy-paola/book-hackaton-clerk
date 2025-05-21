'use client';

import Search from '../../../components/icons/Search';
import Filter from '../../../components/icons/Filter';
import FilterForm from './FilterForm';
import CategoriesFilterForm from './CategoriesFilterForm';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { CategoryRow } from '../services/category.service';

interface SearchAreaProps {
  categories: CategoryRow[];
}

export default function SearchArea({ categories }: SearchAreaProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <div role="search" className="search-area">
        <div className="search-input-container">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar libros..."

            aria-label="Buscar por título, autor, descripción o nombre de quien publicó"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
          />
          <span className="search-icon-container">
            <Search />
          </span>
        </div>
        <button
          className="filter-icon-container"
          aria-label="Botón de filtros"
        >
          <Filter />
        </button>
      </div>
      <section>
        <FilterForm categories={categories} />
        <CategoriesFilterForm categories={categories} />
      </section>
    </>
  );
}
