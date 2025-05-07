import { supabase } from '@/supabase/config';

// Crear nueva rutina
export async function createRoutine(routineData) {
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

// Obtener categorías de rutinas
export async function getRoutineCategories() {
  const { data, error } = await supabase
    .from('routines_categories')
    .select('*')

  if (error) throw error
  return data
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
export async function assignRoutineToUser(userId, routineId) {
  const { error } = await supabase
    .from('users')
    .update({ assigned_routine: routineId })
    .eq('id', userId)

  if (error) throw error
}

// Obtener rutina asignada actual
export async function getAssignedRoutine(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('assigned_routine')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data.assigned_routine
}

// Quitar rutina asignada
export async function unassignRoutineFromUser(userId) {
  const { error } = await supabase
    .from('users')
    .update({ assigned_routine: null })
    .eq('id', userId)

  if (error) throw error
}
