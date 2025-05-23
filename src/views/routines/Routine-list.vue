<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRoutines, getRoutineCategories } from '@/supabase/services/routines.js'
import Card from '@/components/Card.vue'

const route = useRoute()
const router = useRouter()

const items = ref([])
const categories = ref([])
const selectedCategory = ref('Todas')
const currentPage = ref(1)
const itemsPerPage = 6

// Cargar datos y aplicar categoría desde la URL
onMounted(async () => {
  items.value = await getRoutines()
  categories.value = await getRoutineCategories()

  const categoryParam = route.params.category
  if (categoryParam) {
    const match = categories.value.find(cat =>
      cat.name.toLowerCase() === decodeURIComponent(categoryParam).toLowerCase()
    )
    selectedCategory.value = match ? match.name : 'Todas'
  }
})

// Si cambia la URL, actualiza la categoría seleccionada
watch(() => route.params.category, (newCategory) => {
  const match = categories.value.find(cat =>
    cat.name.toLowerCase() === decodeURIComponent(newCategory || '').toLowerCase()
  )
  selectedCategory.value = match ? match.name : 'Todas'
})

// Actualiza la URL cuando cambia la categoría desde el select
watch(selectedCategory, (newVal) => {
  const categoryPath = newVal === 'Todas'
    ? '/rutinas'
    : `/rutinas/categoria/${encodeURIComponent(newVal)}`
  router.push(categoryPath)
})

// Rutinas filtradas según categoría seleccionada
const filteredItems = computed(() => {
  if (selectedCategory.value === 'Todas') return items.value

  const selectedCat = categories.value.find(cat =>
    cat.name.toLowerCase() === selectedCategory.value.toLowerCase()
  )

  if (!selectedCat) return []

  return items.value.filter(item => item.id_category === selectedCat.id)
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

// Ruta amigable por ID de categoría
function getCategoryNameById(id_category) {
  const cat = categories.value.find(c => c.id === id_category)
  const title = cat?.title || 'general'

  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-10">
    <div class="flex flex-col md:flex-row gap-6">

      <!-- Filtros -->
      <aside class="w-full md:w-1/4 space-y-6">
        <h1 class="text-3xl font-bold text-[var(--color-primary)]">Rutinas</h1>

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
              :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </aside>

      <!-- Contenido principal -->
      <div class="w-full">
        <h2 class="text-3xl font-bold text-[var(--color-primary)] mb-6">
          {{ selectedCategory === 'Todas' ? 'Todas las rutinas' : selectedCategory }}
        </h2>

        <!-- Resultados -->
        <main
          v-if="paginatedItems.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <Card
            v-for="item in paginatedItems"
            :key="item.id"
            :item="item"
            :categories="categories"
            :route-to="`/rutinas/${getCategoryNameById(item.id_category)}/${item.id}`"
          />
        </main>

        <!-- Sin resultados -->
        <div
          v-else
          class="col-span-full flex flex-col items-center justify-center py-12 text-gray-500"
        >
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