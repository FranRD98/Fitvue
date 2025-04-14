<script setup>
import { ref, onMounted } from 'vue'
import { getPlates, createPlate, updatePlate, deletePlate } from '@/firebase/plates'
import { getIngredients } from '@/firebase/ingredients'

const plates = ref([])
const ingredients = ref([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const selectedPlate = ref(null)

const form = ref({
  name: '',
  items: [] // { ingredientId, quantity }
})

function resetForm() {
  form.value = { name: '', items: [] }
  selectedplate.value = null
  isEditing.value = false
}

async function loadplates() {
  loading.value = true
  try {
    plates.value = await getPlates()
    ingredients.value = await getIngredients()
  } finally {
    loading.value = false
  }
}

function addIngredientRow() {
  form.value.items.push({ ingredientId: '', quantity: 0 })
}

function removeIngredientRow(index) {
  form.value.items.splice(index, 1)
}

async function saveplate() {
  const payload = { ...form.value }

  if (isEditing.value) {
    await updatePlate(selectedPlate.value.id, payload)
  } else {
    await createPlate(payload)
  }

  await loadplates()
  resetForm()
  showModal.value = false
}

function openEditModal(plate) {
  selectedPlate.value = plate
  form.value = { name: plate.name, items: [...plate.items] }
  isEditing.value = true
  showModal.value = true
}

async function removeplate(plate) {
  if (confirm(`¿Eliminar el plato "${plate.name}"?`)) {
    await deletePlate(plate.id)
    await loadplates()
  }
}

// Utilidad dentro del <script setup>
function getIngredientName(id) {
  const found = ingredients.value.find(ing => ing.id === id)
  return found ? found.name : 'Desconocido'
}

onMounted(loadplates)
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Platos</h1>
      <button @click="showModal = true" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded">Nuevo plato</button>
    </div>

    <div v-if="loading">Cargando platos...</div>
    <table v-else class="w-full table-auto border-collapse border border-gray-300">
      <thead class="bg-[var(--color-primary)] text-white">
        <tr>
          <th class="p-2">Nombre</th>
          <th class="p-2">Ingredientes</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="plate in plates" :key="plate.id" class="odd:bg-white even:bg-gray-100">
          <td class="p-2 font-medium">{{ plate.name }}</td>
          <td class="p-2 text-sm text-gray-700">
            <ul class="list-disc list-inside space-y-1">
              <li v-for="item in plate.items" :key="item.ingredientId">
                {{ getIngredientName(item.ingredientId) }} - {{ item.quantity }}g
              </li>
            </ul>
          </td>
          <td class="p-2 space-x-2">
            <button @click="openEditModal(plate)" class="text-blue-600 hover:underline">Editar</button>
            <button @click="removeplate(plate)" class="text-red-600 hover:underline">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl space-y-4">
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
          <button @click="saveplate" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded">Guardar</button>
        </div>
      </div>
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