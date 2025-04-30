<script setup>
import { ref, onMounted, computed } from 'vue'
import { getPlates, createPlate, updatePlate, deletePlate } from '@/firebase/plates'
import { getIngredients } from '@/firebase/ingredients'

const plates = ref([])
const ingredients = ref([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const selectedPlate = ref(null)
const viewMode = ref('grid')
const searchQuery = ref('')

// Icons
import {
  IconPlus,
  IconLayoutGrid,
  IconLayoutList,
  IconTrash
} from '@tabler/icons-vue'

const form = ref({
  name: '',
  items: []
})

function resetForm() {
  form.value = { name: '', items: [] }
  selectedPlate.value = null
  isEditing.value = false
}

async function loadPlates() {
  loading.value = true
  try {
    plates.value = await getPlates()
    ingredients.value = await getIngredients()
  } finally {
    loading.value = false
  }
}

function getIngredientName(id) {
  const found = ingredients.value.find(ing => ing.id === id)
  return found ? found.name : 'Desconocido'
}

const filteredPlates = computed(() =>
  plates.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
)

function openEditModal(plate) {
  selectedPlate.value = plate
  form.value = { name: plate.name, items: [...plate.items] }
  isEditing.value = true
  showModal.value = true
}

async function removePlate(plate) {
  if (confirm(`¿Eliminar el plato "${plate.name}"?`)) {
    await deletePlate(plate.id)
    await loadPlates()
  }
}

function addIngredientRow() {
  form.value.items.push({ ingredientId: '', quantity: 0 })
}

function removeIngredientRow(index) {
  form.value.items.splice(index, 1)
}

async function savePlate() {
  const payload = { ...form.value }

  if (isEditing.value) {
    await updatePlate(selectedPlate.value.id, payload)
  } else {
    await createPlate(payload)
  }

  await loadPlates()
  resetForm()
  showModal.value = false
}

onMounted(loadPlates)
</script>

<template>
  <section>
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Platos</h1>
      <button @click="showModal = true" class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition">
        <IconPlus class="w-5 h-5" />
        Nuevo plato
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center z-50 px-4"
    >      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl space-y-4">
        <h2 class="text-xl font-bold text-[var(--color-primary)]">{{ isEditing ? 'Editar' : 'Nuevo' }} plato</h2>

        <input v-model="form.name" placeholder="Nombre del plato" class="input" />

        <div v-for="(item, index) in form.items" :key="index" class="flex gap-2 items-center">
          <select v-model="item.ingredientId" class="input">
            <option disabled value="">Ingrediente</option>
            <option v-for="ing in ingredients" :key="ing.id" :value="ing.id">{{ ing.name }}</option>
          </select>
          <input v-model.number="item.quantity" type="number" placeholder="Cantidad (g)" class="input w-24" />
          <button @click="removeIngredientRow(index)" class="text-red-500 text-xs">Eliminar</button>
        </div>

        <button @click="addIngredientRow" class="text-sm text-blue-600 hover:underline">+ Añadir ingrediente</button>

        <div class="flex justify-between mt-4">
          <button @click="showModal = false" class="text-gray-600 hover:underline">Cancelar</button>
          <button @click="savePlate" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded">Guardar</button>
        </div>
      </div>
    </div>

    <!-- Filtro y vista -->
    <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Buscar plato</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Nombre del plato..."
          class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
        />
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

    <!-- Grid view -->
    <div v-if="viewMode === 'grid' && filteredPlates.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="plate in filteredPlates"
        :key="plate.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-md transition cursor-pointer"
        @click="openEditModal(plate)"
      >
        <div class="p-5 flex flex-col flex-grow justify-between">
          <h3 class="text-xl font-bold text-gray-800 mb-1 truncate">{{ plate.name }}</h3>

          <p class="text-sm text-gray-600 mb-3 line-clamp-3">
            {{ plate.items.length }} ingrediente{{ plate.items.length !== 1 ? 's' : '' }}
          </p>

          <div class="mt-auto flex justify-between items-center">
            <span class="text-xs text-gray-500">ID: {{ plate.id.slice(0, 6) }}...</span>

            <button
              @click.stop="removePlate(plate)"
              class="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full transition duration-200"
              title="Eliminar"
            >
              <IconTrash class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table view -->
    <table v-else-if="viewMode === 'table' && filteredPlates.length" class="w-full text-left text-sm">
      <thead class="bg-gray-200 text-gray-600 font-medium">
        <tr>
          <th class="py-3 px-2">Nombre</th>
          <th class="px-2">Ingredientes</th>
          <th class="px-2 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="plate in filteredPlates" :key="plate.id" class="border-t border-gray-200 hover:bg-gray-100 transition" @click="openEditModal(plate)">
          <td class="py-3 px-2 text-[var(--color-primary)] font-semibold">{{ plate.name }}</td>
          <td class="py-3 px-2 text-gray-600">
            <ul class="list-disc list-inside space-y-1">
              <li v-for="item in plate.items" :key="item.ingredientId">
                {{ getIngredientName(item.ingredientId) }} - {{ item.quantity }}g
              </li>
            </ul>
          </td>
          <td class="py-3 px-2 text-right">
            <button
                @click.prevent.stop="removePlate(plate)"
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
      <p class="text-sm">No se encontraron platos que coincidan con los filtros aplicados.</p>
    </div>
  </section>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}
</style>
