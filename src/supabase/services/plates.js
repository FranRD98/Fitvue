// src/supabase/services/plates.js
import { supabase } from '@/supabase/config'

// Obtener todos los platos con los ingredientes completos
export async function getPlates() {
  const { data, error } = await supabase
    .from('plates')
    .select('id, name, items') // Obtienes el id y nombre del plato, y los items (que contienen ingredientId y quantity)
  
  if (error) {
    console.error('Error al obtener platos:', error)
    return []
  }

  // Para cada plato, obtienes los detalles de los ingredientes desde la tabla ingredients
  const platesWithIngredients = await Promise.all(data.map(async (plate) => {
    const ingredientIds = plate.items.map(item => item.ingredientId)
    const { data: ingredients, error: ingredientsError } = await supabase
      .from('ingredients')
      .select('*')
      .in('id', ingredientIds)

    if (ingredientsError) {
      console.error('Error al obtener ingredientes:', ingredientsError)
      return plate
    }

    // Añades los detalles de los ingredientes al plato
    const detailedItems = plate.items.map(item => ({
      ...item,
      ingredient: ingredients.find(ing => ing.id === item.ingredientId)
    }))
    
    return {
      ...plate,
      items: detailedItems
    }
  }))

  return platesWithIngredients
}



// Crear nuevo plato
export async function createPlate(plateData) {
  const { error } = await supabase
    .from('plates')
    .insert([{ ...plateData }]) // Supabase añade automáticamente el `created_at` si lo configuras en la DB

  if (error) throw error
}

// Actualizar plato
export async function updatePlate(id, plateData) {
  const { error } = await supabase
    .from('plates')
    .update(plateData)
    .eq('id', id)

  if (error) throw error
}

// Eliminar plato
export async function deletePlate(id) {
  const { error } = await supabase
    .from('plates')
    .delete()
    .eq('id', id)

  if (error) throw error
}
