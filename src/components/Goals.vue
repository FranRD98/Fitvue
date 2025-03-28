<template>
  <!-- Sección de Servicios -->
  <section class="py-20 gap-4 bg-white text-center flex flex-col items-center">
    <h2 class="text-xl font-semibold mb-6 text-[var(--color-primary)]">/ Qué podemos hacer por ti</h2>

    <p class="text-lg text-[var(--color-primary)] mb-8">Ya sea que busques perder peso, ganar músculo o mejorar tu salud, FitVue tiene un plan para ti. Nuestro enfoque personalizado se adapta a todas las edades, condiciones físicas y objetivos.</p>

    <div class="max-w-5/6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      
      <!-- Card 1 -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="/rutina.jpg" alt="Rutinas Personalizadas" class="w-full h-64 object-cover rounded-t-lg mb-4" />
        <div class="p-6">
          <h3 class="text-xl font-bold text-[var(--color-primary)]">Rutinas Personalizadas</h3>
          <p class="mt-4 text-[var(--color-secondary)]">Adaptamos el entrenamiento según tus metas y nivel físico.</p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="/dieta.jpg" alt="Dietas Personalizadas" class="w-full h-64 object-cover rounded-t-lg mb-4" />
        <div class="p-6">
          <h3 class="text-xl font-bold text-[var(--color-primary)]">Dietas Personalizadas</h3>
          <p class="mt-4 text-[var(--color-secondary)]">Planes de nutrición que se ajustan a tus necesidades específicas.</p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="/monitoreo.jpg" alt="Monitoreo de Progreso" class="w-full h-64 object-cover rounded-t-lg mb-4" />
        <div class="p-6">
          <h3 class="text-xl font-bold text-[var(--color-primary)]">Monitoreo de Progreso</h3>
          <p class="mt-4 text-[var(--color-secondary)]">Haz un seguimiento detallado de tus avances con nuestras herramientas.</p>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="/trainer.jpg" alt="Entrenadores Personalizados" class="w-full h-64 object-cover rounded-t-lg mb-4" />
        <div class="p-6">
          <h3 class="text-xl font-bold text-[var(--color-primary)]">Entrenadores Personalizados</h3>
          <p class="mt-4 text-[var(--color-secondary)]">Entrenadores expertos que te guiarán en cada paso de tu entrenamiento.</p>
        </div>
      </div>
    </div>

  </section>
</template>