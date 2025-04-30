<script setup>
import { ref, onMounted, computed } from 'vue'
import { getIngredients, createIngredient, updateIngredient, deleteIngredient } from '@/firebase/ingredients'

const ingredients = ref([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const selectedIngredient = ref(null)
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
  calories: '',
  protein: '',
  carbs: '',
  fats: ''
})

function resetForm() {
  form.value = {
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  }
  selectedIngredient.value = null
  isEditing.value = false
}

async function loadIngredients() {
  loading.value = true
  try {
    ingredients.value = await getIngredients()
  } finally {
    loading.value = false
  }
}

async function saveIngredient() {
  const payload = { ...form.value }
  if (isEditing.value) {
    await updateIngredient(selectedIngredient.value.id, payload)
  } else {
    await createIngredient(payload)
  }
  await loadIngredients()
  resetForm()
  showModal.value = false
}

function openEditModal(ingredient) {
  selectedIngredient.value = ingredient
  Object.assign(form.value, ingredient)
  isEditing.value = true
  showModal.value = true
}

async function removeIngredient(ingredient) {
  if (confirm(`¿Eliminar "${ingredient.name}"?`)) {
    await deleteIngredient(ingredient.id)
    await loadIngredients()
  }
}

const filteredIngredients = computed(() =>
  ingredients.value.filter(i => i.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
)

onMounted(loadIngredients)
</script>

<template>
  <section>
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Ingredientes</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
      <IconPlus class="w-5 h-5"/>  
      Nuevo ingrediente
      </button>
    </div>

    <!-- Modal -->
    <div
  v-if="showModal"
  class="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center z-50 px-4"
>      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 class="text-xl font-bold text-[var(--color-primary)]">{{ isEditing ? 'Editar' : 'Nuevo' }} ingrediente</h2>

        <input v-model="form.name" placeholder="Nombre" class="input" />
        <input v-model="form.calories" type="number" placeholder="Calorías (por 100g)" class="input" />
        <input v-model="form.protein" type="number" placeholder="Proteínas" class="input" />
        <input v-model="form.carbs" type="number" placeholder="Carbohidratos" class="input" />
        <input v-model="form.fats" type="number" placeholder="Grasas" class="input" />

        <div class="flex justify-between">
          <button @click="showModal = false" class="text-gray-600 hover:underline">Cancelar</button>
          <button @click="saveIngredient" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded">Guardar</button>
        </div>
      </div>
    </div>

    <!-- Filtro y vista -->
    <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Buscar ingrediente</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Nombre del ingrediente..."
          class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
        />
      </div>

      <div class="flex items-center gap-1">
        <button
          @click="viewMode = 'grid'"
          :class="['p-2 rounded', viewMode === 'grid' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200']"
          title="Vista de tarjetas"
        ><IconLayoutGrid/>
      </button>
        <button
          @click="viewMode = 'table'"
          :class="['p-2 rounded', viewMode === 'table' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200']"
          title="Vista de tabla"
        > <IconLayoutList/>
      </button>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid' && filteredIngredients.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="ingredient in filteredIngredients"
        :key="ingredient.id"
        class="bg-white rounded-xl shadow-lg p-5 hover:shadow-md transition flex flex-col justify-between cursor-pointer"
        @click="openEditModal(ingredient)"
      >
        <h3 class="text-xl font-bold text-[var(--color-primary)] mb-2 truncate">{{ ingredient.name }}</h3>
        <ul class="text-sm text-gray-700 mb-4">
          <li><strong>Calorías:</strong> {{ ingredient.calories }} kcal</li>
          <li><strong>Proteínas:</strong> {{ ingredient.protein }}g</li>
          <li><strong>Carbs:</strong> {{ ingredient.carbs }}g</li>
          <li><strong>Grasas:</strong> {{ ingredient.fats }}g</li>
        </ul>
        <button
          @click.stop="removeIngredient(ingredient)"
          class="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full transition duration-200 self-end"
          title="Eliminar"
        >
        <IconTrash class="w-5 h-5" />
      </button>
      </div>
    </div>

    <!-- Table View -->
    <table v-else-if="viewMode === 'table' && filteredIngredients.length" class="w-full text-left text-sm">
      <thead class="bg-gray-200 text-gray-600 font-medium">
        <tr>
          <th class="py-3 px-2">Nombre</th>
          <th class="px-2">Calorías</th>
          <th class="px-2">Proteínas</th>
          <th class="px-2">Carbs</th>
          <th class="px-2">Grasas</th>
          <th class="px-2 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="ingredient in filteredIngredients"
          :key="ingredient.id"
          class="border-t border-gray-200 hover:bg-gray-100 transition"
          @click="openEditModal(ingredient)"
        >
          <td class="py-3 px-2 font-semibold text-[var(--color-primary)]">{{ ingredient.name }}</td>
          <td class="py-3 px-2">{{ ingredient.calories }}</td>
          <td class="py-3 px-2">{{ ingredient.protein }}</td>
          <td class="py-3 px-2">{{ ingredient.carbs }}</td>
          <td class="py-3 px-2">{{ ingredient.fats }}</td>
          <td class="py-3 px-2 text-right">
            <button
                @click.prevent.stop="removeIngredient(ingredient)"
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
      <p class="text-sm">No se encontraron ingredientes que coincidan con los filtros aplicados.</p>
    </div>
  </section>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}
</style>
