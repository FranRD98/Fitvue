<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import CatalogView from '@/components/catalog/CatalogView.vue'

const guides = ref([])

const filters = [
  { label: 'Tipo', options: ['Vitaminas', 'Minerales', 'Ácidos grasos', 'Proteínas'] },
]

const loadGuides = async () => {
  const querySnapshot = await getDocs(collection(db, 'Guias')) // <- Nombre exacto de la colección
  guides.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

onMounted(() => {
  loadGuides()
})
</script>

<template>
  <CatalogView title="Guías de suplementación" :items="guides" routePrefix="/nutricion/suplementacion" :filters="filters" />
</template>
