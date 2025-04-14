<script setup>
import { ref, computed, onMounted } from 'vue'
import { getExercises, deleteExercise, getExerciseCategories } from '@/firebase/exercises'
import ExerciseFormModal from '@/components/dashboard/modals/ExerciseFormModal.vue'

const exercises = ref([])
const exerciseCategories = ref([])
const loading = ref(true)
const showModal = ref(false)
const isAdmin = true
const selectedExercise = ref(null)

// 🔍 Filtros
const searchQuery = ref('')
const selectedCategory = ref('')

const openEditModal = (exercise) => {
  selectedExercise.value = exercise
  showModal.value = true
}

const handleDelete = async (exercise) => {
  if (confirm(`¿Seguro que quieres eliminar el ejercicio "${exercise.name}"?`)) {
    await deleteExercise(exercise.id)
    await loadExercises()
  }
}

// Computed: ejercicios filtrados
const filteredExercises = computed(() => {
  return exercises.value.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || ex.category?.name === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const loadExercises = async () => {
  loading.value = true
  try {
    exercises.value = await getExercises()
    exerciseCategories.value = await getExerciseCategories()
  } catch (error) {
    console.error('Error al cargar ejercicios:', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadExercises)

</script>

<template>
  <section>
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Ejercicios</h1>
      <button
        v-if="isAdmin"
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nuevo ejercicio
      </button>
    </div>

    <!-- Modal -->
    <ExerciseFormModal
      :show="showModal"
      :initialData="selectedExercise"
      @close="showModal = false; selectedExercise = null"
      @saved="loadExercises()"
    />

    <!-- Loading / Empty -->
    <div v-if="loading">Cargando ejercicios...</div>
    <div v-else-if="exercises.length === 0">No hay ejercicios disponibles.</div>

    <!-- Panel -->
    <div v-else class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
      
      <!-- Buscador -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Buscar ejercicio</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Nombre del ejercicio..."
          class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700"
        />
      </div>

      <!-- Filtro grupo muscular -->
      <div>
        <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Grupo muscular</label>
        <select v-model="selectedCategory" class="w-full border border-gray-300 p-2 rounded text-sm text-gray-700">
          <option value="">Todos</option>
          <option v-for="category in exerciseCategories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Grid -->
    <div class="overflow-x-auto rounded-lg">
      <table class="min-w-full bg-white text-sm text-left rounded-full border border-gray-300" v-if="filteredExercises.length > 0">
        <thead class="bg-[var(--color-primary)] text-white">
          <tr>
            <th class="px-5 py-3 font-medium">Nombre</th>
            <th class="px-5 py-3 font-medium">Descripción</th>
            <th class="px-5 py-3 font-medium">Grupo Muscular</th>
            <th class="px-5 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="exercise in filteredExercises"
            :key="exercise.id"
            class="odd:bg-white even:bg-gray-300 border-b border-gray-300"
          >
            <td class="px-5 py-2 font-semibold text-[var(--color-primary)] whitespace-nowrap">{{ exercise.name }}</td>
            <td class="px-5 py-2 text-gray-600 max-w-sm truncate">{{ exercise.description }}</td>
            <td class="px-5 py-2 font-semibold text-[var(--color-primary)] whitespace-nowrap">{{ exercise.category.name }}</td>
            <td class="px-5 py-2 flex items-center justify-end gap-3">
              <button @click="openEditModal(exercise)" class="text-blue-500 hover:bg-blue-100 rounded-full transition">
                <img class="w-6 h-auto" src="/icons/edit.svg">
              </button>
              <button @click="handleDelete(exercise)" class="text-blue-500 hover:bg-blue-100 rounded-full transition">
                <img class="w-6 h-auto" src="/icons/trash.svg">
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Si no hay coincidencias -->
      <div v-else class="text-center text-gray-500 py-6">
        No se encontraron ejercicios que coincidan con tu búsqueda.
      </div>
    </div>


  </section>
</template>
