<template>
  <section class="relative w-full h-[80vh] text-white flex flex-col items-center justify-center text-center overflow-hidden">

    <!-- Video de fondo -->
    <video autoplay loop muted playsinline class="absolute top-0 left-0 w-full h-full object-cover z-0">
      <source src="/Video/videoBanner.mp4" type="video/mp4">
      Tu navegador no soporta videos en HTML5.
    </video>

    <!-- Capa oscura con transparencia -->
    <div class="absolute inset-0 bg-black/40 z-10"></div>

    <!-- Contenido principal -->
    <div class="flex flex-col items-center z-20 px-4">
      <h2 class="text-4xl md:text-6xl font-bold">
        Transforma tu vida con #fitVUE
      </h2>
      <p class="mt-4 text-lg md:text-xl">
        Planes personalizados y rutinas exclusivas para alcanzar tus metas de salud y bienestar.
      </p>
      <button class="mt-8 bg-[var(--color-primary)] w-3/4 sm:w-1/2 md:w-1/4 px-6 py-3 rounded-full text-white text-lg font-semibold transition duration-300 hover:bg-white hover:text-[var(--color-primary)]">
        Únete ahora
      </button>
    </div>

  </section>
</template>
