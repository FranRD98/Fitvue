<template>
  <div class="bg-[var(--color-bg-light)] min-h-screen py-16 text-[var(--color-text)]">

    <!-- Encabezado -->
    <header class="text-center py-12">
      <h1 class="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)]">¿Necesitas ayuda?</h1>
      <p class="mt-4 text-lg md:text-xl text-[var(--color-text)]">
        Estamos disponibles 24/7 para resolver tus dudas.
      </p>
    </header>

    <!-- Sección principal -->
    <section class="px-6 py-16">
      <div class="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16">

        <!-- Info contacto -->
        <div>
          <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6">Información de contacto</h2>
          <ul class="space-y-4 text-[var(--color-text)]">
            <li class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--color-secondary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18m-7 5h7" />
                  </svg>              
                  <span>info@fitvue.com</span>
            </li>
            <li class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--color-secondary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v8m0 0h-8m8 0h8" />
                  </svg>              
                  <span>+34 600 123 456</span>
            </li>
            <li class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--color-secondary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 11V6c0-1.105-.895-2-2-2h-5c-1.105 0-2 .895-2 2v5m-4 0V6c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v5m7 0v5m0 0h7m-7 0H7" />
                  </svg>              
                  <span>Calle Ficticia 123, Barcelona</span>
            </li>
          </ul>
        </div>

        <!-- Formulario -->
        <div>
          <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6">Envíanos un mensaje</h2>
          <form class="space-y-6">
            <div>
              <label class="block fot-medium text-[var(--color-primary)]">Nombre</label>
              <input type="text" placeholder="Tu nombre" class="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label class="block font-medium text-[var(--color-primary)]">Correo electrónico</label>
              <input type="email" placeholder="email@ejemplo.com" class="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label class="block font-medium text-[var(--color-primary)]">Mensaje</label>
              <textarea rows="5" placeholder="Escribe tu mensaje..." class="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)]"></textarea>
            </div>
            <button class="w-full py-3 bg-[var(--color-primary)] text-white font-semibold rounded-full hover:bg-[var(--color-secondary)] transition">
              Enviar mensaje
            </button>
          </form>
        </div>

      </div>
    </section>
  </div>
</template>
