<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { getExercises } from '@/firebase/exercises'
import { createRoutine, updateRoutine } from '@/firebase/routines'

const props = defineProps({ show: Boolean, initialData: Object })
const emit = defineEmits(['close', 'saved'])

const exercises = ref([])
const loading = ref(true)

const routine = ref({
  title: '',
  description: '',
  days: []
})

const defaultDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

const selectedDays = ref(defaultDays.map(day => ({
  name: day,
  enabled: false,
  exercises: [],
  selectedExercise: ''
})))

onMounted(async () => {
  exercises.value = await getExercises()
})

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    routine.value = { ...newVal }

    selectedDays.value = defaultDays.map(dayName => {
      const existing = newVal.days?.find(d => d.name === dayName)
      return {
        name: dayName,
        enabled: !!existing,
        exercises: existing?.exercises || [],
        selectedExercise: ''
      }
    })
  } else {
    resetForm()
  }
}, { immediate: true })

function addExerciseToDay(day) {
  const selectedId = day.selectedExercise
  const found = exercises.value.find(e => e.id === selectedId)
  if (!found) return

  day.exercises.push({
    id: found.id,
    name: found.name,
    sets: null,
    reps: null
  })
  day.selectedExercise = ''
}

function removeExercise(day, index) {
  day.exercises.splice(index, 1)
}

async function submitForm() {
  routine.value.days = selectedDays.value
    .filter(d => d.enabled && d.exercises.length)
    .map(d => ({
      name: d.name,
      exercises: d.exercises
    }))

  if (routine.value.id) {
    await updateRoutine(routine.value.id, routine.value)
  } else {
    await createRoutine(routine.value)
  }

  emit('saved')
  close()
}

function close() {
  resetForm()
  emit('close')
}

function resetForm() {
  routine.value = {
    title: '',
    description: '',
    days: []
  }

  selectedDays.value = defaultDays.map(day => ({
    name: day,
    enabled: false,
    exercises: [],
    selectedExercise: ''
  }))
}
</script>

<template>

<div
  v-if="show"
  class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-2"
>
  <!-- CONTENEDOR INTERIOR DEL MODAL -->
  <div
    class="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto p-4 relative"
  >
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-[var(--color-primary)]">
        {{ routine.id ? 'Editar rutina' : 'Crear nueva rutina' }}
      </h2>
      <button
        @click="close"
        class="text-gray-500 hover:text-gray-800 text-sm"
      >
        ✖ Cerrar
      </button>
    </div>

    <!-- CONTENIDO SCROLLABLE -->
    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Título + descripción -->
      <div class="grid grid-cols-1 grid-rows-2 gap-4">
        <input v-model="routine.title" placeholder="Título de la rutina" class="input" required />
        <input v-model="routine.description" placeholder="Descripción" class="input" />
      </div>

      <!-- Días -->
      <div v-for="day in selectedDays" :key="day.name" class="border rounded-lg p-4 space-y-4">
        <!-- Día header -->
        <div class="justify-between sm:items-center gap-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="day.enabled" />
            <span class="text-xl font-semibold text-[var(--color-primary)]">{{ day.name }}</span>
          </label>

          <div v-if="day.enabled" class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select v-model="day.selectedExercise" class="input">
              <option disabled selected value="">Selecciona un ejercicio</option>
              <option v-for="ex in exercises" :key="ex.id" :value="ex.id">{{ ex.name }}</option>
            </select>
            <button
              type="button"
              @click="addExerciseToDay(day)"
              class="bg-[var(--color-primary)] text-white rounded px-3 py-1 text-sm"
            >
              +
            </button>
          </div>
        </div>

        <!-- Lista ejercicios -->
        <div v-if="day.enabled && day.exercises.length">
          <div
            v-for="(exercise, index) in day.exercises"
            :key="index"
            class="bg-gray-50 border rounded px-3 py-2 mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div class="text-sm font-medium text-[var(--color-text)] w-full sm:w-auto">
              {{ exercise.name }}
            </div>

            <div class="flex gap-2 items-center">
              <input
                v-model.number="exercise.sets"
                type="number"
                placeholder="Series"
                class="border rounded px-2 py-1 w-20 text-center"
              />
              <input
                v-model.number="exercise.reps"
                type="number"
                placeholder="Reps"
                class="border rounded px-2 py-1 w-20 text-center"
              />
              <button @click="removeExercise(day, index)" class="text-red-500 text-xs hover:underline">
                Quitar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
        >
          Guardar rutina
        </button>
      </div>
    </form>
  </div>
</div>

</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}
.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}
</style>
