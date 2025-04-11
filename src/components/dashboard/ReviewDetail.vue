<script setup>
import { ref, onMounted } from 'vue'
import { getReviewById } from '@/firebase/progress.js'
import { getAuth } from 'firebase/auth'
import router from '@/router'

const review = ref({})
const loading = ref(true)

onMounted(async () => {
  const auth = getAuth()
  const currentUser = auth.currentUser

  if (currentUser.uid === router.currentRoute.value.params.uid) {
    try {
      review.value = await getReviewById(
        currentUser.id,
        router.currentRoute.value.params.date
      )
      console.log(review.value)
    } catch (error) {
        console.error('Error al obtener la review:', error)
    } finally {
        loading.value = false
    }
  } else {
        console.warn('No tienes permisos para ver esta revisión')
        loading.value = false
  }
})
</script>

<template>
    <!-- Loading / Empty State -->
    <div v-if="loading">Cargando revisión...</div>
    <div v-else>
        <h1>Peso: {{ review.weight }}</h1>
    </div>
</template>