<script setup>
import { ref, onMounted } from 'vue'
import { getDiets, deleteDiet } from '@/firebase/diets'
import DietFormModal from '@/components/dashboard/modals/DietFormModal.vue'

const diets = ref([])
const showModal = ref(false)
const selectedDiet = ref(null)
const loading = ref(true)

const loadDiets = async () => {
  loading.value = true
  try {
    diets.value = await getDiets()
  } catch (e) {
    console.error('Error al cargar dietas:', e)
  } finally {
    loading.value = false
  }
}

const openEditModal = (diet) => {
  selectedDiet.value = diet
  showModal.value = true
}

const handleDelete = async (diet) => {
  if (confirm(`¿Seguro que quieres eliminar la dieta "${diet.title}"?`)) {
    try {
      await deleteDiet(diet.id)
      await loadDiets()
    } catch (error) {
      console.error('Error al eliminar la dieta:', error)
    }
  }
}

onMounted(() => {
  loadDiets()
})
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Dietas</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva dieta
      </button>
    </div>

    <DietFormModal :show="showModal" :initialData="selectedDiet" @close="showModal = false; selectedDiet = null" @saved="loadDiets" />

    <div v-if="loading">Cargando dietas...</div>
    <div v-else-if="diets.length === 0" class="text-gray-500">No hay dietas registradas.</div>

    <!-- Cards estilo guías -->
<div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  <div
    v-for="diet in diets"
    :key="diet.id"
    class="bg-[#e4e4e4] rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-md transition cursor-pointer"
  >
    <!-- Imagen de portada o placeholder -->
    <img
      :src="diet.imageUrl || `https://placehold.co/600x400?text=${encodeURIComponent(diet.title)}`"
      alt="Imagen de la dieta"
      class="w-full h-48 object-cover"
    />

    <div class="p-5 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-1">{{ diet.title }}</h3>
      <p class="text-sm text-gray-600 mb-2 line-clamp-3">{{ diet.description }}</p>

      <div class="text-xs text-gray-500 mt-auto">
        <p><strong>Comidas:</strong> {{ diet.meals?.length || 0 }}</p>
        <p><strong>Última edición:</strong> {{ diet.created?.toDate().toLocaleDateString() || '—' }}</p>
      </div>

      <!-- Acciones -->
      <div class="mt-4 flex justify-between items-center">
        <span class="text-xs text-gray-600">ID: {{ diet.id.slice(0, 6) }}...</span>

        <div class="flex gap-1">
          <button
            @click.prevent.stop="openEditModal(diet)"
            class="bg-[#999999] hover:bg-[var(--color-primary)] p-2 rounded-full transition duration-200 hover:-translate-y-1"
            title="Editar"
          >
            ✏️
          </button>

          <button
            @click.prevent.stop="handleDelete(diet)"
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

  </section>
</template>
