'use client'

import { useState, useEffect } from 'react'
import { Tables } from '@/types/database.types'
import { addCategory } from '../actions/add-category.action'

type CategoryRow = Tables<'categories'>

export default function CategorySelector({ 
  categories: initialCategories,
  onChange,
  initialSelectedIds = []
}: { 
  categories: CategoryRow[],
  onChange: (selectedIds: string[]) => void,
  initialSelectedIds?: string[]
}) {
  const [categories, setCategories] = useState<CategoryRow[]>(initialCategories)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSelectedIds)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Actualizar el estado padre cuando cambian las categorías seleccionadas
  useEffect(() => {
    onChange(selectedCategories)
  }, [selectedCategories, onChange])

  // Manejar selección/deselección de categoría
  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      // Si ya está seleccionada, la eliminamos
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      } 
      // Si no está seleccionada, la agregamos
      else {
        return [...prev, categoryId]
      }
    })
  }

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
        const newCategory = result.data
        setCategories(prev => [...prev, newCategory])
        
        // Seleccionar automáticamente la nueva categoría
        setSelectedCategories(prev => [...prev, newCategory.id])
        
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
    category.name.toLowerCase().includes(newCategoryName.toLowerCase())
  )

  return (
    <div className="categories-selector">
      <div className="categories-grid">
        {categories.map(category => (
          <label 
            key={category.id} 
            className={`category-item ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              value={category.id}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleToggleCategory(category.id)}
              className="category-checkbox"
            />
            <span className="category-name">{category.name}</span>
          </label>
        ))}
      </div>

      {selectedCategories.length > 0 && (
        <div className="selected-categories">
          <p>Categorías seleccionadas: {selectedCategories.length}</p>
          <div className="category-tags">
            {selectedCategories.map(id => {
              const category = categories.find(c => c.id === id)
              return category ? (
                <span key={id} className="category-tag">
                  {category.name}
                  <button 
                    type="button"
                    onClick={() => handleToggleCategory(id)} 
                    className="remove-category"
                    aria-label={`Eliminar categoría ${category.name}`}
                  >
                    ×
                  </button>
                </span>
              ) : null
            })}
          </div>
        </div>
      )}

      <div className="add-category-section">
        <form onSubmit={handleAddCategory} className="add-category-form">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Agregar nueva categoría"
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
        
        {newCategoryName && filteredCategories.length > 0 && filteredCategories.length < categories.length && (
          <div className="category-suggestions">
            <p>Categorías existentes similares:</p>
            <div className="category-suggestions-list">
              {filteredCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    if (!selectedCategories.includes(category.id)) {
                      handleToggleCategory(category.id)
                    }
                    setNewCategoryName('')
                  }}
                  className="category-suggestion-item"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 