<template>
  <section class="max-w-7xl mx-auto px-6 py-20 gap-4 bg-white text-center flex flex-col items-center">
    <h2 class="text-xl font-semibold mb-6 text-[var(--color-primary)]">/ Qué podemos hacer por ti</h2>

    <p class="text-lg text-[var(--color-text)] mb-12">
      Ya sea que busques perder peso, ganar músculo o mejorar tu salud, FitVue tiene un plan para ti. Nuestro enfoque personalizado se adapta a todas las edades, condiciones físicas y objetivos.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="relative h-[22rem] rounded-xl overflow-hidden shadow-lg group cursor-pointer flex flex-col items-center justify-between"
      >
        <!-- Imagen de fondo -->
        <div
          class="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
          :style="`background-image: url(${card.image})`"
        ></div>

        <!-- Overlay más claro -->
        <div class="absolute inset-0 bg-black/30 z-10"></div>

        <!-- Contenido centrado horizontal y distribuido verticalmente -->
        <div class="relative z-20 flex flex-col justify-between items-center h-full w-full px-6 py-6 text-white text-center">
          <h3 class="text-xl">{{ card.title }}</h3>
          <button class="bg-white text-[var(--color-primary)] font-semibold px-4 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition">
            Más información
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    image: '/rutina.jpg',
    title: 'Rutinas Personalizadas'
  },
  {
    image: '/dieta.jpg',
    title: 'Dietas Personalizadas'
  },
  {
    image: '/monitoreo.jpg',
    title: 'Monitoreo de Progreso'
  },
  {
    image: '/trainer.jpg',
    title: 'Entrenadores Personalizados'
  }
]
</script>
