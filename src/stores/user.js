import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase/config'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const userData = ref(null)
  const authError = ref('')
  const router = useRouter()

  // 📝 Registrar
  const register = async ({ email, password, ...profile }) => {
    authError.value = ''
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signUpError) {
      authError.value = signUpError.message
      return
    }

    const userId = data?.user?.id
    if (!userId) {
      authError.value = 'No se pudo obtener el ID del usuario.'
      return
    }

    const { error: insertError } = await supabase.from('users').insert([{
      uuid: userId,
      email,
      role: 'user',
      ...profile,
      created_at: new Date().toISOString()
    }])

    if (insertError) {
      authError.value = insertError.message
    } else {
      await fetchUserData()
      router.push('/dashboard')
    }
  }

  // 🔐 Login
  const login = async ({ email, password }) => {
    authError.value = ''
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      authError.value = error.message
    } else {
      await fetchUserData()
      router.push('/dashboard')
    }
  }

  // 🚪 Logout
  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    userData.value = null
    router.push('/')
  }

  // 📦 Obtener usuario actual y datos extendidos
  const fetchUserData = async () => {
    const { data: sessionData } = await supabase.auth.getSession()
    user.value = sessionData?.session?.user || null

    if (user.value) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', user.value.id)
        .single()

      if (error) {
        console.error('Error cargando datos del usuario:', error)
      }

      userData.value = data
    }
  }

  // Escuchar cambios de sesión
  const initAuthListener = () => {
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
      if (user.value) fetchUserData()
    })
  }

  return {
    user,
    userData,
    authError,
    register,
    login,
    logout,
    fetchUserData,
    initAuthListener
  }
})
