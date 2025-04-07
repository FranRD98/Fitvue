<script setup>
import { ref, onMounted, computed } from 'vue'
import { getRoutines } from '@/firebase/routines.js'
import { useAuth } from '@/firebase/useAuth' // Get info about logued user

const { userData } = useAuth(); // Get information to obtain the rol and show the add button or no

const rutinas = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    rutinas.value = await obtenerRutinas()
  } catch (error) {
    console.error('Error cargando rutinas', error)
  } finally {
    loading.value = false
  }
})

const isAdmin = true;
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-[var(--color-primary)]">Rutinas</h1>
      <router-link
        v-if="isAdmin"
        to="/dashboard/rutinas/nueva"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva rutina
      </router-link>
    </div>

    <div v-if="loading">Cargando rutinas...</div>
    <div v-else-if="rutinas.length === 0">No hay rutinas aún.</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="rutina in rutinas"
        :key="rutina.id"
        class="bg-white shadow rounded-lg p-4 hover:shadow-md transition"
      >
        <h3 class="text-lg font-semibold text-[var(--color-primary)]">{{ rutina.title }}</h3>
        <p class="text-sm text-gray-500 mt-2">{{ rutina.description }}</p>

        <div class="mt-4">
          <router-link :to="`/rutinas/${rutina.id}`" class="text-[var(--color-accent)] font-medium">
            Ver rutina →
          </router-link>
          <router-link
            v-if="isAdmin"
            :to="`/dashboard/rutinas/editar/${rutina.id}`"
            class="ml-4 text-sm text-gray-400 hover:text-[var(--color-primary)]"
          >
            Editar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
