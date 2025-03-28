<template>
    <section class="w-full h-[60vh] text-white flex flex-col items-center justify-center text-center">
      
      <video autoplay loop muted playsinline class="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/Video/Video_banner2.mp4" type="video/mp4">
        Tu navegador no soporta videos en HTML5.
      </video>

      <!-- Capa oscura para mejorar contraste del texto -->
      <div class=" inset-0 bg-black opacity-30"></div>

      <div class="flex flex-col z-2">
        <h2 class="text-4xl md:text-6xl font-bold">
          Transforma tu vida con fitVUE
        </h2>
        <p class="mt-4 text-lg md:text-xl">
          Planes personalizados y rutinas exclusivas para alcanzar tus metas de salud y bienestar.
        </p>
        <!---<button class="mt-8 bg-[var(--color-accent)] px-6 py-3 rounded-full text-white text-lg font-bold transition duration-300 hover:bg-[var(--color-text-dark)] hover:text-[var(--color-primary)]">
          Únete ahora
        </button>-->
      </div>
    </section>
  </template>