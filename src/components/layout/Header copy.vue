<template>
  <header class="w-full text-[var(--color-text)] flex flex-col">

    <div class="w-full flex py-6">
      <!-- Contenedor principal, usa flex para alinear los elementos -->
      <div class="w-full flex items-center px-48 justify-between">

        <!-- Logo (a la izquierda) -->
        <router-link to="/">
          <h1 class="text-3xl font-bold tracking-widest flex items-center gap-2 mr-8 m-0">
            <img src="/Logo_azul.png" alt="FitVue Logo" class="h-10 w-auto">FitVue
          </h1>
        </router-link>

        <!-- Menú (a la derecha del logo) -->
        <div class="flex justify-center items-center m-0">
            <ul class="flex font-medium space-x-6">
              <li class="hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-full transition duration-300">
                <router-link to="/about">¿Qué es FitVue?</router-link>
              </li>
              <li class="hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-full transition duration-300">
                <router-link to="/plans">Planes</router-link>
              </li>
              <li class="hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-full transition duration-300">
                <router-link to="/cases">Casos de éxito</router-link>
              </li>
              <li class="hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-full transition duration-300">
                <router-link to="/contact">Contacto</router-link>
              </li>
            </ul>
        </div>

        <!-- Botones (a la extrema derecha) -->
        <div class="flex justify-center items-center gap-3 ml-auto">
          <router-link to="/login" class="hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-full transition duration-300">
            Iniciar sesión
          </router-link>
          
          <router-link to="/startChange" class="bg-[var(--color-accent)] text-white font-bold px-6 py-3 rounded-full transition duration-300 hover:bg-[var(--color-text-dark)] hover:text-[var(--color-primary)]">
            Consigue tu cambio
          </router-link>
        </div>

      </div>
    </div>
  </header>
</template>