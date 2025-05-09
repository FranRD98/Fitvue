// src/supabase/services/habits.js
import { supabase } from '@/supabase/config'

// Obtener hábitos
export async function getHabits() {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al obtener los hábitos:', error)
    return []
  }

  return data
}

// Crear un hábito
export async function createHabit(habit) {
    console.log('Creando habito')
  const { error } = await supabase
    .from('habits')
    .insert([habit])

  if (error) throw error
}

// Marcar hábito como completado / no completado
export async function toggleHabitCompletion(habitId, completed) {
  const { error } = await supabase
    .from('habits')
    .update({ completed })
    .eq('id', habitId)

  if (error) throw error
}

// Eliminar hábito
export async function deleteHabit(habitId) {
  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', habitId)

  if (error) throw error
}
