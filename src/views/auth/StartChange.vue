<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const step = ref(0)
const userData = ref({
  name:'',
  last_name:'',
  email:'',
  password:'',
  birthday:'',
  role:'',
  suscriptionPlan:'',
  height: '',
  weight: '',
  age: '',
  activity: 'sedentario',
  avatar: '',
  completedForm: '',
  created:'',
  goal: '', 
  dietType: '',
  gender: '',
  allergies: '',
});

const macros = ref({ carbs: 0, proteins: 0, fats: 0 })

const nextStep = () => {
  if ((step.value === 1 && !userData.value.name && !userData.value.last_name) ||
      (step.value === 2 && !userData.value.gender) ||
      (step.value === 3 && !userData.value.goal) ||
      (step.value === 4 && !userData.value.age) ||
      (step.value === 5 && !userData.value.height) ||
      (step.value === 6 && !userData.value.weight) ||
      (step.value === 7 && !userData.value.activity)
    ) {
    alert('Por favor, completa este campo antes de continuar.')
    return
  }

  if (step.value < 6) {
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

// Función que selecciona el genero
const selectGenre = (gender) => {
  userData.value.gender = gender
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
      name:'',
      last_name:'',
      email:'',
      password:'',
      birthday:'',
      role:'',
      suscriptionPlan:'',
      height: '',
      weight: '',
      age: '',
      activity: 'sedentario',
      avatar: '',
      completedForm: '',
      created:'',
      goal: '', 
      dietType: '',
      gender: '',
      allergies: '',
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

const goToRegister = () => {
  localStorage.setItem('userData', JSON.stringify(userData.value))
  router.push('/registrarse')
}

</script>
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold text-gray-800 text-center mb-4">Calculadora de Calorías</h2>

      <transition name="fade" mode="out-in">
        <div v-if="calorieResult === null">

          <!-- STEP 1 - BASIC INFORMATION -->
          <div v-if="step === 0" key="step0">
            <label class="block text-gray-600 mb-2 ">¿Cuál es tu nombre y apellidos?</label>

            <div class="flex flex-col gap-4">
              <input v-model.string="userData.name" type="text" class="w-full border p-2 rounded-lg" placeholder="Nombre" />
              <input v-model.string="userData.last_name" type="text" class="w-full border p-2 rounded-lg" placeholder="Apellido"/>
            </div>
          </div>

          <!-- STEP 2 - GENDER -->
           <div v-else-if="step === 1" key="step1">
            <label class="block text-gray-600 mb-2">¿Cuál es tu género?</label>

            <div class="flex flex-col gap-4">
              <!-- MALE -->
              <div 
                  @click="selectGenre('male')"
                  :class="{'bg-gray-200': userData.gender === 'male'}"
                  class="p-4 border border-gray-400 rounded-lg shadow-md flex items-center cursor-pointer transition gap-4">
                  <div>
                    <img class="w-10 h-auto" src="/icons/gender_man.svg">
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-[var(--color-text)]">Hombre</h4>
                  </div>
              </div>

            <!-- FEMALE -->
            <div 
              @click="selectGenre('female')"
              :class="{'bg-gray-200': userData.gender === 'female'}"
              class="p-4 border border-gray-400 rounded-lg shadow-md flex items-center cursor-pointer transition gap-4">
              <div>
                <img class="w-10 h-auto" src="/icons/gender_woman.svg">
              </div>
              <div>
                <h4 class="text-xl font-bold text-[var(--color-text)]">Mujer</h4>
              </div>
            </div>

            <!-- OTHER -->
            <div 
              @click="selectGenre('other')"
              :class="{'bg-gray-200': userData.gender === 'other'}"
              class="p-4 border border-gray-400 rounded-lg shadow-md flex items-center cursor-pointer transition gap-4">
              <div>
                <img class="w-10 h-auto" src="/icons/gender_other.svg">
              </div>
              <div>
                <h4 class="text-xl font-bold text-[var(--color-text)]">Otro</h4>
              </div>
            </div>
           </div>
           </div>

           <!-- STEP 3 - GOAL -->
          <div v-else-if="step === 2" key="step2">
            <label class="block text-gray-600 mb-2">¿Cuál es tu objetivo?</label>
            <div class="flex flex-col gap-4">
              
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

          <!-- STEP 4 - AGE -->
          <div v-else-if="step === 3" key="step3">
            <label class="block text-gray-600 mb-2">¿Cuál es tu edad?</label>
            <input v-model.number="userData.age" type="number" class="w-full border p-2 rounded-lg" />
          </div>

          <!-- STEP 5 - HEIGHT -->
          <div v-else-if="step === 4" key="step4">
            <label class="block text-gray-600 mb-2">¿Cuál es tu altura? (cm)</label>
            <input v-model.number="userData.height" type="number" class="w-full border p-2 rounded-lg" />
          </div>

          <!-- STEP 6 - WEIGHT -->
          <div v-else-if="step === 5" key="step5">
            <label class="block text-gray-600 mb-2">¿Cuál es tu peso? (kg)</label>
            <input v-model.number="userData.weight" type="number" class="w-full border p-2 rounded-lg" />
          </div>

          <!-- STEP 7 - ACTIVITY -->
          <div v-else-if="step === 6" key="step6">
          <label class="block text-gray-600 mb-2">Nivel de actividad</label>
            <div class="flex flex-col gap-4">
              
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
              {{ step < 7 ? 'Siguiente' : 'Calcular' }}
            </button>
          </div>
                
        </div>

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
            <button
            @click="goToRegister"
            class="inline-block bg-[var(--color-accent)] text-white px-6 py-2 rounded-full hover:bg-[var(--color-primary)]"
          >
            Crear cuenta gratuita
          </button>

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