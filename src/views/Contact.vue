<template>
    <div class="bg-[var(--color-bg)] min-h-screen py-16">
      <header class="text-[var(--color-text-light) py-12">
        <div class="container mx-auto text-center">
          <h1 class="text-5xl font-bold">Disponemos de un equipo entero dedicado a ayudarte</h1>
          <p class="mt-4 text-lg md:text-xl text-[var(--color-text-light)]">
            Estamos aquí para ayudarte las 24/7, ¡no dudes en ponerte en contacto con nosotros!
          </p>
        </div>
      </header>
  
      <!-- Formulario de Contacto -->
      <section class="py-16 px-8 bg-white">
        <div class="container mx-auto max-w-4xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Información de contacto -->
            <div class="flex flex-col">              
              <ul class="text-[var(--color-secondary)]">
                <li class="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--color-terciary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18m-7 5h7" />
                  </svg>
                  <span class="text-lg">info@fitvue.com</span>
                </li>
                <li class="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--color-terciary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v8m0 0h-8m8 0h8" />
                  </svg>
                  <span class="text-lg">+123 456 7890</span>
                </li>
                <li class="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--color-terciary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 11V6c0-1.105-.895-2-2-2h-5c-1.105 0-2 .895-2 2v5m-4 0V6c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v5m7 0v5m0 0h7m-7 0H7" />
                  </svg>
                  <span class="text-lg">Dirección: Calle Ficticia 123, Ciudad</span>
                </li>
              </ul>
              <h2 class="text-3xl font-semibold mb-6 text-[var(--color-primary)]">¿Tienes preguntas?</h2>

            </div>
  
            <!-- Formulario -->
            <div class="flex flex-col justify-center">
              <h2 class="text-3xl font-semibold mb-6 text-[var(--color-primary)]">Envianos un mensaje</h2>
              <form action="#" method="POST" class="space-y-6">
                <div>
                  <label for="name" class="block text-lg text-[var(--color-primary)]">Nombre</label>
                  <input type="text" id="name" name="name" required class="w-full mt-2 p-4 border border-[var(--color-terciary)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)]" />
                </div>
  
                <div>
                  <label for="email" class="block text-lg text-[var(--color-primary)]">Correo electrónico</label>
                  <input type="email" id="email" name="email" required class="w-full mt-2 p-4 border border-[var(--color-terciary)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)]" />
                </div>
  
                <div>
                  <label for="message" class="block text-lg text-[var(--color-primary)]">Mensaje</label>
                  <textarea id="message" name="message" rows="5" required class="w-full mt-2 p-4 border border-[var(--color-terciary)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)]"></textarea>
                </div>
  
                <button type="submit" class="w-full mt-4 py-3 bg-[var(--color-accent)] text-white font-bold rounded-full hover:bg-[var(--color-primary)] transition duration-300">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  
    </div>
  </template>
  
  <script setup>
  // No script necesario para este ejemplo, ya que todo está en el template
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí si es necesario */
  </style>