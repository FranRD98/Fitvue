<script setup>
import { ref, computed, onMounted } from 'vue'
import { getRoutines } from '@/firebase/routines'
import Card from '@/components/Card.vue'

const items = ref([])
const currentPage = ref(1)
const itemsPerPage = 6

onMounted(async () => {
  items.value = await getRoutines()
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return items.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage))

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-10">
    <div class="flex flex-col gap-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Rutinas</h1>

      <!-- Rutinas -->
      <div>
        <main v-if="paginatedItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="item in paginatedItems"
            :key="item.id"
            :item="item"
            :route-to="`/rutinas/${item.category?.title || 'general'}/${item.id}`"
          />
        </main>

        <div v-else class="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
          </svg>
          <p class="text-lg font-semibold">Sin resultados</p>
          <p class="text-sm">No se encontraron rutinas disponibles.</p>
        </div>

        <!-- Paginación -->
        <div class="flex justify-center mt-10 space-x-2" v-if="totalPages > 1">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[ 
              'px-4 py-2 rounded',
              page === currentPage ? 'bg-[var(--color-primary)] text-white' : 'bg-white border'
            ]"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
