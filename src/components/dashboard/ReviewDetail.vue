<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getReviewById } from '@/supabase/services/progress'

const route = useRoute()
const review = ref(null)
const loading = ref(true)

const fieldLabels = {
  weight: 'Peso corporal',
  neck: 'Cuello',
  shoulders: 'Hombros',
  chest: 'Pecho',
  biceps_relaxed: 'Bíceps relajado',
  biceps_flexed: 'Bíceps contraído',
  forearm: 'Antebrazo',
  wrist: 'Muñeca',
  waist: 'Cintura',
  abdomen: 'Abdomen',
  hips: 'Cadera',
  quadriceps: 'Cuádriceps',
  calves: 'Gemelos'
}

const formattedFields = computed(() => {
  if (!review.value) return []
  return Object.entries(fieldLabels)
    .map(([key, label]) => ({ key, label, value: review.value[key] }))
    .filter(entry => entry.value !== null && entry.value !== undefined)
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

onMounted(async () => {
  const { userId, reviewId } = route.params
  if (!userId || !reviewId) return

  try {
    review.value = await getReviewById(userId, reviewId)
  } catch (error) {
    console.error('Error al cargar la revisión:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
<section class="w-full max-w-7xl mx-auto p-6">
    <div v-if="loading" class="text-center text-gray-500 py-10">Cargando revisión...</div>

    <div v-else-if="!review" class="text-center text-gray-500 py-10">No se encontró la revisión.</div>

    <div v-else>
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-[var(--color-primary)]">Revisión del {{ formatDate(review.created_at) }}</h1>
        <p class="text-sm text-gray-500 mt-1">Visualiza tus medidas corporales detalladas.</p>
      </div>

      <!-- Medidas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="item in formattedFields"
          :key="item.key"
          class="bg-gray-50 p-4 rounded-lg shadow-sm"
        >
          <h3 class="text-sm text-gray-500">{{ item.label }}</h3>
          <p class="text-xl font-semibold text-[var(--color-primary)]">{{ item.value }} cm</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  animation: fadeSlide 0.3s ease-out;
}
@keyframes fadeSlide {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
