<script setup>
  import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'

  const mobileMenuOpen = ref(false)
  const toggleMobileMenu = () => mobileMenuOpen.value = !mobileMenuOpen.value
  const closeMenu = () => mobileMenuOpen.value = false

  import { useAuth } from '@/firebase/useAuth'

  const { user, userData, logout } = useAuth();

  const categories = ref([])

onMounted(async () => {
  const snapshot = await getDocs(collection(db, 'categories'))
  categories.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
})

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
          
          <!-- Dropdown Guías -->
          <div class="relative dropdown">

            <router-link to="/guias">
            <a class="px-1 py-2 text-[var(--color-text)] font-normal hover:text-[var(--color-primary)]">
              Guías
              <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
          </router-link>
          <div class="dropdown-menu bg-white shadow-lg mt-0 border-t border-gray-200">
  <div class="dropdown-content p-8">
    <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6">Aquí encontrarás diferentes guías</h2>
    <div class="grid grid-cols-4 gap-8">
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex items-center space-x-3"
      >
        <img
          :src="category.iconURL || '/icons/default-icon.svg'"
          alt="Icono"
          class="w-8 h-8 object-contain"
        />
        <router-link
          :to="`/guias/${category.title}`"
          class="nav-link text-md font-normal text-[var(--color-text)] hover:text-[var(--color-primary)]"
        >
          {{ category.title }}
        </router-link>
      </div>
    </div>
  </div>
</div>
          </div>
          
        </div>
        
        <!-- Grupo 3: Botones de acción -->
        <div class="hidden lg:flex items-center justify-end flex-1">
          <div v-if="user">

            <!-- Dropdown User Logged -->
            <div class="relative group">
              <!-- Botón avatar y nombre -->
              <div class="flex items-center space-x-2 cursor-pointer">
                <img
                  :src="userData?.avatar || '/icons/default-avatar.svg'"
                  alt="Foto usuario"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span class="text-sm text-[var(--color-text)] font-medium">
                  ¡Hola, {{ userData?.name || 'Usuario' }}!
                </span>
                <svg class="w-4 h-4 text-[var(--color-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <!-- Submenu -->
              <div class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="p-4 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-800">{{ userData?.name }} {{ userData?.last_name }}</p>
                  <p class="text-xs text-gray-500">{{ user.email }}</p>
                </div>
                <div class="flex flex-col p-4 space-y-2">
                  <router-link to="/dashboard" class="text-sm hover:text-[var(--color-primary)]">Dashboard</router-link>
                  <button @click="logout" class="text-sm text-left hover:text-[var(--color-primary)]">Cerrar sesión</button>
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
      <router-link @click="closeMenu" to="/guias/dieta" class="block text-[var(--color-text)] font-normal">Guías</router-link>
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