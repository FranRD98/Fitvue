import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/config'

const user = ref(null)
const userData = ref(null)

export function useAuth() {
  const router = useRouter()

  onMounted(async () => {
    const { data: sessionData } = await supabase.auth.getSession()
    user.value = sessionData?.session?.user || null

    console.log(user)
    if (user.value) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', user.value.id)
        .single()

      userData.value = data || null
    } else {
      userData.value = null
      console.log('Error con el usuario')
    }

    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null
    })
  })

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    userData.value = null
    router.push('/')
  }

  return {
    user,
    userData,
    logout
  }
}
