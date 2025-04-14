<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { getPlates } from '@/firebase/plates.js'
import { createDiet, updateDiet } from '@/firebase/diets.js'

const props = defineProps({ show: Boolean, initialData: Object })
const emit = defineEmits(['close', 'saved'])

const plates = ref([])
const customMealName = ref('')
const showCustomMealInput = ref(false)

// Dieta
const diet = ref({
  title: '',
  description: '',
  userId: '',
  meals: []
})

// Comidas básicas
const selectedMeals = ref([
  { name: 'Desayuno', enabled: false, items: [] },
  { name: 'Almuerzo', enabled: false, items: [] },
  { name: 'Comida', enabled: false, items: [] },
  { name: 'Merienda', enabled: false, items: [] },
  { name: 'Cena', enabled: false, items: [] },
])

watch(
  () => props.initialData,
  async (newData) => {
    if (newData) {
      diet.value = { ...newData }

      // Reiniciar comidas por defecto + personalizadas
      selectedMeals.value = [
        { name: 'Desayuno', enabled: false, items: [] },
        { name: 'Almuerzo', enabled: false, items: [] },
        { name: 'Comida', enabled: false, items: [] },
        { name: 'Merienda', enabled: false, items: [] },
        { name: 'Cena', enabled: false, items: [] }
      ]

      // Restaurar las comidas de la dieta
      newData.meals?.forEach((meal) => {
        const existing = selectedMeals.value.find(m => m.name === meal.name)
        if (existing) {
          existing.enabled = true
          existing.items = meal.items || []
        } else {
          selectedMeals.value.push({
            name: meal.name,
            enabled: true,
            items: meal.items || []
          })
        }
      })
    } else {
      resetForm()
    }
  },
  { immediate: true }
)


// Carga inicial
onMounted(async () => {
  plates.value = await getPlates()

  if (props.initialData) {
    diet.value = { ...props.initialData }

    // Rellenar selectedMeals
    diet.value.meals?.forEach(meal => {
      const match = selectedMeals.value.find(m => m.name === meal.name)
      if (match) {
        match.enabled = true
        match.items = meal.items
      } else {
        selectedMeals.value.push({ ...meal, enabled: true })
      }
    })
  }
})

// Añadir plato
function addPlateToMeal(meal, plate) {
  if (!plate) return
  if (!meal.items.find(p => p.id === plate.id)) {
    meal.items.push(plate)
  }
}

// Añadir comida personalizada
function addCustomMeal() {
  if (!customMealName.value.trim()) return
  selectedMeals.value.push({
    name: customMealName.value.trim(),
    enabled: true,
    items: []
  })
  customMealName.value = ''
  showCustomMealInput.value = false
}

// Calcular macros por comida
function calculateMacros(meal) {
  return meal.items.reduce(
    (acc, plate) => {
      const factor = 1 // Ya está ajustado por plato
      acc.protein += plate.protein * factor
      acc.carbs += plate.carbs * factor
      acc.fat += plate.fat * factor
      acc.calories += plate.calories * factor
      return acc
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  )
}

// Total del día
const totalMacros = computed(() => {
  return selectedMeals.value.reduce((acc, meal) => {
    if (meal.enabled) {
      const m = calculateMacros(meal)
      acc.protein += m.protein
      acc.carbs += m.carbs
      acc.fat += m.fat
      acc.calories += m.calories
    }
    return acc
  }, { protein: 0, carbs: 0, fat: 0, calories: 0 })
})

// Guardar
async function submitForm() {
  diet.value.meals = selectedMeals.value.filter(m => m.enabled && m.items.length > 0)

  if (diet.value.id) {
    await updateDiet(diet.value.id, diet.value)
  } else {
    await createDiet(diet.value)
  }

  emit('saved')
  emit('close')
}

// Cerrar modal
function close() {
  emit('close')
}

</script>


<template>
<div
  v-if="show"
  class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4"
>

    <div
        class="bg-white rounded-xl shadow-xl p-6 w-full max-w-3xl relative overflow-y-auto max-h-[90vh]"
      >
        <!-- Cierre -->
        <button @click="close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg">
          ✕
        </button>

      <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6">
        {{ diet.id ? 'Editar dieta' : 'Crear nueva dieta' }}
      </h2>

      <form @submit.prevent="submitForm" class="space-y-6">

        <!-- Título y descripción alineados -->
        <div class="grid md:grid-cols-2 gap-4">
          <input v-model="diet.title" placeholder="Título de la dieta" class="input" required />
          <input v-model="diet.description" placeholder="Descripción" class="input" />
        </div>

        <!-- Sección de comidas -->
        <div v-for="meal in selectedMeals" :key="meal.name" class="border rounded p-4 space-y-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="meal.enabled" />
            <span class="font-medium text-[var(--color-primary)]">{{ meal.name }}</span>
          </label>

          <div v-if="meal.enabled" class="space-y-2">
            <select
              @change="e => addPlateToMeal(meal, plates.find(p => p.id === e.target.value))"
              class="input bg-white"
            >
              <option disabled selected>Selecciona un plato</option>
              <option v-for="plate in plates" :key="plate.id" :value="plate.id">{{ plate.name }}</option>
            </select>

            <div v-for="(plate, index) in meal.items" :key="index" class="flex justify-between items-center mt-1">
              <div class="text-sm">
                {{ plate.name }}
              </div>
              <button @click="meal.items.splice(index, 1)" class="text-red-500 hover:underline text-xs">Quitar</button>
            </div>

            <div class="text-xs mt-1 text-gray-500">
              <strong>Macros totales:</strong>
              {{
                (() => {
                  const m = calculateMacros(meal)
                  return `${m.calories.toFixed(0)} kcal - ${m.protein.toFixed(1)}P / ${m.carbs.toFixed(1)}C / ${m.fat.toFixed(1)}F`
                })()
              }}
            </div>
          </div>
        </div>

        <!-- Comida personalizada -->
        <div class="text-sm mt-4">
          <button
            @click="showCustomMealInput = true"
            v-if="!showCustomMealInput"
            type="button"
            class="text-[var(--color-primary)] hover:underline"
          >
            + Añadir comida personalizada
          </button>

          <div v-if="showCustomMealInput" class="flex gap-2 mt-2">
            <input v-model="customMealName" placeholder="Nombre (Ej. Tentempié)" class="input" />
            <button @click="addCustomMeal" type="button" class="bg-[var(--color-primary)] text-white px-4 rounded">
              Agregar
            </button>
          </div>
        </div>

        <!-- Acciones -->
        <div class="flex justify-end mt-6">
          <button
            type="submit"
            class="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
          >
            Guardar dieta
          </button>
        </div>
      </form>

      <!-- Total diario -->
      <div class="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-800 border">
        <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-2">Totales del día</h3>
        <p>
          {{ totalMacros.calories.toFixed(0) }} kcal •
          <strong>{{ totalMacros.protein.toFixed(1) }}g</strong> proteínas •
          <strong>{{ totalMacros.carbs.toFixed(1) }}g</strong> carbohidratos •
          <strong>{{ totalMacros.fat.toFixed(1) }}g</strong> grasas
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background-color: white;
  color: #374151;
  transition: all 0.2s ease;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
  outline: none;
}
</style>
