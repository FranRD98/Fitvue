<script setup>
import { ref, onMounted, computed } from 'vue'
import { getPlates, deletePlate } from '@/supabase/services/plates'
import { getIngredients } from '@/supabase/services/ingredients'

import PlateModal from '@/components/dashboard/modals/PlateModal.vue'
import {
  IconPlus,
  IconLayoutGrid,
  IconLayoutList,
  IconTrash
} from '@tabler/icons-vue'

const plates = ref([])
const ingredients = ref([])
const loading = ref(true)
const searchQuery = ref('')
const viewMode = ref('grid')

const showModal = ref(false)
const selectedPlate = ref(null)

async function loadPlates() {
  loading.value = true
  try {
    plates.value = await getPlates()
    ingredients.value = await getIngredients()
  
    console.log(plates.value)
  } finally {
    loading.value = false
  }
}

onMounted(loadPlates)

function openNewModal() {
  selectedPlate.value = null
  showModal.value = true
}

function openEditModal(plate) {
  selectedPlate.value = plate
  showModal.value = true
}

async function removePlate(plate) {
  if (confirm(`¿Eliminar el plato "${plate.name}"?`)) {
    await deletePlate(plate.id)
    await loadPlates()
  }
}

const filteredPlates = computed(() =>
  plates.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
)

function getIngredientName(id) {
  const ing = ingredients.value.find(i => i.id === id)
  return ing ? ing.name : 'Desconocido'
}

function getTotal(plate, nutrient) {
  return plate.items.reduce((total, item) => {
    if (!item.ingredient || item.quantity == null) return total
    const per100g = parseFloat(item.ingredient[nutrient]) || 0
    return total + (per100g * item.quantity) / 100
  }, 0).toFixed(1)
}

</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Platos</h1>
      <button @click="openNewModal" class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition">
        <IconPlus class="w-5 h-5" />
        Nuevo plato
      </button>
    </div>

    <!-- Modal -->
    <PlateModal
      :show="showModal"
      :plate="selectedPlate"
      :ingredients="ingredients"
      @close="showModal = false"
      @saved="loadPlates"
    />

    <!-- Filtro -->
    <div class="mb-6 flex justify-between items-end gap-4">
      <input
        v-model="searchQuery"
        placeholder="Buscar plato..."
        class="w-full border border-gray-300 rounded p-2"
      />

      <div class="flex gap-1">
        <button @click="viewMode = 'grid'" :class="['p-2 rounded', viewMode === 'grid' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200']">
          <IconLayoutGrid />
        </button>
        <button @click="viewMode = 'table'" :class="['p-2 rounded', viewMode === 'table' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200']">
          <IconLayoutList />
        </button>
      </div>
    </div>

    <!-- Vista GRID -->
    <div v-if="viewMode === 'grid' && filteredPlates.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="plate in filteredPlates"
        :key="plate.id"
        class="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition flex flex-col justify-between"
        @click="openEditModal(plate)"
      >
        <h3 class="text-lg font-bold truncate text-[var(--color-primary)]">{{ plate.name }}</h3>
        <p class="text-sm text-gray-600">{{ plate.items.length }} ingrediente{{ plate.items.length !== 1 ? 's' : '' }}</p>

        <!-- Totales nutricionales -->
        <div class="mt-2 text-sm text-gray-700 space-y-1">
          <p>Calorías: {{ getTotal(plate, 'calories') }} kcal</p>
          <p>Proteínas: {{ getTotal(plate, 'protein') }} g</p>
          <p>Carbohidratos: {{ getTotal(plate, 'carbs') }} g</p>
          <p>Grasas: {{ getTotal(plate, 'fats') }} g</p>
        </div>

        <div class="flex justify-between items-center mt-4">
          <span class="text-xs text-gray-500">ID: {{ plate.id }}</span>
          <button @click.stop="removePlate(plate)" class="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full">
            <IconTrash class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Vista TABLE -->
    <table v-else-if="viewMode === 'table' && filteredPlates.length" class="w-full text-left text-sm">
      <thead class="bg-gray-200 text-gray-600 font-medium">
        <tr>
          <th class="px-4 py-2">Nombre</th>
          <th class="px-4 py-2">Ingredientes</th>
          <th class="text-right px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="plate in filteredPlates"
          :key="plate.id"
          class="border-t border-gray-200 hover:bg-gray-100 transition cursor-pointer"
          @click="openEditModal(plate)"
        >
          <td class="px-4 py-2 font-semibold text-[var(--color-primary)]">{{ plate.name }}</td>
          <td class="px-4 py-2">
            <ul>
              <li v-for="item in plate.items" :key="item.ingredientId">
                {{ getIngredientName(item.ingredientId) }} - {{ item.quantity }}g
              </li>
            </ul>
          </td>
          <td class="px-4 py-2 text-right">
            <button @click.prevent.stop="removePlate(plate)" class="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full">
              <IconTrash class="w-5 h-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Si no hay coincidencias -->
    <div v-if="filteredPlates.length === 0"class="flex flex-col items-center justify-center py-12 text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
      </svg>
      <p class="text-lg font-semibold">Sin resultados</p>
      <p class="text-sm">No se encontraron platos que coincidan con los filtros aplicados.</p>
    </div>
  </section>
</template>
