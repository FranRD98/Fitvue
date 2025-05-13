// src/supabase/services/ingredients.js
import { supabase } from '@/supabase/config'

// Obtener todos los ingredientes
export async function getIngredients() {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .order('created_at', { ascending: false }) // opcional

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
export async function createIngredient(data) {
  const { error } = await supabase
    .from('ingredients')
    .insert([{ ...data }])

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
