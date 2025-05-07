import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/config'

const user = ref(null)
const userData = ref(null)
const authError = ref('')

export function useAuth() {
  const router = useRouter()

  // Register
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

    // Insertamos en la tabla personalizada 'users'
    const { error: insertError } = await supabase.from('users').insert([
      {
        uuid: userId,
        email,
        role: 'user',
        ...profile,
        created_at: new Date().toISOString()
      }
    ])

    if (insertError) {
      authError.value = insertError.message
    } else {
      router.push('/dashboard')
    }
  }

  // Login
  const login = async ({ email, password }) => {
    authError.value = ''
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      authError.value = error.message
    } else {
      router.push('/dashboard')
    }
  }

  // Logout
  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    userData.value = null
    router.push('/')
  }

  // 🧠 Obtener usuario actual y sus datos extendidos
  onMounted(async () => {
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

    // Escuchar cambios de sesión
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
    })
  })

  return {
    user,
    userData,
    authError,
    register,
    login,
    logout
  }
}
