<script setup>
  import { ref } from 'vue'

  const mobileMenuOpen = ref(false)
  const toggleMobileMenu = () => mobileMenuOpen.value = !mobileMenuOpen.value
  const closeMenu = () => mobileMenuOpen.value = false

  import { useAuth } from '@/firebase/useAuth'

  const { user } = useAuth();

</script>

<template>
  <!-- Navbar -->
  <nav class="bg-white shadow-xl sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6">
      
      <!-- Contenedor principal con 3 grupos -->
      <div class="flex justify-between items-center h-20">
        
        <!-- Grupo 1: Logo -->
        <div class="hidden lg:flex items-center flex-1">
          
          <router-link to="/">
            <h1 class="text-3xl font-bold tracking-widest flex items-center">
                <img src="/Logo_azul.png" alt="FitVue Logo" class="h-6 mb-3 mr-2">fitVUE

            </h1>
          </router-link>
        </div>
        
        <!-- Grupo 2: Menú central -->
        <div class="hidden lg:flex justify-center items-center space-x-6 flex-1">
          
          <!-- Enlaces '¿Qué es Fitvue?' -->
          <router-link to="/nosotros" class="nav-link px-1 py-2 text-[var(--color-text)] font-normal hover:text-[var(--color-secondary)]">¿Qué es FitVue?</router-link>

          <!-- Dropdown Ejercicios -->
          <div class="relative dropdown">
            <router-link to="/rutinas">
            <a class="px-1 py-2 text-[var(--color-text)] font-normal hover:text-[var(--color-primary)]">
              Rutinas
              <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
          </router-link>
            
            <div class="dropdown-menu bg-white shadow-lg mt-0 border-t border-gray-200">
              <div class="dropdown-content p-8">
                <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6">Conoce nuestras rutinas</h2>
                <div class="grid grid-cols-4 gap-8">

                  <!-- Entrenamientos -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-barbell"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 12h1" /><path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" /><path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M9 12h6" /><path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" /><path d="M22 12h-1" /></svg>
                    <router-link @click="dropdownOpen = false" to="/rutinas/entrenamiento" class="nav-link text-md font-normal text-[var(--color-text)] hover:text-[var(--color-primary)]">Entrenamientos</router-link>
                  </div>

                  <!-- Mindfulness -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brain"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></svg>
                    <router-link to="/rutinas/mindfulness" class="nav-link text-md font-normal text-[var(--color-text)] hover:text-[var(--color-primary)]">Mindfulness</router-link>
                  </div>

                  <!-- Estiramientos -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-stretching"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M5 20l5 -.5l1 -2" /><path d="M18 20v-5h-5.5l2.5 -6.5l-5.5 1l1.5 2" /></svg>
                    <router-link to="/rutinas/estiramientos" class="nav-link text-md font-normal text-[var(--color-text)] hover:text-[var(--color-primary)]">Estiramientos</router-link>
                  </div>

                  <!-- Yoga -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-yoga"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M4 20h4l1.5 -3" /><path d="M17 20l-1 -5h-5l1 -7" /><path d="M4 10l4 -1l4 -1l4 1.5l4 1.5" /></svg>
                    <router-link to="/rutinas/yoga" class="nav-link text-md font-normal text-[var(--color-text)] hover:text-[var(--color-primary)]">Yoga</router-link>
                  </div>

                </div>
              </div>
            </div>
          </div>
          
          <!-- Dropdown Nutrición -->
          <div class="relative dropdown">

            <router-link to="/nutricion">
            <a class="px-1 py-2 text-[var(--color-text)] font-normal hover:text-[var(--color-primary)]">
              Nutrición
              <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
          </router-link>
            <div class="dropdown-menu bg-white shadow-lg mt-0 border-t border-gray-200">
              <div class="dropdown-content p-8">
                <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6">Aquí encontrarás consejos de nutrición</h2>
                <div class="grid grid-cols-4 gap-8">

                  <!-- Dietas -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-avocado"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.8 14.04a3.905 3.905 0 0 1 1.337 -2.075c1.195 -.985 1.816 -2.285 1.863 -3.902c-.047 -1.43 -.54 -2.626 -1.477 -3.586c-.96 -.938 -2.156 -1.43 -3.585 -1.477c-1.618 .047 -2.918 .668 -3.903 1.863c-.562 .68 -1.254 1.125 -2.074 1.336c-.938 .188 -1.828 .48 -2.672 .88c-.844 .398 -1.559 .878 -2.144 1.44c-1.43 1.501 -2.145 3.224 -2.145 5.169c0 1.946 .715 3.668 2.145 5.168c1.5 1.429 3.222 2.144 5.168 2.144c1.945 0 3.667 -.715 5.167 -2.145c.563 -.585 1.055 -1.3 1.477 -2.144c.398 -.844 .68 -1.723 .844 -2.637v-.035z" /><path d="M10.87 10.036c-.942 .112 -1.794 .538 -2.556 1.278c-.74 .762 -1.166 1.614 -1.278 2.556c-.135 .92 .112 1.704 .74 2.354c.65 .628 1.435 .875 2.354 .74c.942 -.112 1.794 -.538 2.556 -1.278c.74 -.762 1.166 -1.614 1.278 -2.556c.135 -.92 -.112 -1.704 -.74 -2.354c-.65 -.628 -1.435 -.875 -2.354 -.74z" /></svg>
                    <router-link to="/nutricion/dietas" class="nav-link text-md font-normal text-[var(--color-text)] hover:text-[var(--color-primary)]">Dietas</router-link>
                  </div>

                  <!-- Suplementación -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-pill"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.207 3.793a5.95 5.95 0 0 1 0 8.414l-8 8a5.95 5.95 0 0 1 -8.414 -8.414l8 -8a5.95 5.95 0 0 1 8.414 0m-7 1.414l-4.294 4.293l5.586 5.586l4.294 -4.292a3.95 3.95 0 1 0 -5.586 -5.586" /></svg>
                    <router-link to="/nutricion/suplementacion" class="nav-link text-md font-normal text-[var(--color-text)] hover:text-[var(--color-primary)]">Suplementación</router-link>
                  </div>

                  <!-- Recetas -->
                  <div class="flex items-center space-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chef-hat"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4 4 0 1 1 2.092 -7.723a4 4 0 0 1 3.908 -3.151z" /><path d="M6.161 17.009l11.839 -.009" /></svg>
                    <router-link to="/nutricion/recetas" class="nav-link text-md font-normal text-[var(--color-text)] hover:text-[var(--color-primary)]">Recetas</router-link>
                  </div>

                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        <!-- Grupo 3: Botones de acción -->
        <div class="hidden lg:flex items-center justify-end flex-1">
          <div v-if="user">

            <!-- Dropdown User Logued -->
            <div class="relative dropdown">
                <a class="px-1 py-2 text-[var(--color-text)] font-normal hover:text-[var(--color-primary)]">
                  ¡Hola, {{ user.email }}!
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </a>

                <!--<div class="flex items-center gap-4 mb-4">
                  
                  <img :src="user.avatar ? user.avatar : '/icons/default-avatar.svg'" alt="Foto usuario" class="w-8 h-8 rounded-full">
                  <div class="text-left">
                      <h3 class="text-md font-semibold text-[var(--color-primary)]">{{ user.name }} {{ user.last_name }}</h3>
                      <h3 class="text-md font-semibold text-[var(--color-primary)]">{{ user.email }}</h3>
                    </div>
                </div>-->

                <div class="dropdown-user bg-white shadow-lg mt-0 border-t border-gray-200">
                  <div class="dropdown-content p-8">
                    <div class="grid grid-cols-4 gap-8">

                      <!-- Dashboard -->
                      <div class="flex items-center space-x-3">
                        <router-link to="/dashboard" class="nav-link text-md font-normal text-[var(--color-text)] hover:text-[var(--color-primary)]">Dashboard</router-link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
          </div>
          
          <div v-else>
            <router-link to="/login" class="px-4 py-2 text-[var(--color-text)] font-normal hover:text-[var(--color-primary)]">Iniciar sesión</router-link>
            <router-link to="/empezar" class="bg-[var(--color-primary)] text-white px-6 py-2 rounded-full font-normal hover:bg-[var(--color-secondary)] transition-colors">Consigue tu cambio</router-link>
          </div>

        </div>

        <!-- Botón menú móvil -->
        <button @click="toggleMobileMenu" class="lg:hidden text-[var(--color-text)] focus:outline-none">
          <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>
  </nav>

   <!-- Menú móvil -->
   <transition name="fade">
    <div
      v-if="mobileMenuOpen"
      class="w-full bg-white lg:hidden text-center px-6 py-6 space-y-5 shadow-md border-t"
    >
      <router-link @click="closeMenu" to="/nosotros" class="block text-[var(--color-text)] font-normal">¿Qué es FitVue?</router-link>
      <router-link @click="closeMenu" to="/rutinas/entrenamiento" class="block text-[var(--color-text)] font-normal">Rutinas</router-link>
      <router-link @click="closeMenu" to="/nutricion/dieta" class="block text-[var(--color-text)] font-normal">Nutrición</router-link>
      <router-link @click="closeMenu" to="/planes" class="block text-[var(--color-text)] font-normal">Planes</router-link>
      <router-link @click="closeMenu" to="/casos-de-exito" class="block text-[var(--color-text)] font-normal">Casos de éxito</router-link>

      <div class="pt-5 border-t border-gray-200">
        <router-link @click="closeMenu" to="/login" class="block text-[var(--color-text)] font-normal mt-4">Iniciar sesión</router-link>
        <router-link @click="closeMenu" to="/empezar" class="inline-block bg-[var(--color-primary)] text-white px-6 py-2 rounded-full font-normal hover:bg-cyan-900 mt-2">Consigue tu cambio</router-link>
      </div>
    </div>
  </transition>

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

    .dropdown-user {
      position: absolute; /* Cambiado de fixed a absolute */
      top: 50px;           /* Justo debajo del trigger */
      right: 0;
      width: 16rem;        /* O ajusta a lo que necesites */
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      border-radius: 0.5rem;
      min-width: 180px;
      z-index: 50;
    }

    .dropdown:hover .dropdown-user {
      opacity: 1;
      visibility: visible;
    }

    .dropdown:hover .dropdown-menu{
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

    .nav-link {
      position: relative;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -6px;
      left: 0;
      background-color: #155e75;
      transition: width 0.3s ease;
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.3s ease;
    }
    
    .fade-enter-from, .fade-leave-to {
      opacity: 0;
    }
  </style>