<!-- src/components/GuideFormModal.vue -->
<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl relative">
        <button @click="close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">✖</button>
        <h2 class="text-xl font-semibold mb-4 text-[var(--color-primary)]">Crear nueva guía</h2>
  
        <form @submit.prevent="submitForm" class="space-y-4">
          <input v-model="guide.title" placeholder="Título de la guía" class="input" required />
          <input v-model="guide.description" placeholder="Descripción corta" class="input" required />
          <textarea v-model="guide.content" placeholder="Contenido de la guía" class="input textarea" required></textarea>
          <input v-model="guide.author" placeholder="Autor" class="input" required />
          
          <label class="block text-sm font-medium text-gray-700">Categoría</label>
          <select v-model="guide.category" class="w-full border border-gray-300 p-2 rounded" required>
            <option disabled value="">Selecciona una categoría</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category.title }}
            </option>
          </select>          
          <!-- Aquí pones la URL local directamente -->
          <input v-model="guide.imageUrl" placeholder="URL de la imagen (opcional)" class="input" />
  
          <button
            type="submit"
            class="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
          >
            Guardar guía
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { createGuide, getCategories } from '@/firebase/guides'
  
  const props = defineProps({ show: Boolean })
  const emit = defineEmits(['close', 'saved'])

  const categories = ref([])
  const loading = ref(true)

  onMounted(async () => {
    try {
      categories.value = await getCategories()
    } catch (error) {
      console.error('Error al obtener categorias:', error)
    } finally {
      loading.value = false
    }
  })
  
  const guide = ref({
    title: '',
    description: '',
    content: '',
    author: '',
    category: '',
    imageUrl: '', // Solo el path
    created: new Date().toISOString(),
  })
  
  function submitForm() {
    createGuide(guide.value)
    emit('saved')
    emit('close')
  }
  
  function close() {
    emit('close')
  }
  </script>
  
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
  