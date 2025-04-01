<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  title: String,
  items: Array,
  routePrefix: String,
  filters: Array,
  itemsPerPage: {
    type: Number,
    default: 6
  }
})

const contentType = computed(() => {
  const path = route.path

  if (path.includes('/entrenamiento')) return 'Entrenamientos'
  if (path.includes('/mindfulness')) return 'Mindfulness'
  if (path.includes('/estiramientos')) return 'Estiramientos'
  if (path.includes('/yoga')) return 'Yoga'
  if (path.includes('/dietas')) return 'Dietas'
  if (path.includes('/suplementacion')) return 'Suplementación'
  if (path.includes('/recetas')) return 'Recetas'

  // Default general page
  return 'Todos los elementos'
})

const currentPage = ref(1)

const filteredItems = computed(() => props.items)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  return filteredItems.value.slice(start, start + props.itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / props.itemsPerPage))

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-10">

    
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Filters -->
      <aside class="w-full md:w-1/4 space-y-4">
        <h1 class="text-3xl font-bold text-[var(--color-primary)] mb-8">{{ title }}</h1>

        <div v-for="(filter, index) in filters" :key="index">
          <label class="block font-medium text-[var(--color-primary)] mb-1">{{ filter.label }}</label>
          <select class="w-full border border-gray-300 rounded p-2 text-gray-700">
            <option disabled selected>Selecciona</option>
            <option v-for="option in filter.options" :key="option">{{ option }}</option>
          </select>
        </div>
      </aside>
      
      <div class="w-full">

      <h1 class="text-3xl font-bold text-[var(--color-primary)] mb-6">
        {{ contentType }}
      </h1>

      <!-- Items -->
      <main class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in paginatedItems"
          :key="item.id"
          class="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden"
        >
          <img :src="item.image" alt="" class="w-full h-60 object-cover" />
          <div class="p-4 flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-semibold text-[var(--color-primary)]">{{ item.title }}</h3>
              <p class="text-sm text-gray-500 mt-2">{{ item.description }}</p>
            </div>
            <router-link :to="`${routePrefix}/${item.id}`" class="text-[var(--color-accent)] mt-4 font-semibold">
              Ver más →
            </router-link>
          </div>
        </div>
      </main>
    </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8 space-x-2">
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
  </section>
</template>
