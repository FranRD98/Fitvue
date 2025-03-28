<template>
  <!-- Navbar -->
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-5/6 mx-auto px-6">
      <!-- Contenedor principal con 3 grupos -->
      <div class="flex justify-between items-center h-20">
        
        <!-- Grupo 1: Logo -->
        <router-link to="/">
        <h1 class="text-3xl font-bold tracking-widest flex items-center gap-2 mr-8 m-0">
            <img src="/Logo_azul.png" alt="FitVue Logo" class="h-10 w-auto">FitVue
        </h1>
        </router-link>
        
        
        <!-- Grupo 2: Menú central -->
        <div class="hidden lg:flex items-center space-x-8">
          
          <!-- Enlaces '¿Qué es Fitvue?' -->
          <router-link to="/about" class="nav-link px-1 py-2 text-gray-800 font-medium hover:text-cyan-800">¿Qué es FitVue?</router-link>


          <!-- Dropdown Ejercicios -->
          <div class="relative dropdown">
            <button class="px-1 py-2 text-gray-800 font-medium hover:text-cyan-800">
              Rutinas
              <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <div class="dropdown-menu bg-white shadow-lg mt-0 border-t border-gray-200">
              <div class="dropdown-content p-8">
                <h2 class="text-2xl font-bold text-cyan-800 mb-6">Conoce nuestras rutinas</h2>
                <div class="grid grid-cols-4 gap-8">

                  <!-- Entrenamientos -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-barbell"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 12h1" /><path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" /><path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M9 12h6" /><path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" /><path d="M22 12h-1" /></svg>
                    <a href="#" class="nav-link text-md font-semibold text-gray-600 hover:text-cyan-800">Entrenamientos</a>
                  </div>

                  <!-- Mindfulness -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brain"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></svg>
                    <a href="#" class="nav-link text-md font-semibold text-gray-600 hover:text-cyan-800">Mindfulness</a>
                  </div>

                  <!-- Estiramientos -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-stretching"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M5 20l5 -.5l1 -2" /><path d="M18 20v-5h-5.5l2.5 -6.5l-5.5 1l1.5 2" /></svg>
                    <a href="#" class="nav-link text-md font-semibold text-gray-600 hover:text-cyan-800">Estiramientos</a>
                  </div>

                  <!-- Yoga -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-yoga"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M4 20h4l1.5 -3" /><path d="M17 20l-1 -5h-5l1 -7" /><path d="M4 10l4 -1l4 -1l4 1.5l4 1.5" /></svg>
                    <a href="#" class="nav-link text-md font-semibold text-gray-600 hover:text-cyan-800">Yoga</a>
                  </div>

                </div>
              </div>
            </div>
          </div>
          
          <!-- Dropdown Nutrición -->
          <div class="relative dropdown">
            <button class="px-1 py-2 text-gray-800 font-medium hover:text-cyan-800">
              Nutrición
              <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <div class="dropdown-menu bg-white shadow-lg mt-0 border-t border-gray-200">
              <div class="dropdown-content p-8">
                <h2 class="text-2xl font-bold text-cyan-800 mb-6">Aquí encontrarás consejos de nutrición</h2>
                <div class="grid grid-cols-4 gap-8">

                  <!-- Dietas -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-avocado"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.8 14.04a3.905 3.905 0 0 1 1.337 -2.075c1.195 -.985 1.816 -2.285 1.863 -3.902c-.047 -1.43 -.54 -2.626 -1.477 -3.586c-.96 -.938 -2.156 -1.43 -3.585 -1.477c-1.618 .047 -2.918 .668 -3.903 1.863c-.562 .68 -1.254 1.125 -2.074 1.336c-.938 .188 -1.828 .48 -2.672 .88c-.844 .398 -1.559 .878 -2.144 1.44c-1.43 1.501 -2.145 3.224 -2.145 5.169c0 1.946 .715 3.668 2.145 5.168c1.5 1.429 3.222 2.144 5.168 2.144c1.945 0 3.667 -.715 5.167 -2.145c.563 -.585 1.055 -1.3 1.477 -2.144c.398 -.844 .68 -1.723 .844 -2.637v-.035z" /><path d="M10.87 10.036c-.942 .112 -1.794 .538 -2.556 1.278c-.74 .762 -1.166 1.614 -1.278 2.556c-.135 .92 .112 1.704 .74 2.354c.65 .628 1.435 .875 2.354 .74c.942 -.112 1.794 -.538 2.556 -1.278c.74 -.762 1.166 -1.614 1.278 -2.556c.135 -.92 -.112 -1.704 -.74 -2.354c-.65 -.628 -1.435 -.875 -2.354 -.74z" /></svg>
                    <a href="#" class="nav-link text-md font-semibold text-gray-600 hover:text-cyan-800">Dietas</a>
                  </div>

                  <!-- Suplementación -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-pill"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.207 3.793a5.95 5.95 0 0 1 0 8.414l-8 8a5.95 5.95 0 0 1 -8.414 -8.414l8 -8a5.95 5.95 0 0 1 8.414 0m-7 1.414l-4.294 4.293l5.586 5.586l4.294 -4.292a3.95 3.95 0 1 0 -5.586 -5.586" /></svg>
                    <a href="#" class="nav-link text-md font-semibold text-gray-600 hover:text-cyan-800">Suplementación</a>
                  </div>

                  <!-- Recetas -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chef-hat"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4 4 0 1 1 2.092 -7.723a4 4 0 0 1 3.908 -3.151z" /><path d="M6.161 17.009l11.839 -.009" /></svg>
                    <a href="#" class="nav-link text-md font-semibold text-gray-600 hover:text-cyan-800">Recetas</a>
                  </div>

                </div>
              </div>
            </div>
          </div>
          
          <!-- Enlaces simples -->
          <a href="#" class="nav-link px-1 py-2 text-gray-800 font-medium hover:text-cyan-800">Planes</a>
          <a href="#" class="nav-link px-1 py-2 text-gray-800 font-medium hover:text-cyan-800">Casos de éxito</a>
        </div>
        
        <!-- Grupo 3: Botones de acción -->
        <div class="hidden lg:flex items-center space-x-4">
          <a href="#" class="px-4 py-2 text-gray-800 font-medium hover:text-cyan-800">Iniciar sesión</a>
          <a href="#" class="bg-cyan-800 text-white px-6 py-2 rounded-full font-medium hover:bg-cyan-900 transition-colors">
            Consigue tu cambio
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
    .dropdown-menu {
      position: fixed;
      top: 80px; /* Ajusta según la altura del navbar */
      left: 0;
      width: 100vw;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .dropdown:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
    }
    .dropdown-content {
      max-width: 1200px;
      margin: 0 auto;
    }
    .nav-link {
      position: relative;
    }
    .nav-link:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -6px;
      left: 0;
      background-color: #155e75;
      transition: width 0.3s ease;
    }
    .nav-link:hover:after {
      width: 100%;
    }
  </style>