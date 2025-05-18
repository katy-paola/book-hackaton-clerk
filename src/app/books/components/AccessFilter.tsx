'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function AccessFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Obtener tipos de acceso seleccionados de la URL
  const [selectedAccessTypes, setSelectedAccessTypes] = useState<string[]>(() => {
    const params = new URLSearchParams(searchParams.toString())
    const accessParam = params.get('access')
    return accessParam ? accessParam.split(',') : []
  })

  // Actualizar la URL cuando cambien los tipos de acceso seleccionados
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (selectedAccessTypes.length > 0) {
      params.set('access', selectedAccessTypes.join(','))
    } else {
      params.delete('access')
    }
    
    // Crear la nueva URL y navegar
    const newUrl = `${pathname}?${params.toString()}`
    router.push(newUrl)
  }, [selectedAccessTypes, pathname, router, searchParams])

  // Manejar la selección/deselección de tipo de acceso
  const handleToggleAccess = (accessType: string) => {
    setSelectedAccessTypes(prev => {
      if (prev.includes(accessType)) {
        return prev.filter(type => type !== accessType)
      } else {
        return [...prev, accessType]
      }
    })
  }

  // Limpiar todos los tipos de acceso seleccionados
  const handleClearFilter = () => {
    setSelectedAccessTypes([])
  }

  return (
    <div className="access-filter">
      <div className="filter-header">
        <h3>Filtrar por acceso</h3>
        {selectedAccessTypes.length > 0 && (
          <button 
            onClick={handleClearFilter}
            className="clear-filter-button"
          >
            Limpiar filtro
          </button>
        )}
      </div>
      
      <div className="access-filter-options">
        <label className="access-filter-label">
          <input
            type="checkbox"
            checked={selectedAccessTypes.includes('free')}
            onChange={() => handleToggleAccess('free')}
            className="category-filter-checkbox"
          />
          <span className="access-badge free">Gratuito</span>
        </label>
        
        <label className="access-filter-label">
          <input
            type="checkbox"
            checked={selectedAccessTypes.includes('paid')}
            onChange={() => handleToggleAccess('paid')}
            className="category-filter-checkbox"
          />
          <span className="access-badge paid">De pago</span>
        </label>
      </div>
    </div>
  )
} 