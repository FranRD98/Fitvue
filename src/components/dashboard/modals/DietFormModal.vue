<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { getPlates } from '@/supabase/services/plates'
import { createDiet, updateDiet } from '@/supabase/services/diets'

import { getMacros } from '@/supabase/services/plates'

const props = defineProps({ show: Boolean, initialData: Object, currentUserId: String })
const emit = defineEmits(['close', 'saved'])

const plates = ref([])
const customMealName = ref('')
const showCustomMealInput = ref(false)

// Dieta
const diet = ref({
  title: '',
  description: '',
  user_id: props.currentUserId,
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

// Función de reset
function resetForm() {
  diet.value = {
    title: '',
    description: '',
    user_id: props.currentUserId ?? null,
    meals: []
  }

  selectedMeals.value = [
    { name: 'Desayuno', enabled: false, items: [] },
    { name: 'Almuerzo', enabled: false, items: [] },
    { name: 'Comida', enabled: false, items: [] },
    { name: 'Merienda', enabled: false, items: [] },
    { name: 'Cena', enabled: false, items: [] }
  ]
}

watch(
  () => props.initialData,
  async (newData) => {
    if (newData) {
      diet.value = { ...newData };

      // Reiniciar comidas por defecto + personalizadas
      selectedMeals.value = [
        { name: 'Desayuno', enabled: false, items: [] },
        { name: 'Almuerzo', enabled: false, items: [] },
        { name: 'Comida', enabled: false, items: [] },
        { name: 'Merienda', enabled: false, items: [] },
        { name: 'Cena', enabled: false, items: [] }
      ];

      // Restaurar las comidas de la dieta
      newData.meals?.forEach((meal) => {
        const existing = selectedMeals.value.find(m => m.name === meal.name);
        if (existing) {
          existing.enabled = true;
          existing.items = meal.items || [];
        } else {
          selectedMeals.value.push({
            name: meal.name,
            enabled: true,
            items: meal.items || []
          });
        }
      });
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Carga inicial
onMounted(async () => {
  plates.value = await getPlates();
  console.log("Platos disponibles:", plates.value); // Verifica si los platos están cargados correctamente

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
  if (!plate) return;

  // Asegúrate de que 'items' es un array vacío si no está definido
  if (!Array.isArray(meal.items)) {
    meal.items = [];
  }

  if (!meal.items.find(p => p.id === plate.id)) {
    meal.items.push(plate);
    console.log("Plato añadido:", plate, "a la comida:", meal.name);
  }
}

// Eliminar comida personalizada
function removeCustomMeal(mealName) {
  const index = selectedMeals.value.findIndex(meal => meal.name === mealName);
  if (index !== -1) {
    selectedMeals.value.splice(index, 1);
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

// Función para formatear los valores de los macros
function formatMacroValue(value) {
  return isNaN(value) || value === null ? 0 : value.toFixed(1);
}

// Total del día
const totalMacros = computed(() => {
  return selectedMeals.value.reduce((acc, meal) => {
    if (meal.enabled) {
      meal.items.forEach(plate => {
        const macros = getMacros(plate);
        acc.protein += parseFloat(macros.protein);
        acc.carbs += parseFloat(macros.carbs);
        acc.fat += parseFloat(macros.fats);
        acc.calories += parseFloat(macros.calories);
      });
    }
    return acc;
  }, { protein: 0, carbs: 0, fat: 0, calories: 0 });
});

// Guardar
async function submitForm() {
  diet.value.meals = selectedMeals.value.filter(m => m.enabled && m.items.length > 0)

  if (!diet.value.user_id || typeof diet.value.user_id !== 'string') {
    alert('Error: no se ha podido determinar el usuario. Intenta recargar la página.');
    return;
  }

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
  <div v-if="show" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4">
    <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
      
      <!-- Botón cerrar -->
      <button @click="close" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>

      <!-- Título -->
      <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-4">
        {{ diet.id ? 'Editar dieta' : 'Crear nueva dieta' }}
      </h2>

      <!-- Formulario principal -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Inputs generales -->
        <div class="grid md:grid-cols-2 gap-4">
  <div>
    <label for="diet-title" class="text-sm text-gray-700 font-medium mb-1 block">Título de la dieta</label>
    <input id="diet-title" v-model="diet.title" placeholder="Ej: Volumen 2300 kcal" class="input" required />
  </div>
  <div>
    <label for="diet-description" class="text-sm text-gray-700 font-medium mb-1 block">Descripción</label>
    <input id="diet-description" v-model="diet.description" placeholder="Opcional..." class="input" />
  </div>
</div>

        <!-- Sección de comidas -->
        <div class="space-y-6">
<div
  v-for="meal in selectedMeals"
  :key="meal.name"
  class="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-white hover:border-gray-400 transition-all duration-300"
>
  <label class="flex items-center justify-between mb-2">
  <div class="flex items-center gap-2">
    <input type="checkbox" v-model="meal.enabled" />
    <span class="font-semibold text-[var(--color-primary)] text-base">{{ meal.name }}</span>
  </div>
  <!-- Botón eliminar solo si no es una comida predefinida -->
  <button v-if="!['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena'].includes(meal.name)"
          @click="removeCustomMeal(meal.name)"
          class="text-red-500 text-xs hover:underline">
    Eliminar
  </button>
</label>

  <Transition name="slide-fade">
    <div v-if="meal.enabled" class="space-y-2">
      <!-- Select platos -->
      <select @change="e => addPlateToMeal(meal, plates.find(p => p.id === Number(e.target.value)))"
              class="input bg-white">
        <option disabled selected>Selecciona un plato</option>
        <option v-for="plate in plates" :key="plate.id" :value="plate.id">{{ plate.name }}</option>
      </select>

      <!-- Lista de platos -->
      <TransitionGroup name="drop-fade" tag="div">
  <div
    v-for="(plate, index) in meal.items"
    :key="plate.id"
    class="mt-1"
  >
    <div class="flex justify-between items-center">
      <div class="text-sm">
        {{ plate.name }} —
        <span class="text-xs text-gray-500">
          {{ getMacros(plate).calories }} kcal
        </span>
      </div>
      <button @click="meal.items.splice(index, 1)" class="text-red-500 hover:underline text-xs">
        Quitar
      </button>
    </div>
    <div class="text-xs text-gray-500">
      <strong>Macros totales:</strong>
      Proteína: {{ getMacros(plate).protein }}g •
      Carbohidratos: {{ getMacros(plate).carbs }}g •
      Grasa: {{ getMacros(plate).fats }}g
    </div>
  </div>
</TransitionGroup>
    </div>
  </Transition>
</div>
        </div>

        <!-- Comida personalizada -->
        <div class="text-sm mt-4">
          <button @click="showCustomMealInput = true" v-if="!showCustomMealInput" type="button" class="text-[var(--color-primary)] hover:underline">
            + Añadir comida personalizada
          </button>
          <div v-if="showCustomMealInput" class="flex gap-2 mt-2">
            <input v-model="customMealName" placeholder="Nombre (Ej. Tentempié)" class="input" />
            <button @click="addCustomMeal" type="button" class="bg-[var(--color-primary)] text-white px-4 rounded">Agregar</button>
          </div>
        </div>

        <!-- Botón guardar -->
        <div class="flex justify-end pt-4 border-t mt-6">
          <button type="submit" class="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-6 py-2 rounded-lg font-semibold">
            Guardar dieta
          </button>
        </div>
      </form>

      <!-- Totales del día -->
      <div class="mt-8 p-4 bg-gray-100 border rounded-xl text-sm">
        <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-2">Totales del día</h3>
        <p>
          <span class="font-medium">{{ totalMacros.calories.toFixed(0) }} kcal</span> •
          Proteínas: {{ totalMacros.protein.toFixed(1) }}g •
          Carbohidratos: {{ totalMacros.carbs.toFixed(1) }}g •
          Grasas: {{ totalMacros.fat.toFixed(1) }}g
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

  /* Slide down para abrir caja de comida */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Drop-fade para cada plato */
.drop-fade-enter-active {
  transition: all 0.3s ease;
}
.drop-fade-leave-active {
  transition: all 0.2s ease;
  position: absolute;
}
.drop-fade-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}
.drop-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}


</style>
