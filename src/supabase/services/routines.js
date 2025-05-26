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

// Obtener todas las rutinas, opcionalmente filtradas
export async function getRoutines(category) {
  let query

  if (category && category !== '') {
    query = supabase.from('routines').select('*').eq('id_category', category)
  } else {
    query = supabase.from('routines').select('*')
  }

  const { data, error } = await query

  if (error) throw error
  
  return data
}

// Obtener solo rutinas publicadas
export async function getPublishedRoutines() {
  const { data, error } = await supabase
    .from('routines')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false }) // opcional si tenés campo de fecha

  if (error) {
    console.error('Error al obtener rutinas publicadas:', error)
    return []
  }

  return data
}

// Obtener categorias de rutinas publicadas
export async function getPublishedRoutineCategoriesInUse() {
  // 1. Obtener las rutinas publicadas
  const { data: routines, error: routineError } = await supabase
    .from('routines')
    .select('id_category')
    .eq('published', true)

  if (routineError) {
    console.error('Error al obtener rutinas publicadas:', routineError)
    return []
  }

  const categoryIds = [...new Set(routines.map(r => r.id_category))] // IDs únicos

  if (categoryIds.length === 0) return []

  // 2. Obtener las categorías que están en uso (sin depender de que estén publicadas)
  const { data: categories, error: catError } = await supabase
    .from('routines_categories')
    .select('*')
    .in('id', categoryIds)

  if (catError) {
    console.error('Error al obtener categorías en uso:', catError)
    return []
  }

  // 3. Cargar iconos o usar uno por defecto
  const categoriesWithIcons = await Promise.all(
    categories.map(async (category) => {
      if (!category.icon_path) {
        category.icon_path = '/icons/default-icon.svg'
        return category
      }

      const { data: imageData, error: imageError } = await supabase
        .storage
        .from('fitvue')
        .getPublicUrl(category.icon_path)

      category.icon_path = imageError
        ? '/icons/default-icon.svg'
        : imageData.publicUrl

      return category
    })
  )

  return categoriesWithIcons
}

export async function getRoutinesByUser(uid) {
  const { data, error } = await supabase.from('routines').select('*').eq('user_id', uid)

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
export async function getAssignedRoutine(routineId) {
  
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
  
    const { data, error } = await supabase
      .from('routines')
      .update({
        title: routineData.title,
        description: routineData.description,
        id_category: routineData.id_category,
        days: routineData.days,
        published: routineData.published,
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
  
// Crear nueva categoría de rutina (evita duplicados)
export async function createRoutineCategory(title) {
  // 1. Comprobamos si ya existe una categoría con el mismo título (ignorando mayúsculas/minúsculas)
  const { data: existing, error: checkError } = await supabase
    .from('routines_categories')
    .select('*')
    .ilike('title', title) // comparación case-insensitive

  if (checkError) throw checkError

  if (existing && existing.length > 0) {
    // Si ya existe, devolvemos la existente (opcionalmente podrías lanzar un error en lugar de esto)
    return existing[0]
  }

  // 2. Insertar nueva categoría
  const { data, error } = await supabase
    .from('routines_categories')
    .insert([{ title }])
    .select()
    .single()

  if (error) throw error
  return data
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
