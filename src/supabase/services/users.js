import { supabase } from '@/supabase/config'

// Obtener todos los usuarios
export async function getUsers() {
  const { data, error } = await supabase.from('users').select('*')
  if (error) throw error
  return data
}

// Crear usuario (Auth + Tabla users)
export async function createUser({ email, password, ...profile }) {
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (authError) throw authError

  const { user } = authData

  const { error: insertError } = await supabase.from('users').insert([
    {
      id: user.id,
      email,
      ...profile,
      created_at: new Date().toISOString()
    }
  ])

  if (insertError) throw insertError
}

// Actualizar usuario
export async function updateUser(uid, userData) {
  const { error } = await supabase
    .from('users')
    .update(userData)
    .eq('uid', uid)

  if (error) throw error
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
    .eq('id', userId)

  if (error) throw error
}

