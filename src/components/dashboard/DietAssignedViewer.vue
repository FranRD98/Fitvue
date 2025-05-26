<script setup>
  const props = defineProps({
    show: Boolean,
    diet: Object
  })

  defineEmits(['close'])

  console.log(props.diet)
</script>

<template>

  <div v-if="show" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center px-4">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[90vh] flex flex-col relative overflow-hidden">
      
      <!-- Botón cerrar -->
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition" aria-label="Cerrar">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>


      <div class="p-6 overflow-y-auto flex-1">
        <header class="space-y-2 border-b pb-4">
          <h1 class="text-3xl font-bold text-[var(--color-primary)]">{{ diet.title }}</h1>
          <p class="text-gray-600">{{ diet.description }}</p>
          <p class="text-sm text-gray-400">Total de calorías: {{ diet.totalCalories.toFixed(0) }} kcal</p>
        </header>

        <div v-for="(meal, index) in diet.meals" :key="index" class="mt-6">
          <h2 class="text-2xl font-semibold text-[var(--color-secondary)]">{{ meal.name }}</h2>
          <ul class="mt-2 space-y-2">
            <li v-for="(plate, pIndex) in meal.items" :key="pIndex" class="bg-gray-100 p-4 rounded-lg">
              <h3 class="font-semibold">{{ plate.name }}</h3>
              <ul class="mt-1 text-sm text-gray-700">
                <li v-for="(item, iIndex) in plate.items" :key="iIndex">
                                    <pre>{{ item }}</pre>


                  <!-- {{ item.ingredient.name }} - {{ item.quantity }}g-->
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  </div>

</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
