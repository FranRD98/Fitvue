// src/supabase/services/plates.js
import { supabase } from '@/supabase/config'

// Obtener todos los platos
export async function getPlates() {
  const { data, error } = await supabase
    .from('plates')
    .select('*')
    .order('created_at', { ascending: false }) // Opcional, si tienes un campo `created`

  if (error) {
    console.error('Error al obtener platos:', error)
    return []
  }

  return data
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
