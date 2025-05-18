'use client'

import { useState, useEffect } from 'react'
import { getAllCategories } from '@/app/books/services/category.service'
import { addCategory } from '@/app/books/actions/add-category.action'
import { Tables } from '@/types/database.types'

type CategoryRow = Tables<'categories'>

export default function CategoriesList() {
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getAllCategories()
        if (data) {
          setCategories(data)
        }
      } catch (error) {
        setError('Error al cargar categorías')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Manejar creación de nueva categoría
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newCategoryName.trim()) {
      setError('El nombre de la categoría no puede estar vacío')
      return
    }
    
    setIsAddingCategory(true)
    setError(null)
    
    try {
      const result = await addCategory(newCategoryName)
      
      if ('error' in result) {
        setError(result.error)
      } else {
        // Agregar la nueva categoría a la lista
        setCategories(prev => [...prev, result.data])
        
        // Limpiar el campo
        setNewCategoryName('')
      }
    } catch (error) {
      setError('Error al crear la categoría')
      console.error(error)
    } finally {
      setIsAddingCategory(false)
    }
  }

  // Filtrar categorías por búsqueda
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div className="loading-text">Cargando categorías...</div>
  }

  return (
    <div className="categories-manager">
      <div className="add-category-section">
        <h2 className="section-subtitle">Agregar nueva categoría</h2>
        <form onSubmit={handleAddCategory} className="add-category-form">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nombre de la nueva categoría"
            className="add-category-input"
            disabled={isAddingCategory}
          />
          <button
            type="submit"
            className="add-category-button"
            disabled={isAddingCategory}
          >
            {isAddingCategory ? 'Agregando...' : 'Agregar'}
          </button>
        </form>
        
        {error && <p className="category-error">{error}</p>}
      </div>

      <div className="categories-list-section">
        <h2 className="section-subtitle">Categorías existentes</h2>
        
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar categorías..."
            className="search-input"
          />
        </div>
        
        {filteredCategories.length === 0 ? (
          <p className="no-results">No se encontraron categorías</p>
        ) : (
          <ul className="categories-list">
            {filteredCategories.map(category => (
              <li key={category.id} className="category-item-row">
                <span className="category-name">{category.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
} 