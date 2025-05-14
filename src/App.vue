<script setup>
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/MainFooter.vue'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()

// Esto ocultará header/footer si estamos en /dashboard o cualquier subruta
const hideLayout = computed(() => route.path.startsWith('/dashboard'))

// Esperar a que se obtengan los datos del usuario
const userIsReady = computed(() => userStore.userData !== null)

// Llamar a la función para obtener los datos del usuario al montar
userStore.fetchUserData()
userStore.initAuthListener()

</script>

<template>
  <div>
    <!-- Esperar a que los datos del usuario estén listos antes de mostrar el layout -->
    <Header v-if="!hideLayout && userIsReady" />

    <main>
      <router-view />
    </main>

    <Footer v-if="!hideLayout && userIsReady" />
  </div>
</template>
