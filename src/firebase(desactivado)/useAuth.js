// src/composables/useAuth.js
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
import { useRouter } from 'vue-router'

const user = ref(null)
const userData = ref(null) // Información extendida de la colección 'users'

export function useAuth() {
  onMounted(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      user.value = firebaseUser

      if (firebaseUser) {
        // Buscar info en la colección "users" usando el UID
        const docRef = doc(db, 'users', firebaseUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          userData.value = docSnap.data()
        } else {

          userData.value = null
        }
      } else {
        userData.value = null
      }
      
    })
  })

  const router = useRouter() 

  const logout = async () => {
    await signOut(auth)
    user.value = null
    userData.value = null
    router.push('/')
  }

  return {
    user,       // Info de Firebase Auth (uid, email...)
    userData,   // Info extendida de Firestore (nombre, avatar, etc.)
    logout
  }
}
