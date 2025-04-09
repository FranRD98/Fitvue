<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import Card from '@/components/Card.vue'

const route = useRoute()

const items = ref([])
const categories = ref([])
const selectedCategory = ref('')
const loading = ref(true)

const loadData = async () => {
  loading.value = true

  // 1. Obtener guías
  const snapshot = await getDocs(collection(db, 'guides'))
  const allGuides = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  // 2. Obtener categorías
  const catSnap = await getDocs(collection(db, 'categories'))
  categories.value = catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  // 3. Filtro por categoría de la URL
  const categoryFromRoute = route.params.category?.toLowerCase()
  selectedCategory.value = categoryFromRoute || 'todas'

  items.value = allGuides.filter(
    g => g.category?.title?.toLowerCase() === categoryFromRoute
  )

  loading.value = false
}

// Ejecutar en carga inicial
onMounted(loadData)

// Volver a cargar si cambia la categoría en la URL
watch(() => route.params.category, loadData)

const currentPage = ref(1)
const itemsPerPage = 6

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
    <div class="flex flex-col md:flex-row gap-6">
      
      <!-- Filtros -->
      <aside class="w-full md:w-1/4 space-y-6">
        <h1 class="text-3xl font-bold text-[var(--color-primary)] capitalize">
          {{ route.params.category }}
        </h1>

        <div>
          <label class="block text-sm font-medium text-[var(--color-primary)] mb-2">Filtrar por categoría</label>
          <select v-model="selectedCategory" class="w-full border border-gray-300 rounded p-2 text-gray-700" @change="loadData">
            <option disabled selected>Selecciona una</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.title.toLowerCase()">
              {{ cat.title }}
            </option>
          </select>
        </div>
      </aside>

      <!-- Contenido principal -->
      <div class="w-full">
        <h2 class="text-3xl font-bold text-[var(--color-primary)] mb-6 capitalize">
          Guías de {{ route.params.category }}
        </h2>

        <div v-if="loading" class="text-gray-500">Cargando guías...</div>

        <div v-else-if="items.length === 0" class="text-gray-500">No hay guías disponibles en esta categoría.</div>

        <main v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="item in paginatedItems"
            :key="item.id"
            :item="item"
            :route-to="`/guias/${item.category?.title}/${item.id}`"
          />
        </main>

        <!-- Paginación -->
        <div class="flex justify-center mt-10 space-x-2" v-if="totalPages > 1">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[ 'px-4 py-2 rounded', page === currentPage ? 'bg-[var(--color-primary)] text-white' : 'bg-white border' ]"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
