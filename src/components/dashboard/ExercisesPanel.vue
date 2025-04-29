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
<div v-if="filteredExercises.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <div
    v-for="exercise in filteredExercises"
    :key="exercise.id"
    class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
  >
    <img
      :src="exercise.imageUrl || `https://placehold.co/600x400?text=${encodeURIComponent(exercise.name)}`"
      alt="Imagen del ejercicio"
      class="w-full h-48 object-cover"
    />

    <div class="p-5 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-1">{{ exercise.name }}</h3>
      <p class="text-sm text-gray-500 mb-3 line-clamp-3">{{ exercise.description }}</p>

      <div class="text-xs text-gray-400 mt-auto">
        <p><strong>Grupo muscular:</strong> {{ exercise.category?.name || '—' }}</p>
      </div>

      <div class="mt-4 flex justify-between items-center">
        <span class="text-xs text-gray-600 mt-auto">ID: {{ exercise.id.slice(0, 6) }}...</span>

        <div class="flex gap-1">
          <button
            @click.prevent.stop="openEditModal(exercise)"
            class="bg-[#999999] hover:bg-[var(--color-primary)] p-2 rounded-full transition duration-200 hover:-translate-y-1"
            title="Editar"
          >
            ✏️
          </button>
          <button
            @click.prevent.stop="handleDelete(exercise)"
            class="bg-[#999999] hover:bg-red-600 p-2 rounded-full transition duration-200 hover:-translate-y-1"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Si no hay coincidencias -->
<div v-else class="text-center text-gray-500 py-6">
  No se encontraron ejercicios que coincidan con tu búsqueda.
</div>


  </section>
</template>
