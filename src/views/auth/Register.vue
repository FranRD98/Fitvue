<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/supabase/useAuth'

const router = useRouter()
const { register, authError } = useAuth()
const email = ref('')
const password = ref('')
const userData = ref({})

onMounted(() => {
  const storedData = localStorage.getItem('userData')
  if (storedData) {
    userData.value = JSON.parse(storedData)
  }
})

const registerUser = async () => {
  const { error } = await register({
    email: email.value,
    password: password.value,
    ...userData.value
  })

  if (!error) {
    localStorage.removeItem('userData')
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-[70vh] justify-center overflow-hidden">
    <!-- Columna izquierda (formulario) -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-white px-6 sm:px-10 md:px-20 pt-10 pb-6 md:py-0">
      <div class="w-full max-w-md space-y-8">
        
        <!-- Branding -->
        <div class="mt-4 md:mt-0">
          <h1 class="text-5xl md:text-7xl font-extrabold leading-none">
            <span>fit</span><span class="text-[var(--color-primary)]">VUE</span>
          </h1>
        </div>

        <!-- Título -->
        <div class="pt-4 md:pt-0">
          <h2 class="text-3xl sm:text-4xl font-bold text-[var(--color-primary)]">Crear cuenta</h2>
          <p class="text-sm text-gray-500 mt-1">Únete a FitVue y empieza tu transformación.</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="registerUser" class="space-y-4">
          <div>
            <label class="block text-sm text-[var(--color-secondary)] mb-1">Correo electrónico</label>
            <input
              v-model="email"
              type="email"
              placeholder="tucorreo@example.com"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          <div>
            <label class="block text-sm text-[var(--color-secondary)] mb-1">Contraseña</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          <p v-if="authError" class="text-red-500 text-sm">{{ authError.message }}</p>

          <button
            type="submit"
            class="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold py-2 rounded-lg transition"
          >
            Registrarse
          </button>
        </form>

        <!-- Enlace a login -->
        <p class="text-sm text-center text-[var(--color-text)] pt-4">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="text-[var(--color-primary)] hover:underline">Inicia sesión</router-link>
        </p>
      </div>
    </div>

    <!-- Columna derecha (mockup) -->
    <div class="hidden md:block md:w-1/2 bg-gray-100">
      <img
        src="https://placehold.co/800x800?text=Vista+FitVue"
        alt="Vista previa"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>
