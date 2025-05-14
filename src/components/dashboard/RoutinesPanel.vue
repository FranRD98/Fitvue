<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'  // Importamos el store de Pinia
import {
  getRoutinesByUser,
  assignRoutineToUser,
  getAssignedRoutine,
  unassignRoutineFromUser
} from '@/supabase/services/routines.js'

import RoutineFormModal from '@/components/dashboard/modals/RoutineFormModal.vue'

// Icons
import { IconPlus, IconLayoutGrid, IconLayoutList } from '@tabler/icons-vue'

const userStore = useUserStore()  // Usamos el store de usuario
const routines = ref([])
const loading = ref(true)
const showModal = ref(false)
const selectedRoutine = ref(null)
const assignedRoutine = ref(null)
const assignedRoutineId = ref(null)
const viewMode = ref('grid')
const searchQuery = ref('')

const filteredRoutines = computed(() =>
  routines.value.filter(routine =>
    routine.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const loadRoutines = async () => {
  loading.value = true
  try {
    routines.value = await getRoutinesByUser(userStore.userData?.uid)
    assignedRoutine.value = await getAssignedRoutine(userStore.userData?.uid)
    assignedRoutineId.value = assignedRoutine.value?.id || null
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

/* Assign routine to user */
const handleAssign = async (routineId) => {
  if (assignedRoutineId.value && assignedRoutineId.value !== routineId) {
    const confirmChange = confirm('Este usuario ya tiene una rutina asignada. ¿Deseas reemplazarla?')
    if (!confirmChange) return
  }

  await assignRoutineToUser(userStore.userData?.uid, routineId)
  assignedRoutineId.value = routineId
  alert('Rutina asignada correctamente.')
}

/* Unassign routine to user */
const handleUnassign = async () => {
  await unassignRoutineFromUser(userStore.userData?.uid)
  assignedRoutineId.value = null
  alert('Rutina desasignada correctamente.')
}

onMounted(loadRoutines)
</script>


<template>
  <section>
    <!-- Encabezado -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Rutinas</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <IconPlus class="w-5 h-5" />
        Nueva rutina
      </button>
    </div>

    <RoutineFormModal
      :show="showModal"
      :initialData="selectedRoutine"
      @close="showModal = false; selectedRoutine = null"
      @saved="loadRoutines"
    />

    <!-- Loading -->
    <div v-if="loading">Cargando rutinas...</div>

    <!-- Buscador y vista -->
    <div v-else>
      <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Buscar rutina</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Nombre de la rutina..."
            class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
          />
        </div>
        <div class="flex items-center gap-1">
          <button
            @click="viewMode = 'grid'"
            :class="['p-2 rounded', viewMode === 'grid' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200']"
            title="Vista de tarjetas"
          >
            <IconLayoutGrid />
          </button>
          <button
            @click="viewMode = 'table'"
            :class="['p-2 rounded', viewMode === 'table' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200']"
            title="Vista de tabla"
          >
            <IconLayoutList />
          </button>
        </div>
      </div>

      <!-- Vista Grid -->
      <div v-if="viewMode === 'grid' && filteredRoutines.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="routine in filteredRoutines"
          :key="routine.id"
          class="bg-white shadow rounded-xl overflow-hidden flex flex-col hover:shadow-md transition cursor-pointer justify-between"
          @click="openEditModal(routine)"
        >
          <div class="p-5 flex flex-col flex-grow">
            <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-1">{{ routine.title }}</h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ routine.description }}</p>
            <p class="text-xs text-gray-500 mt-auto">Ejercicios totales: {{ countExercises(routine) }}</p>

            <div class="mt-4 flex justify-end">
              <label class="relative inline-flex items-center cursor-pointer" @click.stop>
                <input
                  type="checkbox"
                  class="sr-only peer"
                  :checked="assignedRoutineId === routine.id"
                  @change="($event) => {
                    if ($event.target.checked) {
                      handleAssign(routine.id)
                    } else {
                      handleUnassign()
                    }
                  }"
                />
                <div
                  class="group peer bg-white rounded-full duration-300 w-12 h-6 ring-2 ring-[var(--color-primary)]
                    after:transition-transform after:duration-300 after:bg-[var(--color-primary)]
                    peer-checked:after:bg-green-500 peer-checked:ring-green-500
                    after:rounded-full after:absolute after:h-4 after:w-4 after:top-1 after:left-1
                    after:content-[''] peer-checked:after:translate-x-6 peer-hover:after:scale-95"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Vista Tabla -->
      <table v-else-if="viewMode === 'table' && filteredRoutines.length" class="w-full text-left text-sm">
        <thead class="bg-gray-200 text-gray-600 font-medium">
          <tr>
            <th class="py-3 px-2">Nombre</th>
            <th class="px-2">Descripción</th>
            <th class="px-2">Ejercicios</th>
            <th class="px-2 text-right">Asignar</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="routine in filteredRoutines"
            :key="routine.id"
            @click="openEditModal(routine)"
            class="border-t border-gray-200 hover:bg-gray-100 transition cursor-pointer"
          >
            <td class="py-3 px-2 font-semibold text-[var(--color-primary)]">{{ routine.title }}</td>
            <td class="py-3 px-2 text-gray-600 line-clamp-2">{{ routine.description }}</td>
            <td class="py-3 px-2">{{ countExercises(routine) }}</td>
            <td class="py-3 px-2 text-right">
              <label class="relative inline-flex items-center cursor-pointer" @click.stop>
                <input
                  type="checkbox"
                  class="sr-only peer"
                  :checked="assignedRoutineId === routine.id"
                  @change="($event) => {
                    if ($event.target.checked) {
                      handleAssign(routine.id)
                    } else {
                      handleUnassign()
                    }
                  }"
                />
                <div
                  class="group peer bg-white rounded-full duration-300 w-12 h-6 ring-2 ring-[var(--color-primary)]
                    after:transition-transform after:duration-300 after:bg-[var(--color-primary)]
                    peer-checked:after:bg-green-500 peer-checked:ring-green-500
                    after:rounded-full after:absolute after:h-4 after:w-4 after:top-1 after:left-1
                    after:content-[''] peer-checked:after:translate-x-6 peer-hover:after:scale-95"
                ></div>
              </label>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Sin resultados -->
      <div v-if="filteredRoutines.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
        </svg>
        <p class="text-lg font-semibold">Sin resultados</p>
        <p class="text-sm">No se encontraron rutinas que coincidan con el filtro.</p>
      </div>
    </div>

    <!-- Rutina Asignada Destacada -->
<div v-if="assignedRoutine" class="fixed right-6 top-28 w-80 bg-green-100 shadow-lg rounded-xl p-5 border border-green-300 z-10">
  <h2 class="text-lg font-bold text-green-800 mb-2">Rutina Asignada</h2>
  <h3 class="text-md font-semibold text-green-900">{{ assignedRoutine.title }}</h3>
  <p class="text-sm text-green-700 mb-2">{{ assignedRoutine.description }}</p>
  <p class="text-xs text-green-600">Ejercicios: {{ countExercises(assignedRoutine) }}</p>
  <button
    @click="openEditModal(assignedRoutine)"
    class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
  >
    Ver / Editar
  </button>
</div>

  </section>
</template>

