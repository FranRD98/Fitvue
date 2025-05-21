<template>
  <div class="bg-white rounded-xl shadow p-4 flex flex-col justify-between h-full">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-sm text-gray-500">{{ title }}</h3>
      <span class="text-2xl">{{ icon }}</span>
    </div>
    <div class="text-2xl font-bold text-[var(--color-primary)]">
      <slot>{{ value }}</slot>
    </div>
    <button v-if="button" class="mt-4 text-sm text-white bg-[var(--color-primary)] px-3 py-1 rounded hover:bg-[var(--color-secondary)]">
      Ejecutar
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  button: Boolean
})
</script>
