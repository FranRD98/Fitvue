import { supabase } from '@/supabase/config'

// Obtener todos los ingredientes
export async function getIngredients(userId) {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('created_by', userId)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error al obtener ingredientes:', error)
    return []
  }

  return data
}

// Obtener datos de un ingrediente
export async function getIngredientById(id) {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('id', id)
    
  if (error) {
    console.error('Error al obtener ingrediente:', error)
    return []
  }

  return data
}

// Crear nuevo ingrediente
export async function createIngredient(data, userId) {
  const { error } = await supabase
    .from('ingredients')
    .insert([{ ...data, created_by: userId }])

  if (error) throw error
}

// Actualizar ingrediente
export async function updateIngredient(id, data) {
  const { error } = await supabase
    .from('ingredients')
    .update(data)
    .eq('id', id)

  if (error) throw error
}

// Eliminar ingrediente
export async function deleteIngredient(id) {
  const { error } = await supabase
    .from('ingredients')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Verifica si un ingrediente está siendo usado en algún plato
export async function isIngredientUsed(ingredientId) {
  const { data, error } = await supabase
    .from('plates')
    .select('id')
    .filter('items', 'cs', JSON.stringify([{ ingredient_id: ingredientId }]))

  if (error) {
    console.error('Error comprobando uso del ingrediente:', error)
    throw error
  }

  return data.length > 0
}

