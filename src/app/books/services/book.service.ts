import { createServerSupabaseClient } from '@/app/ssr/server';
import {
  BookResponse,
  SingleBookResponse,
  BookWithId,
  BookWithIdAndCategories,
} from '../types/book.type';

// Función para obtener todos los libros
export async function getAllBooks({
  query,
  categories,
  accessTypes,
}: {
  query?: string;
  categories?: string[];
  accessTypes?: string[];
}): Promise<BookResponse> {
  try {
    const supabase = createServerSupabaseClient();

    // Si hay un término de búsqueda, usar la función RPC con unaccent
    if (query && query.trim() !== '') {
      const searchTerm = query.trim().toLowerCase();

      // Usar la función RPC personalizada con unaccent
      const { data, error } = await supabase.rpc(
        'search_books_with_unaccent' as any,
        { search_term: searchTerm }
      );

      if (error) {
        throw error;
      }

      // Si no hay resultados, devolver array vacío
      if (!data || !Array.isArray(data) || data.length === 0) {
        return { data: [], error: null };
      }

      // Obtener los IDs de los libros encontrados
      const bookIds = data.map((book: any) => book.id);

      // Obtener datos completos con relaciones para los libros encontrados
      let queryWithRelations = supabase
        .from('books')
        .select(
          `
        *,
        users:user_id(name, avatar),
        book_categories(
          categories(id, name)
        )
      `
        )
        .in('id', bookIds);

      // Si hay categorías seleccionadas, filtrar por ellas
      if (categories && categories.length > 0) {
        // Modificar la consulta para usar inner join con categorías
        queryWithRelations = supabase
          .from('books')
          .select(
            `
            *,
            users:user_id(name, avatar),
            book_categories!inner(
              categories!inner(id, name)
            )
          `
          )
          .in('id', bookIds)
          .filter(
            'book_categories.categories.id',
            'in',
            `(${categories.join(',')})`
          );
      }

      // Si hay tipos de acceso seleccionados, filtrar por ellos
      if (accessTypes && accessTypes.length > 0) {
        queryWithRelations = queryWithRelations.in(
          'access',
          accessTypes as Array<'free' | 'paid'>
        );
      }

      // Apply sorting
      queryWithRelations = queryWithRelations.order('created_at', {
        ascending: false,
      });

      const { data: booksWithRelations, error: relationsError } =
        await queryWithRelations;

      if (relationsError) {
        throw relationsError;
      }

      return {
        data: booksWithRelations as BookWithIdAndCategories[],
        error: null,
      };
    } else {
      // Si no hay búsqueda, usar la consulta normal
      let supabaseQuery;

      // Si hay categorías seleccionadas, aplicar filtro con inner join
      if (categories && categories.length > 0) {
        // Modificar la consulta para usar inner join con categorías
        supabaseQuery = supabase
          .from('books')
          .select(
            `
            *,
            users:user_id(name, avatar),
            book_categories!inner(
              categories!inner(id, name)
            )
          `
          )
          .filter(
            'book_categories.categories.id',
            'in',
            `(${categories.join(',')})`
          );
      } else {
        // Consulta normal sin filtrar por categorías
        supabaseQuery = supabase.from('books').select(
          `
          *,
          users:user_id(name, avatar),
          book_categories(
            categories(id, name)
          )
        `
        );
      }

      // Si hay tipos de acceso seleccionados, filtrar por ellos
      if (accessTypes && accessTypes.length > 0) {
        supabaseQuery = supabaseQuery.in(
          'access',
          accessTypes as Array<'free' | 'paid'>
        );
      }

      // Apply sorting
      supabaseQuery = supabaseQuery.order('created_at', {
        ascending: false,
      });

      const { data, error } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return { data: data as BookWithIdAndCategories[], error: null };
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    return { data: null, error: error as Error };
  }
}

// Función para agregar un libro
export async function addBook(
  book: BookWithId
): Promise<{ data: BookWithId[] | null; error: Error | null }> {
  try {
    console.log('Attempting to add book with data:', JSON.stringify(book, null, 2));
    
    const supabase = createServerSupabaseClient();
    
    // Validar campos requeridos
    if (!book.title || !book.user_id) {
      const error = new Error('Título y usuario son campos requeridos');
      console.error('Validation error:', error.message);
      return { data: null, error };
    }
    
    // Crear un objeto con los campos requeridos
    const bookData = {
      title: book.title,
      author: book.author || 'Autor desconocido',
      description: book.description || null,
      cover_url: book.cover_url || '',
      link: book.link || '', // Asegurar que link sea string vacío en lugar de null
      access: book.access || 'free',
      user_id: book.user_id,
      created_at: book.created_at || new Date().toISOString()
    };
    
    console.log('Book data after validation:', JSON.stringify(bookData, null, 2));
    
    const { data, error } = await supabase
      .from('books')
      .insert(bookData)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error when adding book:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }
    
    console.log('Successfully added book with ID:', data?.id);
    return { data: data ? [data] : null, error: null };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al agregar el libro';
    console.error('Error adding book:', errorMessage, error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error(errorMessage) 
    };
  }
}

