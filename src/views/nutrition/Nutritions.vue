<script setup>
import CatalogView from '@/components/catalog/CatalogView.vue'

const nutrition = [
  {
    id: 1,
    title: 'Dietas',
    image: '/img/dieta-keto.jpg',
    description: 'Dietas',
    link: '/nutricion/dietas'
  },
  {
    id: 2,
    title: 'Suplementación',
    image: '/img/dieta-mediterranea.jpg',
    description: 'Guías de suplementación',
    link: '/nutricion/suplementacion'
  },
  {
    id: 3,
    title: 'Recetas',
    image: '/img/dieta-vegetariana.jpg',
    description: 'Recetas fitness',
    link: '/nutricion/recetas'
  }
]

const filters = [
  { label: 'Objetivo', options: ['Pérdida de peso', 'Mantenimiento', 'Ganancia muscular'] },
  { label: 'Restricciones', options: ['Sin gluten', 'Sin lactosa', 'Vegana'] }
]
</script>

<template>
  <CatalogView title="Nutrición" :items="nutrition" routePrefix="/nutricion" :filters="filters" />
</template>
