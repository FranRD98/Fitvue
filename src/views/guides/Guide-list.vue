<script setup>
import { ref, computed, onMounted } from 'vue'
import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import Card from '@/components/Card.vue'

const items = ref([])
const categories = ref([])
const selectedCategory = ref('Todas')
const currentPage = ref(1)
const itemsPerPage = 6

onMounted(async () => {
  const guideSnap = await getDocs(collection(db, 'guides'))
  items.value = guideSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  const catSnap = await getDocs(collection(db, 'categories'))
  categories.value = catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
})

const filteredItems = computed(() => {
  if (selectedCategory.value === 'Todas') return items.value
  return items.value.filter(item => item.category?.title === selectedCategory.value)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-10">
    <div class="flex flex-col md:flex-row gap-6">
      
      <!-- Filters Aside -->
      <aside class="w-full md:w-1/4 space-y-6">
        <h1 class="text-3xl font-bold text-[var(--color-primary)]">Guías</h1>

        <div>
          <label class="block text-sm font-medium text-[var(--color-primary)] mb-2">Filtrar por categoría</label>
          <select v-model="selectedCategory" class="w-full border border-gray-300 rounded p-2 text-gray-700">
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

        <main class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="item in paginatedItems"
            :key="item.id"
            :item="item"
            :route-to="`/guias/${item.category?.title}/${item.id}`"
          />
        </main>

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
