<script setup>
import CatalogView from '@/components/catalog/CatalogView.vue'

const diets = [
  {
    id: 1,
    title: 'Dieta cetogénica',
    image: '/img/dieta-keto.jpg',
    description: 'Alta en grasas, baja en carbohidratos'
  },
  {
    id: 2,
    title: 'Dieta mediterránea',
    image: '/img/dieta-mediterranea.jpg',
    description: 'Basada en alimentos frescos y saludables'
  },
  {
    id: 3,
    title: 'Dieta vegetariana',
    image: '/img/dieta-vegetariana.jpg',
    description: 'Sin carne, rica en vegetales y proteínas vegetales'
  }
]

const filters = [
  { label: 'Objetivo', options: ['Pérdida de peso', 'Mantenimiento', 'Ganancia muscular'] },
  { label: 'Restricciones', options: ['Sin gluten', 'Sin lactosa', 'Vegana'] }
]
</script>

<template>
  <CatalogView title="Dietas" :items="diets" routePrefix="/nutricion/dietas" :filters="filters" />
</template>
