import { supabase } from '@/supabase/config'

// Obtener todos los usuarios
export async function getUsers() {
  const { data, error } = await supabase.from('users').select('*')
  
  if (error) throw error
  return data
}

export async function createUser(userData, accessToken) {
  const response = await fetch('https://bumjstjctwiokebjwnzn.supabase.co/functions/v1/hyper-service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error creando usuario');
  }

  return response.json();
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
    .eq('id', userId)

  if (error) throw error
}

