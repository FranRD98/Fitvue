  <script setup>
    defineProps({
      title: String,
      price: String,
      buttonText: String,
      highlighted: Boolean,
      planId: Number,
      badgeText: {
        type: String,
        default: 'Recomendado'
      },
      features: {
        type: Array,
        default: () => []
      }
    })
  </script>

<template>
    <div
      class="relative rounded-xl border-2 border-[var(--color-primary)] shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col justify-between h-full"
      :class="highlighted ? 'border-yellow-400' : ''"
    >
      <div v-if="highlighted" class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-sm px-3 py-1 rounded-bl-lg font-semibold text-[var(--color-text)]">
        {{ badgeText }}
      </div>
  
      <h3 class="text-2xl font-bold text-[var(--color-primary)] text-center mt-4">{{ title }}</h3>
      <p class="text-lg mt-2 text-[var(--color-text)] text-center">{{ price }}</p>
  
      <hr class="my-6 border-t-2 border-[var(--color-bg-light)]">
  
      <ul class="text-left space-y-3 text-[var(--color-text)]">
        <li
          v-for="(feature, i) in features"
          :key="i"
          class="flex items-center"
          :class="!feature.active ? 'text-gray-400 line-through' : ''"
        >
          <!-- Ícono dinámico: ✓ si está activo, ✗ si no -->
          <svg
            v-if="feature.active"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 mr-2 text-[var(--color-primary)]"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 mr-2 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
  
          {{ feature.label }}
        </li>
      </ul>
      
      <hr class="my-6 border-t-2 border-[var(--color-bg-light)]">

      <router-link :to="`/empezar/${planId}`"
      class=" bg-[var(--color-primary)] text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-[var(--color-secondary)]">
        {{ buttonText }}
      </router-link>
    </div>
  </template>
  

  