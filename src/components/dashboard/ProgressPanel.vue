<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'  // Importamos el store de Pinia

import { getReviewsById } from '@/supabase/services/progress'

const userStore = useUserStore()
const reviews = ref([])
const loading = ref(true)

onMounted(async () => {

  if (userStore) {

    try {
      reviews.value = await getReviewsById() // Ahora mismo carga sin filtrar

      console.log(reviews.value)
    } catch (error) {
      console.error('Error al obtener las reviews:', error)
    } finally {
      loading.value = false
    }
    } else {
      console.warn('Usuario no autenticado o sin ID válido')
      loading.value = false
    }
  })

  function formatDate(dateString) {
    if (!dateString) return 'Sin fecha'
      const date = new Date(dateString)
      return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

</script>

<template>
  <section v-if="true">
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Mi Progreso</h1>
      <router-link to="/dashboard/newReview" class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva revisión
      </router-link>
    </div>

    <!-- Loading / Empty State -->
    <div v-if="loading">Cargando revisiones...</div>
    <div v-else-if="reviews.length === 0" class="text-gray-600">No hay revisiones disponibles.</div>

    <!-- Dashboard -->
    <div v-else class="flex justify-between items-center m-4 border">
      <!-- Metricas -->
      <div>
        <h1 class="text-xl">Última revisión</h1>
      </div>

      <!-- Last reviews -->
      <div class="flex flex-col">
        <h1>Últimas reviews</h1>
            <router-link
              v-for="review in reviews"
              :key="review.id"
              :to="`/user/${review.uid}/${review.date}`"

              class="bg-[var(--color-primary)] text-white rounded-full px-4 py-1 shadow-lg"
            >
            
            <h3 class="text-lg">
              {{ formatDate(review.date) }}
            </h3>

          </router-link>
          </div>
    </div>
    
  </section>
</template>
  