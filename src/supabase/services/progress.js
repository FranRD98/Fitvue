// src/supabase/services/progress.js
import { supabase } from '@/supabase/config'

// Crear una revisión
export async function createReview(data) {
  const { error } = await supabase
    .from('progress')
    .insert([data])

  if (error) throw error
}

// Actualizar una revisión
export async function updateReview(id, updatedData) {
  const { error } = await supabase
    .from('progress')
    .update(updatedData)
    .eq('id', id)

  if (error) throw error
}

// Eliminar una revisión
export async function deleteReview(id) {
  const { error } = await supabase
    .from('progress')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Obtener todas las revisiones por uid
export async function getReviewsById(userId) {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Obtener una revisión por uid y fecha
export async function getReviewById(uid, reviewId) {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', uid)
    .eq('id', reviewId)
    .limit(1)

  if (error) {
    console.error('Error al obtener revisión por UID y fecha:', error)
    return null
  }

  return data?.[0] || null
}
