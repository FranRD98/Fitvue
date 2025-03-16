<template>
  <footer class="bg-[var(--color-primary)] text-white py-12">
    <div class="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <!-- Columna 1: Logo -->
      <div class="flex flex-col space-y-4">
        <h1 class="text-2xl font-bold tracking-widest flex items-center gap-2">
          <img src="/Logo.png" alt="FitVue Logo" class="h-8 w-auto">
          FitVue
        </h1>
      </div>

      <!-- Columna 2: Información de contacto -->
      <div class="flex flex-col space-y-4">
        <h3 class="text-md font-normal text-white">¿Tienes alguna consulta o mejora? Indícanoslo en:</h3>
        <h3 class="text-lg font-semibold text-white">support@fitvue.com</h3>

        <h3 class="text-md font-normal text-white mt-4">Haznos una llamada:</h3>
        <h3 class="text-lg font-semibold text-white">+34 567 890 012</h3>
      </div>

      <!-- Columna 3: Recursos y Soporte -->
      <div class="flex flex-row justify-around">
        <div class="flex flex-col gap-2">
          <h3 class="text-xl font-semibold text-white">Recursos</h3>
          <a href="#" class="text-md font-base text-white hover:text-[var(--color-secondary)]">Planes</a>
          <a href="#" class="text-md font-base text-white hover:text-[var(--color-secondary)]">Casos de éxito</a>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="text-xl font-semibold text-white">Soporte</h3>
          <a href="#" class="text-md font-base text-white hover:text-[var(--color-secondary)]">FAQ's</a>
          <a href="#" class="text-md font-base text-white hover:text-[var(--color-secondary)]">Contactar</a>
          <a href="#" class="text-md font-base text-white hover:text-[var(--color-secondary)]">Testimonios</a>
        </div>
      </div>
    </div>

    <hr class="w-4/5 mx-auto border-white mt-12 opacity-50">

    <div class="w-4/5 mx-auto flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-white">
      <!-- Copyright -->
      <p>&copy; 2025 FitVue. Fran Riera.</p>

      <div class="flex gap-4 mt-4 md:mt-0">
        <a href="#" class="hover:text-[var(--color-secondary)]">Política de privacidad</a>
        <a href="#" class="hover:text-[var(--color-secondary)]">Términos y condiciones</a>
      </div>
    </div>
  </footer>
</template>