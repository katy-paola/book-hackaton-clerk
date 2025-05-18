'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import CategorySelector from './CategorySelector'
import { Tables } from '@/types/database.types'

type CategoryRow = Tables<'categories'>

export default function CategorySelectorWrapper({ 
  onChange,
  selectedIds = []
}: { 
  onChange: (selectedIds: string[]) => void,
  selectedIds?: string[]
}) {
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [loading, setLoading] = useState(true)
  
  // Cargar categorías
  useEffect(() => {
    async function fetchCategories() {
      try {
        // Crear cliente de Supabase para el lado del cliente
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        const { data, error } = await supabase.from('categories').select('*')
        
        if (error) throw error
        
        console.log("Categorías cargadas desde el cliente:", data)
        setCategories(data || [])
      } catch (error) {
        console.error('Error al cargar categorías:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])
  
  // Inicializar el onChange con las categorías seleccionadas
  useEffect(() => {
    if (selectedIds.length > 0) {
      onChange(selectedIds);
    }
  }, [selectedIds, onChange]);
  
  if (loading) {
    return <p>Cargando categorías...</p>
  }
  
  return <CategorySelector 
    categories={categories} 
    onChange={onChange}
    initialSelectedIds={selectedIds}
  />
} 