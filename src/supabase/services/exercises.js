// services/exercises.js
import { supabase } from '@/supabase/config'; // Asegúrate de que esta es la correcta

// Obtener todos los ejercicios
export async function getExercises() {
    const { data, error } = await supabase
      .from('exercises')  // Asegúrate de que 'exercises' esté correctamente escrito en minúsculas
      .select('*');  // Seleccionamos todos los campos de la tabla
  
    if (error) {
      console.error('Error al obtener los ejercicios:', error);
      return [];  // En caso de error, devolver un array vacío
    }
  
    console.log('Ejercicios obtenidos:', data);  // Esto debería imprimir los ejercicios en la consola
  
    return data;  // Retorna los ejercicios
  }

// Obtener categorías de ejercicios
export async function getExerciseCategories() {
  const { data, error } = await supabase
    .from('exercises_categories')
    .select('*');

  if (error) {
    console.error('Error obteniendo categorías de ejercicios:', error);
    throw error;
  }

  return data; // Devuelve las categorías
}

// Eliminar un ejercicio
export async function deleteExercise(exerciseId) {
  const { data, error } = await supabase
    .from('exercises')
    .delete()
    .match({ id: exerciseId });

  if (error) {
    console.error('Error eliminando ejercicio:', error);
    throw error;
  }

  return data; // Si es necesario, devuelve algún resultado después de eliminar
}
