<script setup>
import { ref, onMounted } from 'vue'
import { getIngredients, createIngredient, updateIngredient, deleteIngredient } from '@/firebase/ingredients'

const ingredients = ref([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const selectedIngredient = ref(null)

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

onMounted(loadIngredients)
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Ingredientes</h1>
      <button @click="showModal = true" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded">Nuevo ingrediente</button>
    </div>

    <div v-if="loading">Cargando...</div>
    <table v-else class="w-full table-auto border-collapse border border-gray-300">
      <thead class="bg-[var(--color-primary)] text-white">
        <tr>
          <th class="p-2">Nombre</th>
          <th class="p-2">Calorías</th>
          <th class="p-2">Proteínas</th>
          <th class="p-2">Carbohidratos</th>
          <th class="p-2">Grasas</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in ingredients" :key="ingredient.id" class="odd:bg-white even:bg-gray-100">
          <td class="p-2">{{ ingredient.name }}</td>
          <td class="p-2">{{ ingredient.calories }}</td>
          <td class="p-2">{{ ingredient.protein }}</td>
          <td class="p-2">{{ ingredient.carbs }}</td>
          <td class="p-2">{{ ingredient.fats }}</td>
          <td class="p-2 space-x-2">
            <button @click="openEditModal(ingredient)" class="text-blue-600 hover:underline">Editar</button>
            <button @click="removeIngredient(ingredient)" class="text-red-500 hover:underline">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
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
