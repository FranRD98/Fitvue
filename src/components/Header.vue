<template>
  <header class="w-full h-[100vh] bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-text-dark)] flex flex-col">
    <!-- Navbar -->
    <nav class="w-5/6 mx-auto flex justify-between items-center py-6">

      <div class="flex-1">
        <h1 class="text-3xl font-bold tracking-widest flex items-center gap-2">
          <img src="/Logo.png" alt="FitVue Logo" class="h-10 w-auto">
          FitVue
        </h1>
      </div>

      <div class="flex justify-center space-x-6">
        <ul class="flex font-medium [&>li]:px-5 [&>li]:py-2 [&>li]:rounded-lg [&>li]:transition [&>li]:duration-300">
          <li class="hover:bg-[var(--color-accent)] px-4 py-2 rounded-lg">
            <a href="#">Inicio</a>
          </li>
          <li class="hover:bg-[var(--color-accent)] px-4 py-2 rounded-lg">
            <a href="#">¿Qué es FitVue?</a>
          </li>
          <li class="hover:bg-[var(--color-accent)] px-4 py-2 rounded-lg">
            <a href="#">Planes</a>
          </li>
          <li class="hover:bg-[var(--color-accent)] px-4 py-2 rounded-lg">
            <a href="#">Casos de éxito</a>
          </li>
          <li class="hover:bg-[var(--color-accent)] px-4 py-2 rounded-lg">
            <a href="#">Contacto</a>
          </li>
        </ul>
      </div>

      <div class="flex-1 flex justify-end gap-3">
        <button class="border-2 border-[var(--color-bg-light))] text-[var(--color-bg-light))] px-5 py-2 rounded-full transition duration-300 hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)]">
          Iniciar sesión
        </button>
        <button class="bg-[var(--color-accent)] text-white font-bold px-6 py-3 rounded-full transition duration-300 hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)]">
          Consigue tu cambio
        </button>
      </div>
    </nav>

    <!-- Contenido del Hero -->
    <div class="flex flex-col items-center justify-center text-center flex-grow">
      <h2 class="text-4xl md:text-6xl font-bold">
        Transforma tu vida con FitVue
      </h2>
      <p class="mt-4 text-lg md:text-xl">
        Planes personalizados y rutinas exclusivas para alcanzar tus metas de salud y bienestar.
      </p>
      <button class="mt-8 bg-[var(--color-accent)] px-6 py-3 rounded-full text-lg font-bold transition duration-300 hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)]">
        Únete ahora
      </button>
    </div>
  </header>
</template>