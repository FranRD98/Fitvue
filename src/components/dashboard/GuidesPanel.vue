<script setup>
import { ref, onMounted } from 'vue'
import GuideFormModal from '@/components/dashboard/GuideFormModal.vue'
import { getGuides } from '@/firebase/guides.js'

const guides = ref([])
const loading = ref(true)
const showModal = ref(false)

onMounted(async () => {
  try {
    guides.value = await getGuides()
  } catch (error) {
    console.error('Error al obtener las guías:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-10">
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Guías</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva guía
      </button>
    </div>

    <!-- Modal -->
    <GuideFormModal :show="showModal" @close="showModal = false" @saved="console.log('Guía guardada')" />

    <!-- Loading / Empty State -->
    <div v-if="loading">Cargando guías...</div>
    <div v-else-if="guides.length === 0" class="text-gray-600">No hay guías disponibles.</div>

    <!-- Grid de tarjetas -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
      
    <router-link
        v-for="guide in guides"
        :key="guide.id"
        :to="`/guias/${guide.category.title}/${guide.id}`"

        class="bg-[#e4e4e4] rounded-xl shadow-lg overflow-hidden flex flex-col"
      >
        <img
          :src="guide.imageUrl || 'https://placehold.co/600x400?text=Sin+Portada&font=poppins'"
          alt="Imagen portada"
          class="w-full h-48 object-cover"
        />
        <div class="p-5 flex flex-col flex-grow">
          <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-1">{{ guide.title }}</h3>
          <p class="text-sm text-gray-500 mb-3 line-clamp-3">{{ guide.description }}</p>

          <div class="text-xs text-gray-400 mt-auto">
            <p><strong>Autor:</strong> {{ guide.author }}</p>
            <p><strong>Fecha:</strong> {{ guide.created?.toDate().toLocaleDateString() || 'N/A' }}</p>
          </div>

          <div class="mt-4 flex justify-between items-center">
            <p class="text-xs text-gray-600 mt-auto"><strong>Categoría:</strong> {{ guide.category.title }}</p>

            <div class="flex gap-1">
                <button
              @click="console.log('Editar guía', guide)"
              class="bg-[#999999] hover:bg-[var(--color-primary)] p-2 rounded-full transition duration-200 hover:-translate-y-1"
            >
            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
            </button>
            <button
              @click="console.log('Eliminar guía', guide)"
              class="bg-[#999999] hover:bg-red-600 p-2 rounded-full transition duration-200 hover:-translate-y-1"
            >
            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>            </button>
            </div>
            
          </div>
        </div>
      </router-link>

      
    </div>
  </section>
</template>
