import { supabase } from '@/supabase'

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
      uid: user.id,
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
