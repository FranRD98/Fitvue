<script setup>
import { ref, onMounted, computed } from 'vue'
import { getRoutines } from '@/firebase/routines.js'
import { useAuth } from '@/firebase/useAuth'


const { user, role } = useAuth() // <- Aquí recuperamos el rol
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
        class="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
      >
        + Nueva rutina
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
