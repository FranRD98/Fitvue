import { supabase } from '@/supabase/config';

// Crear nueva rutina
export async function createRoutine(routineData ) {
  const { data, error } = await supabase
    .from('routines')
    .insert([{ ...routineData }])
    .select()
    .single()

  if (error) throw error
  return data
}

// Obtener todas las rutinas
export async function getRoutines() {
  const { data, error } = await supabase
    .from('routines')
    .select('*')

  if (error) throw error
  return data
}

export async function getRoutinesByUser(uid) {
  const { data, error } = await supabase
    .from('routines')
    .select('*')
    .eq('user_id', uid)

  if (error) throw error
  return data
}

// Obtener categorías de rutinas
export async function getRoutineCategories() {
  const { data, error } = await supabase
    .from('routines_categories')
    .select('*')

  if (error) throw error
  return data
}

export async function getRoutineById(id) {
  const { data, error } = await supabase
    .from('routines')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}


// Obtener rutina asignada actual
export async function getAssignedRoutine(uid) {
  
  // Paso 1: Obtener el ID de la rutina asignada
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('assigned_routine')
    .eq('uid', uid)
    .single()

  if (userError) throw userError

  const routineId = userData.assigned_routine
  if (!routineId) return null // No hay rutina asignada

  // Paso 2: Obtener los datos de la rutina usando ese ID
  const { data: routineData, error: routineError } = await supabase
    .from('routines')
    .select('*') // Podés ajustar si solo querés ciertos campos
    .eq('id', routineId)
    .single()

  if (routineError) throw routineError

  return routineData
}

// Actualizar una rutina existente
export async function updateRoutine(id, routineData) {
    // Asegúrate de que 'routineData.days' es un array de objetos válidos
    console.log('Actualizando rutina con los siguientes datos:', JSON.stringify(routineData));
  
    const { data, error } = await supabase
      .from('routines')
      .update({
        title: routineData.title,
        description: routineData.description,
        id_category: routineData.id_category,
        days: routineData.days,  // No necesitas convertirlo a string si ya es un array de objetos
        updated_at: new Date()
      })
      .eq('id', id)
      .select();
  
    if (error) {
      console.error('Error al actualizar rutina:', error);
      throw error;
    }
  
    console.log('Rutina actualizada correctamente:', data);
  }
  
  

// Asignar rutina a usuario
export async function assignRoutineToUser(uid, routineId) {
  const { error } = await supabase
    .from('users')
    .update({ assigned_routine: routineId })
    .eq('uid', uid)

  if (error) throw error
}

// Quitar rutina asignada
export async function unassignRoutineFromUser(uid) {
  const { error } = await supabase
    .from('users')
    .update({ assigned_routine: null })
    .eq('uid', uid)

  if (error) throw error
}
