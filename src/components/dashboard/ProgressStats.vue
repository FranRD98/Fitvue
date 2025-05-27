<script setup>
import { computed } from 'vue'
const props = defineProps({
  reviews: Array
})

// Ordenar revisiones por fecha
const sortedReviews = computed(() => {
  return [...props.reviews].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
})

const first = computed(() => sortedReviews.value[0])
const last = computed(() => sortedReviews.value[sortedReviews.value.length - 1])

const difference = computed(() => {
  if (!first.value || !last.value) return null

  return {
    weight: (last.value.weight - first.value.weight).toFixed(1),
    bodyFat: (last.value.body_fat - first.value.body_fat).toFixed(1),
    muscleMass: (last.value.muscle_mass - first.value.muscle_mass).toFixed(1)
  }
})
</script>

<template>
  <div class="bg-white rounded-xl shadow p-6 space-y-4">
    <h3 class="text-lg font-semibold text-[var(--color-primary)]">Progreso corporal</h3>

    <div v-if="first && last" class="space-y-2">
      <div>
        <p class="text-sm text-gray-500">Peso corporal</p>
        <p :class="['font-bold', difference.weight < 0 ? 'text-green-600' : 'text-red-500']">
          {{ first.weight }} kg → {{ last.weight }} kg
          ({{ difference.weight > 0 ? '+' : '' }}{{ difference.weight }} kg)
        </p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Grasa corporal</p>
        <p :class="['font-bold', difference.bodyFat < 0 ? 'text-green-600' : 'text-red-500']">
          {{ first.body_fat }}% → {{ last.body_fat }}%
          ({{ difference.bodyFat > 0 ? '+' : '' }}{{ difference.bodyFat }}%)
        </p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Masa muscular</p>
        <p :class="['font-bold', difference.muscleMass > 0 ? 'text-green-600' : 'text-red-500']">
          {{ first.muscle_mass }} kg → {{ last.muscle_mass }} kg
          ({{ difference.muscleMass > 0 ? '+' : '' }}{{ difference.muscleMass }} kg)
        </p>
      </div>
    </div>

    <p v-else class="text-sm text-gray-400">No hay suficientes revisiones para mostrar progreso.</p>
  </div>
</template>
