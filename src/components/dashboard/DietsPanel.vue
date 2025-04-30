<script setup>
import { ref, onMounted, computed } from 'vue'
import { getDiets, deleteDiet } from '@/firebase/diets'
import DietFormModal from '@/components/dashboard/modals/DietFormModal.vue'

const diets = ref([])
const showModal = ref(false)
const selectedDiet = ref(null)
const loading = ref(true)
const viewMode = ref('grid')
const searchQuery = ref('')

// Icons
import {
  IconPlus,
  IconLayoutGrid,
  IconLayoutList,
  IconEdit,
  IconTrash
} from '@tabler/icons-vue'

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

const filteredDiets = computed(() => {
  return diets.value.filter(diet => diet.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

onMounted(() => {
  loadDiets()
})
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Dietas</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <IconPlus class="w-5 h-5" />
        Nueva dieta
      </button>
    </div>

    <DietFormModal
      :show="showModal"
      :initialData="selectedDiet"
      @close="showModal = false; selectedDiet = null"
      @saved="loadDiets"
    />

    <div v-if="loading">Cargando dietas...</div>
    <div v-else-if="diets.length === 0">No hay dietas registradas.</div>

    <div v-else class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Buscar dieta</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Nombre de la dieta..."
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

    <!-- Grid view -->
    <div v-if="viewMode === 'grid' && filteredDiets.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="diet in filteredDiets"
        :key="diet.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-md transition cursor-pointer"
        @click="openEditModal(diet)"
      >

        <div class="p-5 flex flex-col flex-grow justify-between">
          <h3 class="text-xl font-bold text-gray-800 mb-1 truncate">{{ diet.title }}</h3>
          <p v-if="diet.description" class="text-sm text-gray-600 mb-2 line-clamp-2">{{ diet.description }}</p>

          <div class="text-xs text-gray-500 mt-auto">
            <p><strong>Comidas:</strong> {{ diet.meals?.length || 0 }}</p>
            <p><strong>Última edición:</strong> {{ diet.created?.toDate().toLocaleDateString() || '—' }}</p>
          </div>

          <div class="mt-4 flex justify-right items-center">

              <button
                @click.prevent.stop="handleDelete(diet)"
                class="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full transition duration-200"
                title="Eliminar"
              >
                <IconTrash class="w-5 h-5" />
              </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table view mode -->
    <table v-else-if="viewMode === 'table' && filteredDiets.length" class="w-full text-left text-sm">
      <thead class="bg-gray-200 text-gray-600 font-medium">
        <tr>
          <th class="py-3 px-2">Nombre</th>
          <th class="px-2">Descripción</th>
          <th class="px-2">Comidas</th>
          <th class="px-2">Fecha</th>
          <th class="px-2 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="diet in filteredDiets"
          :key="diet.id"
          class="border-t border-gray-200 hover:bg-gray-100 transition"
          @click="openEditModal(diet)"
        >
          <td class="py-3 px-2 text-[var(--color-primary)]">{{ diet.title }}</td>
          <td class="py-3 px-2 text-gray-600 line-clamp-2">{{ diet.description }}</td>
          <td class="py-3 px-2">{{ diet.meals?.length || 0 }}</td>
          <td class="py-3 px-2">{{ diet.created?.toDate().toLocaleDateString() || '—' }}</td>
          <td class="py-3 px-2 text-right">
            <button
                @click.prevent.stop="handleDelete(exercise)"
                class="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full transition duration-200"
                title="Eliminar"
              >
                <IconTrash class="w-5 h-5" />
              </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Sin resultados -->
    <div v-else class="flex flex-col items-center justify-center py-12 text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
      </svg>
      <p class="text-lg font-semibold">Sin resultados</p>
      <p class="text-sm">No se encontraron dietas que coincidan con los filtros aplicados.</p>
    </div>
  </section>
</template>
