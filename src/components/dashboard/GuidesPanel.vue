<script setup>
import { ref, onMounted, computed } from 'vue'
import GuideFormModal from '@/components/dashboard/modals/GuideFormModal.vue'
import { getGuides, getCategories, deleteGuide  } from '@/firebase/guides.js'

const guides = ref([])
const categories = ref([])
const loading = ref(true)
const showModal = ref(false)
const selectedGuide = ref(null)

const searchQuery = ref('')
const selectedCategory = ref('')

const loadGuides = async () => {
  loading.value = true
  try {
    guides.value = await getGuides()
    categories.value = await getCategories()
  } catch (error) {
    console.error('Error al obtener guías:', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadGuides)

const filteredGuides = computed(() => {
  return guides.value.filter(guide => {
    const matchSearch =
      guide.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      guide.description?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchCategory = selectedCategory.value
      ? guide.category?.title === selectedCategory.value
      : true

    return matchSearch && matchCategory
  })
})
</script>

<template>
  <section>
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Guías</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva guía
      </button>
    </div>

    <!-- Modal -->
    <GuideFormModal
      :show="showModal"
      :initialData="selectedGuide"
      @close="showModal = false; selectedGuide = null"
      @saved="loadGuides()"
    />

    <!-- Filtros -->
    <div v-if="!loading && guides.length" class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        v-model="searchQuery"
        placeholder="Buscar por título o descripción"
        class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700"
      />

      <select v-model="selectedCategory" class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.title">{{ cat.title }}</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading">Cargando guías...</div>

    <!-- Sin resultados -->
    <div v-else-if="filteredGuides.length === 0" class="text-center text-gray-500">No hay resultados.</div>

    <!-- Cards -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <router-link
        v-for="guide in filteredGuides"
        :key="guide.id"
        :to="`/guias/${guide.category.title}/${guide.id}`"
        class="bg-[#e4e4e4] rounded-xl shadow-lg overflow-hidden flex flex-col"
      >
        <img
          :src="guide.imageUrl || 'https://placehold.co/600x400?text=Sin+Portada&font=poppins'"
          alt="Imagen portada"
          class="w-full h-48 object-cover"
        />
        <div class="p-5 flex flex-col flex-grow">
          <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-1">{{ guide.title }}</h3>
          <p class="text-sm text-gray-500 mb-3 line-clamp-3">{{ guide.description }}</p>

          <div class="text-xs text-gray-400 mt-auto">
            <p><strong>Autor:</strong> {{ guide.author }}</p>
            <p><strong>Fecha:</strong> {{ guide.created?.toDate().toLocaleDateString() || 'N/A' }}</p>
          </div>

          <div class="mt-4 flex justify-between items-center">
            <p class="text-xs text-gray-600 mt-auto"><strong>Categoría:</strong> {{ guide.category.title }}</p>

            <div class="flex gap-1">
              <button
                @click.prevent.stop="selectedGuide = guide; showModal = true"
                class="bg-[#999999] hover:bg-[var(--color-primary)] p-2 rounded-full transition duration-200 hover:-translate-y-1"
              >
                ✏️
              </button>

              <button
                @click.prevent.stop="deleteGuide(guide.id)"
                class="bg-[#999999] hover:bg-red-600 p-2 rounded-full transition duration-200 hover:-translate-y-1"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>
