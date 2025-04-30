<script setup>
import { ref, onMounted, watch } from 'vue'
import { createExercise, getExerciseCategories, updateExercise } from '@/firebase/exercises'

// Props y eventos
const props = defineProps({
  show: Boolean,
  initialData: Object
})
const emit = defineEmits(['close', 'saved'])

// Categorías y carga
const exerciseCategories = ref([])
const loading = ref(true)

const exercise = ref({
  name: '',
  description: '',
  category: '',
  imageUrl: ''
})

// Cargar categorías
onMounted(async () => {
  try {
    exerciseCategories.value = await getExerciseCategories()
  } catch (error) {
    console.error('Error al obtener categorías:', error)
  } finally {
    loading.value = false
  }
})

// Escuchar cambios en initialData (edición)
watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      exercise.value = { ...newVal }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// Guardar o actualizar
async function submitForm() {
  try {
    if (exercise.value.id) {
      await updateExercise(exercise.value.id, exercise.value)
    } else {
      await createExercise(exercise.value)
    }
    emit('saved')
    close()
  } catch (error) {
    console.error('Error al guardar el ejercicio:', error)
  }
}

// Cerrar y limpiar
function close() {
  resetForm()
  emit('close')
}

// Reset form
function resetForm() {
  exercise.value = {
    name: '',
    description: '',
    category: '',
    imageUrl: ''
  }
}
</script>


<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center z-50 px-4"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl relative">
        <button @click="close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">✖</button>
        <h2 class="text-xl font-semibold mb-4 text-[var(--color-primary)]">
          {{ exercise.id ? 'Editar ejercicio' : 'Crear ejercicio' }}
        </h2>
  
        <form @submit.prevent="submitForm" @change="handleCategoryChange" class="space-y-4">
          <input v-model="exercise.name" placeholder="Ejercicio" class="input" required />
          <input v-model="exercise.description" placeholder="Descripción corta" class="input" />
          
          <label class="block text-sm font-medium text-gray-700">Grupo muscular</label>
          <select v-model="exercise.category" class="w-full border border-gray-300 p-2 rounded" required>
            <option disabled value="">Selecciona un grupo muscular</option>
            <option v-for="category in exerciseCategories" :key="category" :value="category">
              {{ category.name }}
            </option>
          </select>          
          <!-- Aquí pones la URL local directamente -->
          <input v-model="exercise.imageUrl" placeholder="URL de la imagen (opcional)" class="input" />
  
          <button
            type="submit"
            class="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
          >
          {{ exercise.id ? 'Guardar cambios' : 'Crear ejercicio' }}

          </button>
        </form>
      </div>
    </div>

  </template>
  
  <style scoped>
  .input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
    outline: none;
    transition: border-color 0.2s ease;
  }
  
  .input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
  }
  
  .textarea {
    min-height: 6rem;
    resize: vertical;
  }
  </style>
  