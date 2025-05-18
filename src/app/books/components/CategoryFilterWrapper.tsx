import { getCategoriesWithBooks } from '../services/book.service'
import CategoryFilter from './CategoryFilter'

export default async function CategoryFilterWrapper() {
  const { data: categories, error } = await getCategoriesWithBooks()
  
  if (error) {
    console.error('Error al cargar categorías:', error)
    return <p>Error al cargar las categorías</p>
  }
  
  if (!categories || categories.length === 0) {
    return <p>No hay categorías disponibles</p>
  }
  
  return <CategoryFilter categories={categories} />
} 