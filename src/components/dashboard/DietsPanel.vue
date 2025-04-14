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

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="diet in diets"
        :key="diet.id"
        class="bg-white shadow rounded-lg p-5 hover:shadow-md transition flex flex-col justify-between gap-3"
      >
        <div>
          <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-1">
            {{ diet.title }}
          </h3>
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ diet.description }}</p>
          <div class="text-xs text-gray-500">
            <p>Comidas: {{ diet.meals?.length || 0 }}</p>
            <p>Última edición: {{ diet.created?.toDate().toLocaleDateString() || '—' }}</p>
          </div>
        </div>

        <!-- Acciones -->
        <div class="flex justify-end gap-3 mt-2">
          <button
            @click="openEditModal(diet)"
            class="text-sm bg-[var(--color-primary)] text-white px-3 py-1 rounded hover:bg-[var(--color-secondary)] transition"
          >
            Editar
          </button>
          <button
            @click="handleDelete(diet)"
            class="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
      </div>

    </div>
  </section>
</template>
