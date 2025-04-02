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

const macros = ref({ carbs: 0, proteins: 0, fats: 0 })

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

// Función que selecciona la actividad y lo marcará cambiado el estilo
const selectActivity = (activity) => {
  userData.value.activity = activity
}

const previousStep = () => {
  if (step.value > 0) step.value--
}

const calorieResult = ref(null)

  const restart = () => {
    step.value = 0
    calorieResult.value = null
    macros.value = { carbs: 0, proteins: 0, fats: 0 }
    userData.value = {
      goal: '', 
      dietType: '',
      gender: '',
      allergies: '',
      name: '',
      age: '',
      height: '',
      weight: '',
      activity: 'sedentario'
    }
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

  const total = Math.round(bmr * activityLevels[activity])
  calorieResult.value = total

  // Macronutrientes: 50% carbs, 20% proteins, 30% fats
  macros.value = {
    carbs: Math.round((total * 0.5) / 4),     // 4 kcal/g
    proteins: Math.round((total * 0.2) / 4),  // 4 kcal/g
    fats: Math.round((total * 0.3) / 9)       // 9 kcal/g
  }

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
            <div class="flex flex-col gap-4">
              
              <!-- Opción Sendentario -->
              <div 
                @click="selectActivity('sedentario')"
                :class="{'bg-gray-200': userData.activity === 'sedentario'}"
                class="p-4 border border-gray-400 rounded-lg shadow-md flex items-center cursor-pointer transition gap-4">
                <div>
                  <img class="w-10 h-auto" src="/icons/ic_low_activity.webp">
                </div>
                <div>
                  <h4 class="text-xl font-bold text-[var(--color-text)]">Sedentario</h4>
                  <p class="text-gray-500">Poca o ninguna actividad física</p>
                </div>
              </div>

              <!-- Opción Ligero -->
              <div 
                @click="selectActivity('ligero')"
                :class="{'bg-gray-200': userData.activity === 'ligero'}"
                class="p-4 border border-gray-400 rounded-lg shadow-md flex items-center cursor-pointer transition gap-4">
                <div>
                  <img class="w-10 h-auto" src="/icons/ic_moderate_activity.webp">
                </div>
                <div>
                  <h4 class="text-xl font-bold text-[var(--color-text)]">Ligero</h4>
                  <p class="text-gray-500">Ejercicio 1-3 veces por semana</p>
                </div>
              </div>

              <!-- Opción Moderado -->
              <div 
                @click="selectActivity('moderado')"
                :class="{'bg-gray-200': userData.activity === 'moderado'}"
                class="p-4 border border-gray-400 rounded-lg shadow-md flex items-center cursor-pointer transition gap-4">
                <div>
                  <img class="w-10 h-auto" src="/icons/ic_high_activity.webp">
                </div>
                <div>
                  <h4 class="text-xl font-bold text-[var(--color-text)]">Moderado</h4>
                  <p class="text-gray-500">Ejercicio 3-5 veces por semana</p>
                </div>
              </div>

              <!-- Opción Activo -->
              <div 
                @click="selectActivity('activo')"
                :class="{'bg-gray-200': userData.activity === 'activo'}"
                class="p-4 border border-gray-400 rounded-lg shadow-md flex items-center cursor-pointer transition gap-4">
                <div>
                  <img class="w-10 h-auto" src="/icons/ic_athletic_activity.webp">
                </div>
                <div>
                  <h4 class="text-xl font-bold text-[var(--color-text)]">Activo</h4>
                  <p class="text-gray-500">Ejercicio 6-7 veces por semana</p>
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
        <div v-else key="result" class="text-center space-y-6">
          <h3 class="text-xl font-semibold text-gray-800">¡Aquí tienes tu resultado!</h3>

          <div class="text-3xl font-bold text-accent">
            {{ calorieResult }} kcal / día
          </div>

          <div class="text-left space-y-4 max-w-sm mx-auto">
            <div class="flex justify-between text-gray-700">
              <span>🥗 Carbohidratos (50%)</span>
              <span>{{ macros.carbs }}g</span>
            </div>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div class="bg-yellow-400 h-full" style="width: 50%"></div>
            </div>

            <div class="flex justify-between text-gray-700">
              <span>🍗 Proteínas (20%)</span>
              <span>{{ macros.proteins }}g</span>
            </div>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div class="bg-purple-500 h-full" style="width: 20%"></div>
            </div>

            <div class="flex justify-between text-gray-700">
              <span>🥑 Grasas (30%)</span>
              <span>{{ macros.fats }}g</span>
            </div>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div class="bg-orange-500 h-full" style="width: 30%"></div>
            </div>
          </div>

          <p class="text-sm text-gray-500 mt-6">
            Estos valores son orientativos. Para un plan personalizado, crea tu cuenta.
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <router-link to="/empezar" class="inline-block bg-[var(--color-accent)] text-white px-6 py-2 rounded-full hover:bg-[var(--color-primary)]">
              Crear cuenta gratuita
            </router-link>

            <button @click="restart" class="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400">
              Reiniciar
            </button>
          </div>
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