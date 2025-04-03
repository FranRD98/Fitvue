<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

const route = useRoute()
const guideId = route.params.id
const guide = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const docRef = doc(db, 'Guias', guideId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      guide.value = docSnap.data()
    } else {
      console.error('Documento no encontrado')
    }
  } catch (err) {
    console.error('Error al cargar la guía:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="max-w-4xl mx-auto px-4 py-10">
    <div v-if="loading">Cargando...</div>
    <div v-else-if="guide">
      <h1 class="text-3xl font-bold text-[var(--color-primary)] mb-4">{{ guide.title }}</h1>
      <img :src="guide.coverImage" alt="" class="w-full rounded-lg mb-6" />

      <p class="text-gray-700 mb-6">{{ guide.description }}</p>

      <div class="space-y-6">
        <div v-for="(block, index) in guide.content" :key="index">
          <h3 class="text-xl font-semibold text-[var(--color-accent)] mb-2">{{ block.subtitle }}</h3>
          <p class="text-gray-600">{{ block.text }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-red-500">No se encontró la guía.</p>
    </div>
  </section>
</template>
