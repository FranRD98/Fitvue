<script setup>
import { ref } from 'vue'

const step = ref(0)
const userData = ref({
  goal: '', 
  dietType: '',
  gender: '',
  allergies: '',
  name: '',
  age: '',
  height: '',
  weight: '',
  activity: 'sedentario'
});
const calorieResult = ref(null)

const nextStep = () => {
  if ((step.value === 0 && !userData.value.goal) ||
      (step.value === 1 && !userData.value.height) ||
      (step.value === 2 && !userData.value.age)) {
    alert('Por favor, completa este campo antes de continuar.')
    return
  }

  if (step.value < 3) {
    step.value++
  } else {
    calculateCalories()
  }
}

// Función que selecciona el objetivo y lo marcará cambiado el estilo
function selectGoal(goal) {
  userData.value.goal = goal;
}

const previousStep = () => {
  if (step.value > 0) step.value--
}

const calculateCalories = () => {
  const { weight, height, age, activity } = userData.value
  let bmr = 10 * weight + 6.25 * height - 5 * age + 5

  const activityLevels = {
    sedentario: 1.2,
    ligero: 1.375,
    moderado: 1.55,
    activo: 1.725
  }

  calorieResult.value = Math.round(bmr * activityLevels[activity])
}

const selectActivity = (activity) => {
  userData.value.activity = activity
}
</script>
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold text-gray-800 text-center mb-4">Calculadora de Calorías</h2>

      <transition name="fade" mode="out-in">
        <div v-if="calorieResult === null">
          <div v-if="step === 0" key="step1">
            <label class="block text-gray-600 mb-2">¿Cuál es tu objetivo?</label>
            <div class="flex flex-col gap-4">
              
              <!-- Opción Perder Grasa -->
              <div 
                @click="selectGoal('perder_grasa')"
                :class="{'bg-[var(--color-text-dark)] border-[var(--color-accent)]': userData.goal === 'perder_grasa'}"
                class="p-4 border border-gray-400 rounded-lg shadow-md flex items-center cursor-pointer transition gap-4">
                <div>
                  <img class="w-10 h-auto" src="/icons/Perder_grasa.webp">
                </div>
                <div>
                  <h4 class="text-xl font-bold text-[var(--color-text)]">Perder grasa</h4>
                  <p class="text-gray-500">Perder peso y ganar salud</p>
                </div>
              </div>

              <!-- Opción Ganar musculo -->
              <div 
                @click="selectGoal('ganar_musculo')"
                :class="{'bg-[var(--color-text-dark)] border-[#387373]': userData.goal === 'ganar_musculo'}"
                class="p-4 border rounded-lg shadow-md flex items-center cursor-pointer  transition gap-4">
                <div>
                  <img class="w-10 h-auto" src="/icons/Ganar_musculo.webp">
                </div>
                <div>
                  <h4 class="text-xl font-bold text-[var(--color-text)]">Ganar músculo</h4>
                  <p class="text-gray-500">Ganar volumen y ganar salud</p>
                </div>
              </div>

              <!-- Opción Mantener Peso -->
              <div 
                @click="selectGoal('mantener_peso')"
                :class="{'bg-[var(--color-text-dark)] border-[var(--color-accent)]': userData.goal === 'mantener_peso'}"
              class="p-4 border border-gray-400 rounded-lg shadow-md flex items-center cursor-pointer transition gap-4">
              <div>
                  <img class="w-10 h-auto" src="/icons/Mantener_peso.webp">
                </div>
                <div>
                  <h4 class="text-xl font-bold text-[var(--color-text)]">Mantener peso</h4>
                  <p class="text-gray-500">Y mejorar mi salud</p>
                </div>
              </div>
              
            </div>
          </div>

          <div v-else-if="step === 1" key="step2">
            <label class="block text-gray-600 mb-2">¿Cuál es tu altura? (cm)</label>
            <input v-model.number="userData.height" type="number" class="w-full border p-2 rounded-lg" />
          </div>

          <div v-else-if="step === 2" key="step3">
            <label class="block text-gray-600 mb-2">¿Cuál es tu edad?</label>
            <input v-model.number="userData.age" type="number" class="w-full border p-2 rounded-lg" />
          </div>

          <div v-else-if="step === 3" key="step4">
            <label class="block text-gray-600 mb-2">Nivel de actividad</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Opción Sedentario -->
              <div
                @click="selectActivity('sedentario')"
                :class="{'bg-gray-200': userData.activity === 'sedentario'}"
                class="p-4 bg-white rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gray-100 transition"
              >
                <span class="material-icons text-2xl mr-4">directions_run</span>
                <div>
                  <h4 class="text-xl font-semibold text-gray-800">Sedentario</h4>
                  <p class="text-gray-600">Poca o ninguna actividad física</p>
                </div>
              </div>

              <!-- Opción Ligero -->
              <div
                @click="selectActivity('ligero')"
                :class="{'bg-gray-200': userData.activity === 'ligero'}"
                class="p-4 bg-white rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gray-100 transition"
              >
                <span class="material-icons text-2xl mr-4">fitness_center</span>
                <div>
                  <h4 class="text-xl font-semibold text-gray-800">Ligero</h4>
                  <p class="text-gray-600">Ejercicio 1-3 veces por semana</p>
                </div>
              </div>

              <!-- Opción Moderado -->
              <div
                @click="selectActivity('moderado')"
                :class="{'bg-gray-200': userData.activity === 'moderado'}"
                class="p-4 bg-white rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gray-100 transition"
              >
                <span class="material-icons text-2xl mr-4">bike_scooter</span>
                <div>
                  <h4 class="text-xl font-semibold text-gray-800">Moderado</h4>
                  <p class="text-gray-600">Ejercicio 3-5 veces por semana</p>
                </div>
              </div>

              <!-- Opción Activo -->
              <div
                @click="selectActivity('activo')"
                :class="{'bg-gray-200': userData.activity === 'activo'}"
                class="p-4 bg-white rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gray-100 transition"
              >
                <span class="material-icons text-2xl mr-4">sports_soccer</span>
                <div>
                  <h4 class="text-xl font-semibold text-gray-800">Activo</h4>
                  <p class="text-gray-600">Ejercicio 6-7 veces por semana</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-6">
            <button v-if="step > 0" @click="previousStep" class="bg-gray-300 px-4 py-2 rounded-lg">
              Atrás
            </button>
            <button @click="nextStep" class="bg-accent text-white px-4 py-2 rounded-full">
              {{ step < 3 ? 'Siguiente' : 'Calcular' }}
            </button>
          </div>
        </div>

        <!-- RESULTADO -->
        <div v-else key="result">
          <h3 class="text-lg font-semibold text-gray-800">Calorías diarias recomendadas:</h3>
          <p class="text-2xl font-bold text-accent mt-2">{{ calorieResult }} kcal</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
.bg-accent {
  background-color: var(--color-accent);
}

.text-accent {
  color: var(--color-accent);
}

.material-icons {
  font-family: 'Material Icons';
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>