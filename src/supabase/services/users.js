import { supabase } from '@/supabase/config'

// Obtener todos los usuarios y si es coach solo los que le pertenecen
export async function getUsers(coachUid = null) {
  let query = supabase.from('users').select('*')

  if (coachUid) {
    query = query.eq('coach_uid', coachUid)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

// Obtener todos los usuarios con rol "coach"
export async function getAllCoaches() {
  const { data, error } = await supabase
    .from('users')
    .select('uid, name, last_name, email')
    .eq('role', 'coach')

  if (error) throw error
  return data
}

// Crear usuario desde panel de coach
export async function createUserByCoach(userData, token) {
  try {
    const response = await fetch('https://bumjstjctwiokebjwnzn.supabase.co/functions/v1/create_user_by_coach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })

    const result = await response.json()

    if (!response.ok) throw new Error(result.error || 'Error al crear usuario')

    return result
  } catch (error) {
    console.error('Error en createUserByCoach:', error.message)
    throw error
  }
}

// Actualizar datos de users
export async function updateUser(uid, userData) {
  // 1. Si hay cambios en el email o la contraseña → actualizar en Auth
  if (userData.email || userData.password) {
    const authUpdatePayload = {}

    if (userData.email) authUpdatePayload.email = userData.email
    if (userData.password) authUpdatePayload.password = userData.password

    const { error: authError } = await supabase.auth.admin.updateUserById(uid, authUpdatePayload)
    if (authError) throw authError
  }

  // 2. Actualizar en la tabla `users` (sin la contraseña)
  const {
    password,
    ...rest
  } = userData

  const { error: dbError } = await supabase
    .from('users')
    .update(rest)
    .eq('uid', uid)

  if (dbError) throw dbError

  return { success: true }
}

// Eliminar usuario
export async function deleteUser(uid) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('uid', uid)

  if (error) throw error
}

/* USERS PROFILE*/
export async function uploadProfileImage(file, userId) {
  // Crear el nombre del archivo, concatenando el userId y la fecha actual
  const fileName = `icons/profile-images/${userId}_${Date.now()}.${file.name.split('.').pop()}`

  // Subir la imagen al bucket 'fitvue', en la carpeta 'icons/profile-images'
  const { error: uploadError } = await supabase.storage
    .from('fitvue')  // El bucket 'fitvue'
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true  // Permite reemplazar el archivo si ya existe
    })

  // Si hay algún error al subir la imagen, lanzamos el error
  if (uploadError) throw uploadError

  // Obtener la URL pública del archivo recién subido
  const { data } = supabase.storage
    .from('fitvue')  // El bucket 'fitvue'
    .getPublicUrl(fileName)

  // Devolver la URL pública del archivo
  return data.publicUrl
}

export async function updateUserData(userId, updates) {
  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('uid', userId)

  if (error) throw error
}

