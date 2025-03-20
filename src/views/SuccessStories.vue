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
  <div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Casos de Éxito</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      <div v-for="(testimonio, index) in testimonios" :key="index" class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center gap-4 mb-4">
          <img :src="testimonio.imagen" alt="Foto usuario" class="w-16 h-16 rounded-full border border-gray-300">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ testimonio.nombre }}</h3>
            <span class="text-sm text-accent font-semibold">{{ testimonio.progreso }}</span>
          </div>
        </div>
        <p class="text-gray-600">"{{ testimonio.comentario }}"</p>
      </div>
    </div>
  </div>
</template>

<style>
.bg-accent {
  background-color: var(--color-accent);
}

.text-accent {
  color: var(--color-accent);
}
</style>