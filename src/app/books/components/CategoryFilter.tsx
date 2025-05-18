'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type Category = {
  id: string
  name: string
  book_count: number
}

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Obtener categorías seleccionadas de la URL
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const params = new URLSearchParams(searchParams.toString())
    const categoryParam = params.get('categories')
    return categoryParam ? categoryParam.split(',') : []
  })

  // Actualizar la URL cuando cambien las categorías seleccionadas
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','))
    } else {
      params.delete('categories')
    }
    
    // Crear la nueva URL y navegar
    const newUrl = `${pathname}?${params.toString()}`
    router.push(newUrl)
  }, [selectedCategories, pathname, router, searchParams])

  // Manejar la selección/deselección de categorías
  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  // Limpiar todas las categorías seleccionadas
  const handleClearFilter = () => {
    setSelectedCategories([])
  }

  return (
    <div className="category-filter">
      <div className="filter-header">
        <h3>Filtrar por categorías</h3>
        {selectedCategories.length > 0 && (
          <button 
            onClick={handleClearFilter}
            className="clear-filter-button"
          >
            Limpiar filtros
          </button>
        )}
      </div>
      
      <div className="category-filter-list">
        {categories.map(category => (
          <div key={category.id} className="category-filter-item">
            <label className="category-filter-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleToggleCategory(category.id)}
                className="category-filter-checkbox"
              />
              <span className="category-filter-name">
                {category.name} 
                <span className="category-filter-count">
                  ({category.book_count})
                </span>
              </span>
            </label>
          </div>
        ))}
      </div>
      
      {categories.length === 0 && (
        <p className="no-categories-message">No hay categorías disponibles</p>
      )}
    </div>
  )
} 