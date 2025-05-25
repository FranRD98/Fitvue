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

export async function createUser(userData, token) {
  // Registro en Supabase Auth
  const { data, error: signUpError } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    email_confirm: true
  })

  if (signUpError) throw signUpError

  const userId = data.user?.id

  if (!userId) throw new Error('No se pudo crear el usuario en Auth')

  // Registro en tabla users
  const { error: insertError } = await supabase
    .from('users')
    .insert({
      uid: userId,
      email: userData.email,
      name: userData.name,
      last_name: userData.last_name,
      role: userData.role,
      plan_id: userData.plan_id,
      created_at: new Date().toISOString()
    })

  if (insertError) throw insertError

  return { success: true }
}

// Esto lo dejas como lo tenías para editar
export async function updateUser(id, updatedData) {
  // Asumimos que estás usando Supabase client-side para esto
  const { supabase } = useSupabase(); // o como lo tengas configurado

  const { error } = await supabase
    .from('users')
    .update(updatedData)
    .eq('id', id);

  if (error) throw error;
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

