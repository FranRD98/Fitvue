<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import CatalogView from '@/components/Card.vue'

const route = useRoute()
const items = ref([])
const categoryParam = computed(() => route.params.category?.toLowerCase())

onMounted(async () => {
  const snapshot = await getDocs(collection(db, 'guides'))
  const allGuides = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  items.value = allGuides.filter(guide =>
    guide.category?.title?.toLowerCase() === categoryParam.value
  )
})
</script>

<template>
  <CatalogView
    :title="`Guías de ${route.params.category}`"
    :items="items"
    :routePrefix="`/guias/${route.params.category}`"
    :filters="[]"
  />
</template>
