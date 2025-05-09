// src/supabase/services/diets.js
import { supabase } from '@/supabase/config'

// Obtener todas las dietas
export async function getDiets() {
  const { data, error } = await supabase
    .from('diets')
    .select('*')
    .order('created_at', { ascending: false }) // Si tienes un campo de timestamp

  if (error) {
    console.error('Error al obtener las dietas:', error)
    return []
  }

  return data
}

// Crear nueva dieta
export async function createDiet(data) {
  const { data: insertedData, error } = await supabase
    .from('diets')
    .insert([{ ...data }])
    .select() // Para devolver el objeto insertado

  if (error) throw error
  return insertedData?.[0]
}

// Actualizar dieta
export async function updateDiet(id, data) {
  const { error } = await supabase
    .from('diets')
    .update(data)
    .eq('id', id)

  if (error) throw error
}

// Eliminar dieta
export async function deleteDiet(id) {
  const { error } = await supabase
    .from('diets')
    .delete()
    .eq('id', id)

  if (error) throw error
}
