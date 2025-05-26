<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getAssignedRoutine } from '@/supabase/services/routines'

const route = useRoute()
const routine = ref(null)
const loading = ref(true)
const step = ref(0)
const direction = ref('forward')
const inputRefs = ref([])
const exerciseInputs = ref([])

const currentDay = computed(() => routine.value?.days?.[0])
const exercises = computed(() => currentDay.value?.exercises || [])
const currentExercise = computed(() => exercises.value[step.value])
const totalSteps = computed(() => exercises.value.length)

onMounted(async () => {
  const { userId } = route.params
  if (!userId) return

  try {
    const data = await getAssignedRoutine(userId)
    routine.value = data

    // Prepara el input model
    exerciseInputs.value = data.days?.[0]?.exercises?.map(ex => ({
      exerciseId: ex.id,
      name: ex.name,
      sets: Array(ex.sets).fill({ reps: '', weight: '' })
    })) || []
  } catch (error) {
    console.error('Error al cargar la rutina:', error)
  } finally {
    loading.value = false
  }
})

watch(step, async () => {
  await nextTick()
  inputRefs.value[0]?.focus()
})

function handleNext() {
  if (step.value < totalSteps.value - 1) {
    direction.value = 'forward'
    step.value++
  } else {
    console.log('Datos de entrenamiento:', exerciseInputs.value)
    alert('¡Rutina finalizada!')
  }
}

function handleBack() {
  if (step.value > 0) {
    direction.value = 'backward'
    step.value--
  }
}
</script>



<template>
  <!-- Estado de carga -->
  <div v-if="loading" class="text-center p-6 text-white">Cargando rutina...</div>

  <!-- Si NO hay rutina después de cargar -->
  <div v-else-if="!routine || !routine.days || routine.days.length === 0" class="flex justify-center items-center text-center p-10">
    <div class="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-gray-700 border border-red-200">
      <h2 class="text-lg font-semibold mb-4 text-red-600">Rutina no asignada</h2>
      <p class="mb-4">Debes asignarte una rutina antes de registrar un entrenamiento.</p>
      <button
        @click="$router.back()"
        class="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-medium py-2 px-4 rounded"
      >
        Volver atrás
      </button>
    </div>
  </div>

  <!-- Si hay rutina válida -->
  <div v-else class="fixed inset-0 bg-[var(--color-primary)] bg-opacity-60 backdrop-blur-sm flex justify-center items-start overflow-y-auto py-6 z-50">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] h-auto flex flex-col relative overflow-hidden">

      <!-- Header -->
      <div class="text-center py-6 border-b">
        <h2 class="text-xl font-bold text-[var(--color-primary)]">
          {{ routine.title }} — {{ currentDay.day }}
        </h2>
        <div class="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2 mx-6">
          <div
            class="absolute top-0 left-0 h-full bg-[var(--color-primary)] transition-all duration-500"
            :style="{ width: ((step + 1) / totalSteps * 100) + '%' }"
          ></div>
        </div>
      </div>

      <!-- Ejercicio actual -->
      <transition :name="direction === 'forward' ? 'slide-left' : 'slide-right'" mode="out-in">
        <div :key="step" class="flex-1 flex flex-col items-center justify-center text-center p-6 gap-6">
          <h3 class="text-xl font-semibold text-gray-700">{{ currentExercise.name }}</h3>

          <div class="w-full max-w-sm space-y-4">
            <div
              v-for="(set, i) in exerciseInputs[step]?.sets"
              :key="i"
              class="input w-1/2 text-center"
            >
              <input
                ref="inputRefs"
                v-model="exerciseInputs[step].sets[i].reps"
                type="number"
                class="input w-1/2"
                placeholder="Reps"
              />
              <input
                v-model="exerciseInputs[step].sets[i].weight"
                type="number"
                class="input w-1/2"
                placeholder="Peso (kg)"
              />
            </div>
          </div>
        </div>
      </transition>

      <!-- Navegación -->
      <div class="p-6 flex justify-between items-center border-t">
        <button
          v-if="step > 0"
          @click="handleBack"
          class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Atrás
        </button>

        <button
          @click="handleNext"
          class="ml-auto px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)]"
        >
          {{ step === totalSteps - 1 ? 'Finalizar' : 'Siguiente' }}
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 100%;
  outline: none;
  transition: border-color 0.2s ease;
}
.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
  position: absolute;
  width: 100%;
}
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>


