<template>
  <!-- Sección de Comunidad (Reseñas) -->
  <section class="py-20 bg-white text-center text-[var(--color-secondary)] flex flex-col items-center">
    <h2 class="text-4xl font-semibold text-[var(--color-primary)] mb-6">Únete a nuestra Comunidad</h2>
    <p class="text-lg mb-12 w-4/5 md:w-2/3">
      Únete a miles de usuarios que ya están transformando sus vidas con FitVue.
    </p>

    <div class="w-4/5 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Testimonio 1 -->
      <div class="bg-[var(--color-bg)] p-6 rounded-xl shadow-lg flex flex-col items-center">
        <img src="https://placehold.co/80/456A6D/FFFFFF?text=UF" 
          alt="Usuario Feliz" class="w-20 h-20 rounded-full object-cover mb-4">
        <p class="text-xl font-medium">"FitVue ha cambiado mi vida. Mi progreso ha sido increíble."</p>
        <p class="mt-3 font-semibold text-[var(--color-primary)]">- Usuario Feliz</p>
      </div>

      <!-- Testimonio 2 -->
      <div class="bg-[var(--color-bg)] p-6 rounded-xl shadow-lg flex flex-col items-center">
        <img src="https://placehold.co/80/355A5D/FFFFFF?text=US" 
          alt="Usuario Satisfecho" class="w-20 h-20 rounded-full object-cover mb-4">
        <p class="text-xl font-medium">"El seguimiento personalizado realmente marca la diferencia."</p>
        <p class="mt-3 font-semibold text-[var(--color-primary)]">- Usuario Satisfecho</p>
      </div>

      <!-- Testimonio 3 -->
      <div class="bg-[var(--color-bg)] p-6 rounded-xl shadow-lg flex flex-col items-center">
        <img src="https://placehold.co/80/274C4F/FFFFFF?text=UC" 
          alt="Usuario Comprometido" class="w-20 h-20 rounded-full object-cover mb-4">
        <p class="text-xl font-medium">"He alcanzado mis objetivos de forma más rápida y efectiva."</p>
        <p class="mt-3 font-semibold text-[var(--color-primary)]">- Usuario Comprometido</p>
      </div>
    </div>
  </section>
</template>