import { supabase } from '@/supabase/config';

// Obtener todos los ejercicios
export async function getExercises(userId) {
  if (!userId) {
    console.error('Falta el userId en getExercises()')
    return []
  }

  // 1. Obtener todos los admin uids
  const { data: adminUsers, error: adminError } = await supabase
    .from('users')
    .select('uid')
    .eq('role', 'admin')

  if (adminError) {
    console.error('Error al obtener usuarios admin:', adminError)
    return []
  }

  const adminIds = adminUsers.map(user => user.uid)

  // 2. Asegurarse de que userId está en la lista
  const allowedIds = Array.from(new Set([userId, ...adminIds]))

  // 3. Obtener los ejercicios de esos IDs
  const { data, error } = await supabase
    .from('exercises')
    .select(`
      *,
      exercises_categories (category_name)
    `)
    .in('created_by', allowedIds)

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
  const { name, description, id_category, imageUrl } = exerciseData;

  const { data, error } = await supabase
    .from('exercises')  // Asegúrate de que 'exercises' sea el nombre correcto de la tabla
    .update({
      name,
      description,
      id_category,
      image_url: imageUrl,  // Actualiza la URL de la imagen
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
