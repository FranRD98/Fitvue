<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'  // Importar useRoute y useRouter
import { getGuides, getCategories } from '@/firebase/guides'
import Card from '@/components/Card.vue'

const route = useRoute()  // Crear la instancia de route
const router = useRouter()  // Crear la instancia de router

const items = ref([])  
const categories = ref([])  
const selectedCategory = ref('Todas')  // Filtro inicial por 'Todas'
const currentPage = ref(1)
const itemsPerPage = 6

// Cargar guías y categorías al montar el componente
onMounted(async () => {
  items.value = await getGuides()  // Obtener guías
  categories.value = await getCategories()  // Obtener categorías

  // Establecer el filtro desde el parámetro de la URL
  const categoryParam = route.params.category
  if (categoryParam) {
    selectedCategory.value = decodeURIComponent(categoryParam)  // Actualizar el filtro
  }
})

// Verificar cambios en el parámetro de la URL
watch(() => route.params.category, (newCategory) => {
  selectedCategory.value = newCategory ? decodeURIComponent(newCategory) : 'Todas'
})

// Filtrar las guías según la categoría seleccionada
const filteredItems = computed(() => {
  if (selectedCategory.value === 'Todas') return items.value
  return items.value.filter(item => item.category?.title === selectedCategory.value)
})

// Paginación
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

// Actualizar la URL cuando cambia la categoría seleccionada
watch(selectedCategory, (newVal) => {
  const categoryPath = newVal === 'Todas' ? '/guias' : `/guias/${encodeURIComponent(newVal)}`
  router.push(categoryPath)  // Cambiar la URL sin redirigir
})
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-10">
    <div class="flex flex-col md:flex-row gap-6">
      
      <!-- Filters Aside -->
      <aside class="w-full md:w-1/4 space-y-6">
        <h1 class="text-3xl font-bold text-[var(--color-primary)]">Guías</h1>

        <div>
          <label class="block text-sm font-medium text-[var(--color-primary)] mb-2">Filtrar por categoría</label>
          <select
            class="w-full border border-gray-300 rounded p-2 text-gray-700"
            v-model="selectedCategory"
          >
            <option value="Todas">Todas</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.title"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
      </aside>

      <!-- Main content -->
      <div class="w-full">
        <h2 class="text-3xl font-bold text-[var(--color-primary)] mb-6">
          {{ selectedCategory === 'Todas' ? 'Todas las guías' : selectedCategory }}
        </h2>

        <!-- Mostrar guías si hay resultados -->
        <main v-if="paginatedItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="item in paginatedItems"
            :key="item.id"
            :item="item"
            :route-to="`/guias/${item.category?.title || 'general'}/${item.id}`"
          />
        </main>

        <!-- Si no hay coincidencias -->
        <div v-else class="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
          </svg>
          <p class="text-lg font-semibold">Sin resultados</p>
          <p class="text-sm">No se encontraron guías que coincidan con los filtros aplicados.</p>
        </div>

        <!-- Pagination -->
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
