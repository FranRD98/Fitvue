// src/composables/useAuth.js
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'

const user = ref(null)

export function useAuth() {
  onMounted(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
    })
  })

  return {
    user
  }
}
