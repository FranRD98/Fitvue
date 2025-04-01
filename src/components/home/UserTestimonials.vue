<script setup>
import { ref } from 'vue'

const testimonios = ref([
  {
    nombre: "María López",
    imagen: "https://placehold.co/80/387373/FFF?text=ML&font=poppins",
    comentario: "Gracias a FitVue, logré perder 10 kg en 3 meses. Su método es increíblemente efectivo y fácil de seguir.",
    progreso: "-10 kg"
  },
  {
    nombre: "Carlos Pérez",
    imagen: "https://placehold.co/80/387373/FFF?text=CP&font=poppins",
    comentario: "Nunca había logrado mantenerme en forma hasta que encontré FitVue. Su enfoque es realmente personalizado.",
    progreso: "+5 kg músculo"
  },
  {
    nombre: "Ana Torres",
    imagen: "https://placehold.co/80/387373/FFF?text=AT&font=poppins",
    comentario: "Me siento con más energía y confianza gracias a los programas de FitVue. Lo recomiendo al 100%.",
    progreso: "Más energía y confianza"
  }
])
</script>

<template>
  <section class="bg-[var(--color-bg)] py-16 px-6">
    <div class="max-w-7xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-bold text-[var(--color-primary)]">Casos de Éxito</h2>
      <p class="mt-4 text-[var(--color-secondary)] text-lg">Historias reales de quienes transformaron su vida con FitVue</p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div
        v-for="(testimonio, index) in testimonios"
        :key="index"
        class="bg-white p-6 rounded-xl shadow-xl transition-transform hover:scale-105 hover:shadow-2xl"
      >
        <div class="flex items-center gap-4 mb-4">
          <img :src="testimonio.imagen" alt="Foto usuario" class="w-16 h-16 rounded-full border-2 border-[var(--color-accent)]">
          <div class="text-left">
            <h3 class="text-xl font-semibold text-[var(--color-primary)]">{{ testimonio.nombre }}</h3>
            <span class="inline-block mt-1 px-3 py-1 text-sm font-medium bg-[var(--color-accent)] text-white rounded-full">
              {{ testimonio.progreso }}
            </span>
          </div>
        </div>
        <p class="text-[var(--color-text)] leading-relaxed italic">“{{ testimonio.comentario }}”</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
