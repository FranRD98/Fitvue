import { supabase } from '@/supabase/config'

// Obtener todas las dietas de un usuario
export async function getDiets(userId) {
  const { data, error } = await supabase
    .from('diets')
    .select('*')
    .eq('user_id', userId) // Asegúrate de que este campo exista
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al obtener las dietas:', error)
    return []
  }

  return data
}

// Obtener rutina asignada del coach
export async function getCoachAssignedDiet(uid) {
  
  // Paso 1: Obtener el ID de la rutina asignada
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('assigned_diet')
    .eq('uid', uid)
    .single()

  if (userError) throw userError

  const dietId = userData.assigned_diet

  if (!dietId) return null // No hay rutina asignada

  // Paso 2: Obtener los datos de la rutina usando ese ID
  const { data: dietData, error: dietError } = await supabase
    .from('diets')
    .select('*')
    .eq('id', dietId)
    .single()

  if (dietError) throw dietError

  return dietData
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
