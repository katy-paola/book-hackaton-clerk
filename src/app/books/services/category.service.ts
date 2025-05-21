import { createClientSupabaseClient } from '@/app/ssr/client';
import { Tables } from '@/types/database.types';

export type CategoryRow = Tables<'categories'>;
type CategoryResponse = {
  data: CategoryRow[] | null;
  error: Error | null;
};

// Obtener una categoría por su nombre
export async function getCategoryByName(name: string): Promise<{ data: CategoryRow | null; error: Error | null }> {
  try {
    const supabase = createClientSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('name', name)
      .single();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching category by name:', error);
    return { data: null, error: error as Error };
  }
}

// Obtener todas las categorías disponibles
export async function getAllCategories(): Promise<CategoryResponse> {
  try {
    const supabase = createClientSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      throw error;
    }

    return { 
      data: data as CategoryRow[] || [],
      error: null 
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { 
      data: [], 
      error: error as Error 
    };
  }
}

// Guardar relaciones entre libro y categorías
export async function saveBookCategories(
  bookId: string,
  categoryIds: string[]
): Promise<{ error: Error | null }> {
  console.log('=== INICIO saveBookCategories ===');
  console.log('Parámetros recibidos:', { bookId, categoryIds });
  
  // Validar que el bookId sea un UUID válido
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(bookId)) {
    const errorMsg = `ID de libro no válido: ${bookId}`;
    console.error(errorMsg);
    return { error: new Error(errorMsg) };
  }
  
  // Filtrar y validar los IDs de categoría
  console.log('Validando IDs de categoría...');
  const validCategoryIds = categoryIds.filter(id => {
    if (!id) {
      console.warn('Se encontró un ID de categoría vacío');
      return false;
    }
    
    const isValid = uuidRegex.test(id);
    if (!isValid) {
      console.warn(`ID de categoría no válido: ${id}`);
    }
    return isValid;
  });
  
  console.log('IDs de categoría válidos:', validCategoryIds);
  
  if (validCategoryIds.length === 0) {
    const errorMsg = 'No se proporcionaron IDs de categoría válidos';
    console.error(errorMsg, { originalCategoryIds: categoryIds });
    return { error: new Error(errorMsg) };
  }
  
  const supabase = createClientSupabaseClient();
  
  try {
    // Verificar que las categorías existan en la base de datos
    console.log('Verificando existencia de categorías en la base de datos...');
    const { data: existingCategories, error: fetchError } = await supabase
      .from('categories')
      .select('id')
      .in('id', validCategoryIds);
    
    if (fetchError) {
      console.error('Error al verificar categorías existentes:', fetchError);
      return { error: fetchError };
    }
    
    const existingCategoryIds = existingCategories?.map(cat => cat.id) || [];
    console.log('Categorías existentes encontradas:', existingCategoryIds);
    
    // Filtrar solo las categorías que existen
    const categoriesToAdd = validCategoryIds.filter(id => existingCategoryIds.includes(id));
    
    if (categoriesToAdd.length === 0) {
      const errorMsg = 'Ninguna de las categorías proporcionadas existe en la base de datos';
      console.error(errorMsg, { validCategoryIds, existingCategoryIds });
      return { error: new Error(errorMsg) };
    }
    
    // Crear array de objetos con las relaciones libro-categoría
    const bookCategoryRelations = categoriesToAdd.map((categoryId) => ({
      book_id: bookId,
      category_id: categoryId,
    }));
    
    console.log('Insertando relaciones libro-categoría:', bookCategoryRelations);
    
    // Insertar todas las relaciones
    const { data, error } = await supabase
      .from('book_categories')
      .insert(bookCategoryRelations)
      .select();
      
    console.log('Resultado de la inserción:', { data, error });
    
    if (error) {
      console.error('Error de Supabase al insertar relaciones:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        originalError: error
      });
      return { error };
    }
    
    console.log('=== FIN saveBookCategories - Éxito ===');
    return { error: null };
    
  } catch (error) {
    const errorObj = error as Error;
    console.error('Error inesperado en saveBookCategories:', {
      message: errorObj.message,
      stack: errorObj.stack,
      error: errorObj
    });
    return { error: errorObj };
  }
}
