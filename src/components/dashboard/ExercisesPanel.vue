<script setup>
import { ref, onMounted } from 'vue'
import { getExercises, editExercise, deleteExercise } from '@/firebase/exercises'
import ExerciseFormModal from '@/components/dashboard/modals/ExerciseFormModal.vue'

const exercises = ref([]) // Variable to save the exercises
const loading = ref(true) // To detect if it's loading
const showModal = ref(false) // Modal to add exercises
const isAdmin = true // Detect if user it's an admin or coach

const loadExercises = async () => {
  loading.value = true
  try {
    exercises.value = await getExercises()
  } catch (error) {
    console.error('Error al cargar ejercicios:', error)
  } finally {
    loading.value = false
  }
}

// Once loaded execute this
onMounted(() => {
  loadExercises()
})

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
    <ExerciseFormModal :show="showModal" @close="showModal = false" @saved="loadExercises()" />

    <!-- Loading / Empty -->
    <div v-if="loading">Cargando ejercicios...</div>
    <div v-else-if="exercises.length === 0">No hay ejercicios disponibles.</div>

    <!-- Grid -->
    <div v-else class="overflow-x-auto rounded-lg">
      <table class="min-w-full bg-white text-sm text-left rounded-full border border-gray-300">
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
            v-for="exercise in exercises"
            :key="exercise.id"
            class="odd:bg-white even:bg-gray-300 border-b border-gray-300"
          >
            <td class="px-5 py-2 font-semibold text-[var(--color-primary)] whitespace-nowrap">{{ exercise.name }}</td>
            <td class="px-5 py-2 text-gray-600 max-w-sm truncate">{{ exercise.description }}</td>

            <td class="px-5 py-2 font-semibold text-[var(--color-primary)] whitespace-nowrap">{{ exercise.category.name }}</td>

            <!-- Acciones -->
            <td class="px-5 py-2 flex items-center justify-end gap-3">
              <!-- Edit Button -->
              <button
                    @click="editExercise(exercise)"
                    class="text-blue-500 hover:bg-blue-100 rounded-full transition"
                  >
                  <img class="w-6 h-auto" src="/icons/edit.svg">
                </button>

                <!-- Delete Button -->
                <button
                    @click="deleteExercise(exercise)"
                    class="text-blue-500 hover:bg-blue-100 rounded-full transition"
                  >
                  <img class="w-6 h-auto" src="/icons/trash.svg">
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </section>
</template>
