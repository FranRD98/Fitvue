<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />
  <main>
    <router-view /> <!-- 🔥 Aquí se cargan dinámicamente las páginas según la ruta -->
  </main>
  <Footer />
</template>