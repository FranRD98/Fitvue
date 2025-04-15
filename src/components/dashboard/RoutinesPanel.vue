<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  getRoutines,
  assignRoutineToUser,
  getAssignedRoutine,
  unassignRoutineFromUser
} from '@/firebase/routines.js'
import RoutineFormModal from '@/components/dashboard/modals/RoutineFormModal.vue'

const routines = ref([])
const loading = ref(true)
const showModal = ref(false)
const selectedRoutine = ref(null)
const assignedRoutineId = ref(null)
const currentUserId = ref('uid_del_usuario') // Reemplazar con el UID actual del usuario

const loadRoutines = async () => {
  loading.value = true
  try {
    routines.value = await getRoutines()
    assignedRoutineId.value = await getAssignedRoutine(currentUserId.value)
  } catch (error) {
    console.error('Error al cargar rutinas:', error)
  } finally {
    loading.value = false
  }
}

const openEditModal = (routine) => {
  selectedRoutine.value = routine
  showModal.value = true
}

const countExercises = (routine) => {
  return routine.days?.reduce((acc, day) => acc + (day.exercises?.length || 0), 0)
}

const handleAssign = async (routineId) => {
  if (assignedRoutineId.value && assignedRoutineId.value !== routineId) {
    const confirmChange = confirm('Este usuario ya tiene una rutina asignada. ¿Deseas reemplazarla?')
    if (!confirmChange) return
  }

  await assignRoutineToUser(currentUserId.value, routineId)
  assignedRoutineId.value = routineId
  alert('Rutina asignada correctamente.')
}

const handleUnassign = async () => {
  await unassignRoutineFromUser(currentUserId.value)
  assignedRoutineId.value = null
  alert('Rutina desasignada correctamente.')
}

onMounted(loadRoutines)
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Rutinas</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva rutina
      </button>
    </div>

    <RoutineFormModal
      :show="showModal"
      :initialData="selectedRoutine"
      @close="showModal = false; selectedRoutine = null"
      @saved="loadRoutines"
    />

    <div v-if="loading">Cargando rutinas...</div>
    <div v-else-if="routines.length === 0" class="text-gray-500">No hay rutinas disponibles.</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="routine in routines"
        :key="routine.id"
        class="bg-white shadow rounded-xl overflow-hidden flex flex-col hover:shadow-md transition"
      >
        <img
          :src="`https://placehold.co/600x300?text=${encodeURIComponent(routine.title)}`"
          alt="rutina"
          class="w-full h-40 object-cover"
        />
        <div class="p-5 flex flex-col flex-grow">
          <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-1">{{ routine.title }}</h3>
          <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ routine.description }}</p>
          <p class="text-xs text-gray-500 mt-auto">Ejercicios totales: {{ countExercises(routine) }}</p>

          <div class="mt-4 flex justify-between items-center">
            <button
              @click="openEditModal(routine)"
              class="text-xs text-blue-600 hover:underline"
            >
              ✏️ Editar
            </button>

            <button
              v-if="assignedRoutineId === routine.id"
              disabled
              class="text-xs bg-green-600 text-white px-3 py-1 rounded cursor-default"
            >
              ✅ Asignada
            </button>
            <button
              v-else
              @click="handleAssign(routine.id)"
              class="text-xs bg-[var(--color-primary)] text-white px-3 py-1 rounded hover:bg-[var(--color-secondary)]"
            >
              Asignar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón para desasignar -->
    <div v-if="assignedRoutineId" class="text-right mt-8">
      <button
        @click="handleUnassign"
        class="text-sm text-red-600 underline hover:text-red-800"
      >
        ❌ Desasignar rutina
      </button>
    </div>
  </section>
</template>
