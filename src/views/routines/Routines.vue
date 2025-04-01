<script setup>
import CatalogView from '@/components/catalog/CatalogView.vue'

const routines = [
  {
    id: 1,
    title: 'Full Body en Casa',
    image: '/img/rutina1.jpg',
    description: 'Sin material, ideal para comenzar'
  },
  {
    id: 2,
    title: 'Cardio HIIT',
    image: '/img/rutina2.jpg',
    description: 'Alta intensidad en poco tiempo'
  },
  {
    id: 3,
    title: 'Yoga para principiantes',
    image: '/img/yoga.jpg',
    description: 'Ideal para mejorar flexibilidad y mente'
  }
]

const filters = [
  { label: 'Nivel', options: ['Principiante', 'Intermedio', 'Avanzado'] },
  { label: 'Duración', options: ['< 20 min', '20-40 min', '40+ min'] }
]
</script>

<template>
  <CatalogView title="Rutinas" :items="routines" routePrefix="/rutinas" :filters="filters" />
</template>
