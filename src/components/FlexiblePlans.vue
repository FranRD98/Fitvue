<template>
  <!-- Sección de Planes -->
  <section class="py-20 bg-[var(--color-bg-light)] text-center">
    <h2 class="text-4xl font-semibold text-[var(--color-primary)] mb-12">Nuestros Planes</h2>

    <div class="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
      
      <!-- Plan Básico -->
      <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
        <h3 class="text-2xl font-bold text-[var(--color-primary)]">Plan Básico</h3>
        <p class="text-lg mt-2 text-gray-600">€19.99/mes</p>
        <button class="mt-6 bg-[var(--color-accent)] text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-[var(--color-primary)]">
          Empezar
        </button>

        <hr class="my-6 border-t-2 border-[var(--color-bg-light)]">

        <ul class="text-left space-y-3 text-gray-600">
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[var(--color-accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Acceso a rutinas básicas
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[var(--color-accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Soporte básico
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[var(--color-accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Acceso a la comunidad
          </li>
        </ul>
      </div>

      <!-- Plan Avanzado -->
      <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
        <h3 class="text-2xl font-bold text-[var(--color-primary)]">Plan Avanzado</h3>
        <p class="text-lg mt-2 text-gray-600">€39.99/mes</p>
        <button class="mt-6 bg-[var(--color-accent)] text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-[var(--color-primary)]">
          Empezar
        </button>

        <hr class="my-6 border-t-2 border-[var(--color-bg-light)]">

        <ul class="text-left space-y-3 text-gray-600">
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[var(--color-accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Rutinas personalizadas
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[var(--color-accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Acceso a dietas personalizadas
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[var(--color-accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Seguimiento avanzado
          </li>
          <li class="flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Acceso a la comunidad
          </li>
        </ul>
      </div>

      <!-- Plan Premium -->
      <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
        <h3 class="text-2xl font-bold text-[var(--color-primary)]">Plan Premium</h3>
        <p class="text-lg mt-2 text-gray-600">€59.99/mes</p>
        <button class="mt-6 bg-[var(--color-accent)] text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-[var(--color-primary)]">
          Empezar
        </button>

        <hr class="my-6 border-t-2 border-[var(--color-bg-light)]">

        <ul class="text-left space-y-3 text-gray-600">
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[var(--color-accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Soporte personalizado
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[var(--color-accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Asesoría de entrenadores
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[var(--color-accent)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Acceso exclusivo a contenido premium
          </li>
          <li class="flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Rutinas personalizadas
          </li>
          <li class="flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Dietas personalizadas
          </li>
          <li class="flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Seguimiento avanzado
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>