// Función para obtener libros de un usuario específico
export async function getBooksByUser(
  userId: string,
  query?: string
): Promise<BookResponse> {
  try {
    const supabase = createServerSupabaseClient();

    // Si hay un término de búsqueda, usar la función RPC con unaccent
    if (query && query.trim() !== '') {
      const searchTerm = query.trim().toLowerCase();

      // Usar la función RPC personalizada con unaccent
      const { data, error } = await supabase.rpc(
        'search_user_books_with_unaccent' as any,
        {
          user_id_param: userId,
          search_term: searchTerm,
        }
      );

      if (error) {
        throw error;
      }

      // Si no hay resultados, devolver array vacío
      if (!data || !Array.isArray(data) || data.length === 0) {
        return { data: [], error: null };
      }

      // Obtener los IDs de los libros encontrados
      const bookIds = data.map((book: any) => book.id);

      // Obtener datos completos con relaciones para los libros encontrados
      const { data: booksWithRelations, error: relationsError } =
        await supabase
          .from('books')
          .select(
            `
          *,
          users:user_id(name, avatar),
          book_categories(
            categories(id, name)
          )
        `
          )
          .in('id', bookIds)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

      if (relationsError) {
        throw relationsError;
      }

      return {
        data: booksWithRelations as BookWithIdAndCategories[],
        error: null,
      };
    } else {
      // Si no hay búsqueda, usar la consulta normal
      let supabaseQuery = supabase
        .from('books')
        .select(
          `
          *,
          users:user_id(name, avatar),
          book_categories(
            categories(id, name)
          )
        `
        )
        .eq('user_id', userId);

      // Apply sorting
      supabaseQuery = supabaseQuery.order('created_at', {
        ascending: false,
      });

      const { data, error } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return { data: data as BookWithIdAndCategories[], error: null };
    }
  } catch (error) {
    console.error('Error fetching user books:', error);
    return { data: null, error: error as Error };
  }
}

// Función para obtener un libro específico por ID
export async function getBookById(
  bookId: string
): Promise<SingleBookResponse> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('books')
      .select(
        `
        *,
        users:user_id(name, avatar),
        book_categories(
          categories(id, name)
        )
      `
      )
      .eq('id', bookId)
      .single();

    if (error) {
      throw error;
    }

    return { data: data as BookWithIdAndCategories, error: null };
  } catch (error) {
    console.error('Error fetching book:', error);
    return { data: null, error: error as Error };
  }
}

// Función para obtener categorías que tienen libros asociados
export async function getCategoriesWithBooks(): Promise<{
  data: { id: string; name: string; book_count: number }[] | null;
  error: Error | null;
}> {
  try {
    const supabase = createServerSupabaseClient();

    // Consulta para obtener categorías con el conteo de libros asociados
    const { data, error } = await supabase.from('categories').select(`
        id, 
        name, 
        book_categories!inner(book_id)
      `);

    if (error) {
      throw error;
    }

    // Procesar los resultados para contar libros por categoría
    const categoriesWithCount = data
      .map((category) => {
        return {
          id: category.id,
          name: category.name,
          book_count: category.book_categories
            ? category.book_categories.length
            : 0,
        };
      })
      .filter((category) => category.book_count > 0);

    return { data: categoriesWithCount, error: null };
  } catch (error) {
    console.error('Error fetching categories with books:', error);
    return { data: null, error: error as Error };
  }
}

