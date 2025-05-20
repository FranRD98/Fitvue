<script setup>
import { ref, onMounted, computed } from 'vue'
import { getGuides, getCategories, deleteGuide } from '@/supabase/services/guides.js'
import GuideFormModal from '@/components/dashboard/modals/GuideFormModal.vue'

import {
  IconPlus,
  IconLayoutGrid,
  IconLayoutList,
  IconTrash
} from '@tabler/icons-vue'

const guides = ref([])
const categories = ref([])
const loading = ref(true)
const showModal = ref(false)
const selectedGuide = ref(null)

const searchQuery = ref('')
const selectedCategory = ref('')
const viewMode = ref('grid')

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
      ? guide.id_category === selectedCategory.value
      : true

    return matchSearch && matchCategory
  })
})


const openEditModal = (guide) => {
  selectedGuide.value = guide
  showModal.value = true
}

const handleDelete = async (guide) => {
  if (confirm(`¿Eliminar la guía "${guide.title}"?`)) {
    await deleteGuide(guide.id)
    await loadGuides()
  }
}
</script>

<template>
  <section>
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Guías</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <IconPlus class="w-5 h-5" />
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
    <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4" v-if="!loading && guides.length">
      <div class="flex-1">
        <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Buscar guía</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por título o descripción"
          class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Categoría</label>
        <select v-model="selectedCategory" class="w-full border border-gray-300 p-2 rounded text-sm text-gray-700">
          <option value="">Todas</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>

      </div>

      <div class="flex items-center gap-1">
        <button @click="viewMode = 'grid'" :class="['p-2 rounded', viewMode === 'grid' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200']" title="Vista de tarjetas">
          <IconLayoutGrid />
        </button>
        <button @click="viewMode = 'table'" :class="['p-2 rounded', viewMode === 'table' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200']" title="Vista de tabla">
          <IconLayoutList />
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading">Cargando guías...</div>

    <!-- Sin resultados -->
    <div v-else-if="filteredGuides.length === 0" class="text-center text-gray-500 py-12">
      <p class="text-lg font-semibold">Sin resultados</p>
      <p class="text-sm">No se encontraron guías que coincidan con los filtros aplicados.</p>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid' && filteredGuides.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="guide in filteredGuides"
        :key="guide.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-md transition cursor-pointer"
        @click="openEditModal(guide)"
      >
        <img
          loading="lazy"
          :src="guide.header_image || 'https://placehold.co/600x400?text=Sin+Portada&font=poppins'"
          alt="Portada"
          class="w-full aspect-video object-cover"
        />

        <div class="p-5 flex flex-col flex-grow justify-between">
          <h3 class="text-xl font-bold text-gray-800 mb-1 truncate">{{ guide.title }}</h3>
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ guide.description }}</p>

          <div class="text-xs text-gray-500 mt-auto">
            <p><strong>Categoría:</strong> {{ categories.find(cat => cat.id === guide.id_category)?.title || '—sin categoría—' }}</p>
            <p><strong>Autor:</strong> {{ guide.author }}</p>
            <p><strong>Fecha:</strong> {{ new Date(guide.created_at).toLocaleDateString() || '—' }}</p>
          </div>

          <div class="mt-4 flex justify-end items-center">
            <button
              @click.stop="handleDelete(guide)"
              class="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full transition duration-200"
              title="Eliminar"
            >
              <IconTrash class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <table v-else-if="viewMode === 'table' && filteredGuides.length" class="w-full text-left text-sm">
      <thead class="bg-gray-200 text-gray-600 font-medium">
        <tr>
          <th class="py-3 px-2">Título</th>
          <th class="px-2">Categoría</th>
          <th class="px-2">Autor</th>
          <th class="px-2">Fecha</th>
          <th class="px-2 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="guide in filteredGuides"
          :key="guide.id"
          class="border-t border-gray-200 hover:bg-gray-100 transition"
          @click="openEditModal(guide)"
        >
          <td class="py-3 px-2 font-semibold text-[var(--color-primary)]">{{ guide.title }}</td>
          <td class="py-3 px-2"> {{ categories.find(cat => cat.id === guide.id_category)?.title || '—sin categoría—' }}</td>
          <td class="py-3 px-2">{{ guide.author }}</td>
          <td class="py-3 px-2"> {{ new Date(guide.created_at).toLocaleDateString() || '—' }}</td>
          <td class="py-3 px-2 text-right">
            <button
                @click.prevent.stop="handleDelete(guide)"
                class="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full transition duration-200"
                title="Eliminar"
              >
                <IconTrash class="w-5 h-5" />
              </button> 
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
