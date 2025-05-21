"use server";

import { getAllCategories } from './services/category.service';

export interface CategoryOption {
  id: string;
  name: string;
}

export async function getCategories(): Promise<CategoryOption[]> {
  try {
    const { data: categories, error } = await getAllCategories();
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    // Ensure we have valid categories before mapping
    if (!categories || !Array.isArray(categories)) {
      console.error('Invalid categories data received:', categories);
      return [];
    }
    
    // Map the categories to the expected format
    return categories.map(cat => ({
      id: cat.id,
      name: cat.name || 'Unnamed Category'
    }));
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}
