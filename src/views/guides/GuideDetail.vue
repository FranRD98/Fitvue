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
    const docRef = doc(db, 'guides', guideId)
    const docSnap = await getDoc(docRef)

    console.log('Buscando guía: ' + guideId);
    console.log(guide);
    if (docSnap.exists()) {
      guide.value = docSnap.data()
    } else {
    }
  } catch (err) {
    console.error('Error al cargar la guía:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-12">
    <div v-if="loading" class="text-center text-gray-500">Cargando guía...</div>

    <div v-else-if="guide" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Imagen destacada -->
      <img
        :src="guide.imageUrl || 'https://placehold.co/800x400?text=Sin+imagen'"
        alt="Imagen de la guía"
        class="w-full h-96 object-cover"
      />

      <!-- Contenido -->
      <div class="p-6">
        <h1 class="text-4xl font-bold text-[var(--color-primary)] mb-4">{{ guide.title }}</h1>

        <!-- Metadatos -->
        <div class="text-sm text-gray-500 mb-4 flex flex-wrap gap-4">
          <span><strong>Autor:</strong> {{ guide.author }}</span>
          <span><strong>Categoría:</strong> {{ guide.category?.title || 'Sin categoría' }}</span>
          <span><strong>Publicado:</strong> {{ guide.created?.toDate().toLocaleDateString() || 'N/A' }}</span>
        </div>

        <!-- Descripción -->
        <p class="text-gray-700 text-lg mb-6">{{ guide.description }}</p>

        <!-- Contenido detallado -->
        <div class="space-y-8">
            <p class="text-gray-600 text-justify">{{ guide.content }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-red-500 text-center mt-10">No se encontró la guía.</div>
  </section>
</template>

