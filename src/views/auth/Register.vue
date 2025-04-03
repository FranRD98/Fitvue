<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

const router = useRouter()
const userData = ref({})
const error = ref('')
const email = ref('')
const password = ref('')

onMounted(() => {
  const storedData = localStorage.getItem('userData')
  if (storedData) {
    userData.value = JSON.parse(storedData)
  }
})

const registerUser = async () => {
  try {
    // Crear usuario en Firebase Auth
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)

    // Guardar en Firestore (colección "users")
    await setDoc(doc(db, 'users', cred.user.uid), {
      ...userData.value,
      email: email.value,
      role: 'user',
      created: serverTimestamp()
    })

    router.push('/dashboard') // Redirigir a dashboard o lo que prefieras
  } catch (err) {
    error.value = err.message
  }
}
</script>


<template>
  <div class="flex items-center justify-center min-h-screen bg-[var(--color-bg-light)]">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-[var(--color-primary)]">Registrarse</h2>
      
      <form @submit.prevent="login" class="mt-6">
        <div class="mb-4">
          <label class="block text-[var(--color-secondary)]">Correo electrónico</label>
          <input v-model="email" type="email" 
            class="w-full px-4 py-2 mt-2 border border-[var(--color-accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" 
            placeholder="tucorreo@example.com">
        </div>

        <div class="mb-4">
          <label class="block text-[var(--color-secondary)]">Contraseña</label>
          <input v-model="password" type="password" 
            class="w-full px-4 py-2 mt-2 border border-[var(--color-accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" 
            placeholder="••••••••">
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button 
        type="submit" 
        @click="registerUser" class="w-full px-4 py-2 mt-4 text-[var(--color-text-dark)] bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] transition">
          Registrarse
        </button>
      </form>

      <p class="mt-4 text-sm text-center text-[var(--color-text)]">
        ¿No tienes cuenta? <a href="/empezar" class="text-[var(--color-accent)] hover:underline">Consigue tu cambio ya</a>
      </p>
    </div>
  </div>
</template>