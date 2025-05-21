import { createServerSupabaseClient } from '@/app/ssr/server';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'books-covers';

// Tipo para la respuesta de carga de archivo
type UploadResponse = {
  url: string | null;
  error: Error | null;
};

/**
 * Sube una imagen de portada a Supabase Storage
 * @param file Archivo de imagen a subir
 * @param userId ID del usuario que sube la imagen
 * @returns Objeto con la URL pública de la imagen
 */
export async function uploadBookCover(
  file: File,
  userId: string
): Promise<UploadResponse> {
  try {
    // Verificar que el archivo es una imagen
    if (!file.type.startsWith('image/')) {
      throw new Error('El archivo debe ser una imagen');
    }

    // Limitar el tamaño a 2MB
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('La imagen no debe superar los 2MB');
    }

    const supabase = createServerSupabaseClient();

    // Verificar si el bucket existe, si no, crearlo
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);

    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 2 * 1024 * 1024, // 2MB
      });
    }

    // Generar un nombre único para el archivo
    const fileExtension = file.name.split('.').pop();
    const fileName = `${userId}/${uuidv4()}.${fileExtension}`;

    // Subir el archivo
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Obtener la URL pública
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return {
      url: publicUrlData.publicUrl,
      error: null,
    };
  } catch (error) {
    console.error('Error uploading book cover:', error);
    return { url: null, error: error as Error };
  }
}

/**
 * Elimina una imagen de portada de Supabase Storage según la URL
 * @param coverUrl URL pública de la imagen a eliminar
 * @returns Objeto indicando si hubo error
 */
export async function deleteBookCover(coverUrl: string): Promise<{ error: Error | null }> {
  try {
    const supabase = createServerSupabaseClient();
    
    // Extraer la ruta del archivo de la URL
    // Las URLs de Supabase Storage siguen este patrón:
    // https://[project-ref].supabase.co/storage/v1/object/public/[bucket-name]/[file-path]
    const urlObj = new URL(coverUrl);
    const pathSegments = urlObj.pathname.split('/');
    const bucketIndex = pathSegments.findIndex(segment => segment === BUCKET_NAME);
    
    if (bucketIndex === -1 || bucketIndex === pathSegments.length - 1) {
      throw new Error('URL de imagen inválida');
    }
    
    // Obtener la ruta relativa al bucket
    const filePath = pathSegments.slice(bucketIndex + 1).join('/');
    
    if (!filePath) {
      throw new Error('No se pudo determinar la ruta del archivo');
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return { error: null };
  } catch (error) {
    console.error('Error deleting book cover:', error);
    return { error: error as Error };
  }
} 