// Función para obtener libros filtrados por categorías y/o acceso
export async function getFilteredBooks(filters: {
  categoryIds?: string[];
  accessTypes?: string[];
  query?: string;
}): Promise<BookResponse> {
  try {
    const { categoryIds = [], accessTypes = [], query } = filters;
    const supabase = createServerSupabaseClient();

    // Si no hay filtros activos, devolver todos los libros
    if (
      categoryIds.length === 0 &&
      accessTypes.length === 0 &&
      (!query || query.trim() === '')
    ) {
      return getAllBooks({ query });
    }

    // Si solo hay búsqueda por query sin otros filtros, usar getAllBooks con el query
    if (
      categoryIds.length === 0 &&
      accessTypes.length === 0 &&
      query &&
      query.trim() !== ''
    ) {
      return getAllBooks({ query });
    }

    // Si solo hay filtro por categorías sin acceso ni query, usar getAllBooks con categories
    if (
      categoryIds.length > 0 &&
      accessTypes.length === 0 &&
      (!query || query.trim() === '')
    ) {
      return getAllBooks({ categories: categoryIds });
    }

    // Si solo hay filtro por acceso sin categorías ni query, usar getAllBooks con accessTypes
    if (
      categoryIds.length === 0 &&
      accessTypes.length > 0 &&
      (!query || query.trim() === '')
    ) {
      return getAllBooks({ accessTypes });
    }

    // Si hay filtros por categorías y acceso sin query, usar getAllBooks con ambos
    if (
      categoryIds.length > 0 &&
      accessTypes.length > 0 &&
      (!query || query.trim() === '')
    ) {
      return getAllBooks({ categories: categoryIds, accessTypes });
    }

    // Si hay búsqueda por query y filtro por acceso sin categorías, usar getAllBooks
    if (
      categoryIds.length === 0 &&
      accessTypes.length > 0 &&
      query &&
      query.trim() !== ''
    ) {
      return getAllBooks({ query, accessTypes });
    }

    // Si hay búsqueda por query, categorías y acceso, usar getAllBooks
    if (
      categoryIds.length > 0 &&
      accessTypes.length > 0 &&
      query &&
      query.trim() !== ''
    ) {
      return getAllBooks({
        query,
        categories: categoryIds,
        accessTypes,
      });
    }

    // Si hay un término de búsqueda, usar la función RPC con unaccent
    if (query && query.trim() !== '') {
      const searchTerm = query.trim().toLowerCase();

      // Usar la función RPC personalizada con unaccent y filtros
      const { data, error } = await supabase.rpc(
        'search_filtered_books_with_unaccent' as any,
        {
          category_ids: categoryIds.length > 0 ? categoryIds : null,
          access_types: accessTypes.length > 0 ? accessTypes : null,
          search_term: searchTerm,
        }
      );

      if (error) {
        throw error;
      }

      // Si no hay resultados, devolver array vacío
      if (!data || !Array.isArray(data) || data.length === 0) {
        return { data: [], error: null };
      }

      // Obtener los IDs de los libros encontrados
      const bookIds = data.map((book: any) => book.id);

      // Construir la consulta para obtener las relaciones
      let booksQuery = supabase
        .from('books')
        .select(
          `
          *,
          users:user_id(name, avatar),
          book_categories(
            categories(id, name)
          )
        `
        )
        .in('id', bookIds);

      // Aplicar orderBy usando los IDs para mantener el orden original
      const { data: booksWithRelations, error: relationsError } =
        await booksQuery.order('created_at', { ascending: false });

      if (relationsError) {
        throw relationsError;
      }

      return {
        data: booksWithRelations as BookWithIdAndCategories[],
        error: null,
      };
    } else {
      // Si no hay búsqueda de texto, pero sí otros filtros

      // Iniciar la consulta base
      let supabaseQuery = supabase.from('books').select(`
          *,
          users:user_id(name, avatar),
          book_categories(
            categories(id, name)
          )
        `);

      // Si hay categorías seleccionadas, aplicar filtro con inner join
      if (categoryIds.length > 0) {
        // Modificar la consulta para usar inner join con categorías
        supabaseQuery = supabase
          .from('books')
          .select(
            `
            *,
            users:user_id(name, avatar),
            book_categories!inner(
              categories!inner(id, name)
            )
          `
          )
          .filter(
            'book_categories.categories.id',
            'in',
            `(${categoryIds.join(',')})`
          );
      }

      // Si hay filtros de acceso, aplicarlos
      if (accessTypes.length > 0 && accessTypes.length < 2) {
        // Si solo hay un tipo seleccionado, usamos eq
        supabaseQuery = supabaseQuery.eq(
          'access',
          accessTypes[0] as 'free' | 'paid'
        );
      } else if (accessTypes.length === 2) {
        // Si están ambos tipos seleccionados, no filtramos por acceso
        // ya que queremos mostrar todos los libros (pero mantenemos los otros filtros)
      }

      // Ordenar resultados
      supabaseQuery = supabaseQuery.order('created_at', {
        ascending: false,
      });

      // Ejecutar la consulta
      const { data, error } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return { data: data as BookWithIdAndCategories[], error: null };
    }
  } catch (error) {
    console.error('Error fetching filtered books:', error);
    return { data: null, error: error as Error };
  }
}

// Función para obtener libros filtrados por categorías (mantener por compatibilidad)
export async function getBooksByCategories(
  categoryIds: string[]
): Promise<BookResponse> {
  return getFilteredBooks({ categoryIds });
}
