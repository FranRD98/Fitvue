// src/supabase/services/plates.js
import { supabase } from '@/supabase/config'

// Obtener todos los platos con los ingredientes completos
export async function getPlates(uid = null) {
  let query = supabase
    .from('plates')
    .select('id, name, items, created_by') // incluye created_by para seguridad
    .order('name', { ascending: true });

  if (uid) {
    query = query.eq('created_by', uid)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error al obtener platos:', error)
    return []
  }

  // Resolver los ingredientes
  const platesWithIngredients = await Promise.all(data.map(async (plate) => {
    const ingredientIds = plate.items.map(item => item.ingredient_id)
    const { data: ingredients, error: ingredientsError } = await supabase
      .from('ingredients')
      .select('*')
      .in('id', ingredientIds)
      .order('name', { ascending: true });

    if (ingredientsError) {
      console.error('Error al obtener ingredientes:', ingredientsError)
      return plate
    }

    const detailedItems = plate.items.map(item => ({
      ...item,
      ingredient: ingredients.find(ing => ing.id === item.ingredient_id)
    }))

    return { ...plate, items: detailedItems }
  }))

  return platesWithIngredients
}

export function getMacros(plate) {
  // Si es un plato con ingredientes
  if (plate?.items?.length > 0 && plate.items[0]?.ingredient) {
    return {
      calories: plate.items.reduce((total, item) => {
        if (!item.ingredient || item.quantity == null) return total
        return total + (parseFloat(item.ingredient.calories || 0) * item.quantity) / 100
      }, 0).toFixed(1),

      protein: plate.items.reduce((total, item) => {
        if (!item.ingredient || item.quantity == null) return total
        return total + (parseFloat(item.ingredient.protein || 0) * item.quantity) / 100
      }, 0).toFixed(1),

      carbs: plate.items.reduce((total, item) => {
        if (!item.ingredient || item.quantity == null) return total
        return total + (parseFloat(item.ingredient.carbs || 0) * item.quantity) / 100
      }, 0).toFixed(1),

      fats: plate.items.reduce((total, item) => {
        if (!item.ingredient || item.quantity == null) return total
        return total + (parseFloat(item.ingredient.fats || 0) * item.quantity) / 100
      }, 0).toFixed(1)
    }
  }

  // Si es un plato simple directo (por macros planos)
  return {
    calories: parseFloat(plate.calories) || 0,
    protein: parseFloat(plate.protein) || 0,
    carbs: parseFloat(plate.carbs) || 0,
    fats: parseFloat(plate.fats) || 0
  }
}


// Crear nuevo plato
export async function createPlate(plateData, userId) {
  const { error } = await supabase
    .from('plates')
    .insert([{ ...plateData, created_by: userId }])

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
