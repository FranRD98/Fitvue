// src/supabase/services/guides.js
import { supabase } from '@/supabase/config'

// Crear guía
export async function createGuide(guideData) {
  const { error } = await supabase
    .from('guides')
    .insert([{ ...guideData }])

  if (error) throw error
}

// Obtener todas las guías
export async function getGuides() {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .order('created_at', { ascending: false }) // Solo si usas campo 'created'

  if (error) {
    console.error('Error al obtener guías:', error)
    return []
  }

  return data
}

// Obtener guía por id
export async function getGuidesById(guideId) {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('id', guideId)
    .single()

  if (error) {
    console.error('Error al obtener la guía:', error)
    return []
  }

  return data
}


// Crear nueva categoría
export async function createCategory(title) {
  const { data, error } = await supabase
    .from('guides_categories')
    .insert([{ title }])
    .select()

  if (error) throw error
  return data?.[0]
}

// Obtener categorías
export async function getCategories() {
  const { data, error } = await supabase
    .from('guides_categories')
    .select('*')

  if (error) {
    console.error('Error al obtener categorías:', error)
    return []
  }

  return data
}

// Actualizar guía
export async function updateGuide(id, guideData) {
  const { id: _, created, ...cleanData } = guideData

  // Asegurar que el campo id_category sea numérico
  if (cleanData.id_category && typeof cleanData.id_category === 'string') {
    cleanData.id_category = parseInt(cleanData.id_category)
  }

  const { error } = await supabase
    .from('guides')
    .update(cleanData)
    .eq('id', id)

  if (error) throw error
}


// Eliminar guía
export async function deleteGuide(id) {
  const { error } = await supabase
    .from('guides')
    .delete()
    .eq('id', id)

  if (error) throw error
}
