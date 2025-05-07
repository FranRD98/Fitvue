<script setup>
/*import { ref, computed, onMounted } from 'vue'
import { createReview } from '@/firebase/progress.js'
import { getAuth } from 'firebase/auth'

const auth = getAuth()


const show = true
const step = ref(0)

const userData = ref({
  uid: '',
  date: new Date().toISOString(),
  weight: '',
  neck: '',
  shoulders: '',
  chest: '',
  biceps_relaxed: '',
  biceps_flexed: '',
  forearm: '',
  wrist: '',
  waist: '',
  abdomen: '',
  hips: '',
  quadriceps: '',
  calves: ''
})

onMounted(() => {
  const auth = getAuth()
  const currentUser = auth.currentUser

  if (currentUser) {
    userData.value.uid = currentUser.uid
  } else {
    console.warn('Usuario no autenticado')
  }
})

const steps = [
  { model: 'weight', label: 'Peso corporal (kg)', image: '/images/weight.png' },
  { model: 'neck', label: 'Medida del cuello (cm)', image: '/images/neck.png' },
  { model: 'shoulders', label: 'Medida de hombros (cm)', image: '/images/shoulders.png' },
  { model: 'chest', label: 'Medida del pecho (cm)', image: '/images/chest.png' },
  { model: 'biceps_relaxed', label: 'Bíceps relajado (cm)', image: '/images/biceps_relaxed.png' },
  { model: 'biceps_flexed', label: 'Bíceps contraído (cm)', image: '/images/biceps_flexed.png' },
  { model: 'forearm', label: 'Antebrazo (cm)', image: '/images/forearm.png' },
  { model: 'wrist', label: 'Muñeca (cm)', image: '/images/wrist.png' },
  { model: 'waist', label: 'Cintura (cm)', image: '/images/waist.png' },
  { model: 'abdomen', label: 'Abdomen (cm)', image: '/images/abdomen.png' },
  { model: 'hips', label: 'Cadera (cm)', image: '/images/hips.png' },
  { model: 'quadriceps', label: 'Cuádriceps (cm)', image: '/images/quadriceps.png' },
  { model: 'calves', label: 'Gemelos (cm)', image: '/images/calves.png' },
]

const totalSteps = computed(() => steps.length)
const currentStep = computed(() => steps[step.value])

function handleNext() {
  if (step.value < steps.length - 1) {
    step.value++
  } else {
    createReview(userData.value)
    router.push('/dashboard')
  }
}*/
</script>

<template>
    <!--<div v-if="show" class="fixed inset-0 bg-[var(--color-primary)] bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">-->
    <div v-if="false" class="fixed inset-0 bg-[var(--color-primary)] bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-3xl relative overflow-hidden transition-all">
  
        <!-- Encabezado y paso actual -->
        <div class="mb-6 text-center">
          <h2 class="text-2xl font-bold text-[var(--color-primary)]">Registro de medidas corporales</h2>
          <p class="text-sm text-gray-500 mt-1">Paso {{ step + 1 }} de {{ totalSteps }}</p>
        </div>
  
        <!-- Contenido del paso -->
        <transition name="fade" mode="out-in">
          <div :key="step" class="flex gap-8 items-start">
            
            <!-- Imagen representativa 
            <img :src="currentStep.image" alt="Ilustración paso" class="w-48 h-auto rounded shadow-sm" />-->
            <img src="https://placehold.co/500x500" alt="Ilustración paso" class="w-48 h-auto rounded shadow-sm" />
  
            <!-- Campos -->
            <div class="flex flex-col flex-grow">
              <label class="text-gray-700 font-medium mb-2">{{ currentStep.label }}</label>
              <input
                v-model.number="userData[currentStep.model]"
                type="number"
                placeholder="Introduce valor en cm"
                class="input"
                required
              />
            </div>
          </div>
        </transition>
  
        <!-- Navegación -->
        <div class="mt-8 flex justify-between items-center">
          <button
            v-if="step > 0"
            @click="step--"
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
          >
            Atrás
          </button>
  
          <button
            @click="handleNext"
            class="ml-auto px-6 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-secondary)] transition"
          >
            {{ step === steps.length - 1 ? 'Finalizar' : 'Siguiente' }}
          </button>
        </div>
  
      </div>
    </div>
  </template>
  
  <style scoped>
.input {
  width: 100%;
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.5rem; /* rounded */
  padding: 0.5rem; /* p-2 */
  outline: none;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary);
  border-color: var(--color-primary);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

