import { supabase } from '@/supabase/config';

// Obtener todos los ejercicios
export async function getExercises(userId) {
  const { data: adminUsers } = await supabase
    .from('users')
    .select('uid')
    .eq('role', 'admin')

  const adminIds = (adminUsers || []).map(u => u.uid)

  const { data, error } = await supabase
    .from('exercises')
    .select(`
      *,
      exercises_categories (category_name)
    `)
    .in('created_by', [userId, ...adminIds])
    .order('name', { ascending: true });


  if (error) {
    console.error('Error al obtener los ejercicios:', error)
    return []
  }

  return data
}

export async function getExerciseById(id) {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Obtener categorías de ejercicios
export async function getExerciseCategories() {
  const { data, error } = await supabase
    .from('exercises_categories')
    .select('*')
    .order('category_name', { ascending: true });

  if (error) {
    console.error('Error obteniendo categorías de ejercicios:', error);
    throw error;
  }

  return data; // Devuelve las categorías
}

// Crear ejercicio
export async function createExercise(exerciseData) {
  const { name, description, id_category, image, created_by } = exerciseData;

  const { data, error } = await supabase
    .from('exercises')
    .insert([
      {
        name,
        description,
        id_category,
        image,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by
      }
    ]);

  if (error) {
    console.error('Error creando ejercicio:', error);
    throw error;
  }

  return data;
}


// Actualizar ejercicio
export async function updateExercise(exerciseId, exerciseData) {
  const { name, description, id_category, image_url } = exerciseData;

  const { data, error } = await supabase
    .from('exercises')  // Asegúrate de que 'exercises' sea el nombre correcto de la tabla
    .update({
      name,
      description,
      id_category,
      image_url: image_url,  // Actualiza la URL de la imagen
      updated_at: new Date().toISOString()
    })
    .eq('id', exerciseId);  // Filtra por el ID del ejercicio

  if (error) {
    console.error('Error actualizando ejercicio:', error);
    throw error;
  }

  return data;  // Retorna los datos actualizados
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

export async function getLastExerciseProgress(exerciseId, userId) {
  const { data, error } = await supabase
    .from('exercises_progress')
    .select('sets, created_at')
    .eq('user_id', userId)
    .eq('exercise_id', exerciseId)
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    console.error(error)
    return null
  }

  return data?.[0] || null
}

export async function saveExerciseProgress(userId, routineId, day, exerciseInputs) {
  const date = new Date().toISOString()
  const progressEntries = []

  for (const exercise of exerciseInputs) {
    if (!exercise.exerciseId || !exercise.sets?.length) continue

    progressEntries.push({
      user_id: userId,
      id_routine: routineId,
      exercise_id: String(exercise.exerciseId), // ⚠️ Aseguramos que sea string
      exercise_name: exercise.name,
      day,
      sets: exercise.sets, // JSON con peso y reps
      created_at: date
    })
  }

  console.log('📦 Datos a guardar:', progressEntries)

  if (!progressEntries.length) {
    console.warn('No hay sets válidos para guardar.')
    return
  }

  const { error } = await supabase
    .from('exercises_progress')
    .insert(progressEntries)

  if (error) {
    console.error('❌ Error al guardar en Supabase:', error)
    throw error
  }
}


export async function getExerciseHistory(exerciseId, userId) {
  const { data, error } = await supabase
    .from('exercises_progress')
    .select('created_at, sets')
    .eq('exercise_id', exerciseId)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener el historial de ejercicios:', error);
    return [];
  }

  return data;
}