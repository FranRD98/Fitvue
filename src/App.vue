<script setup>
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/MainFooter.vue'
</script>

<template>
  <Header />
  <main>
    <router-view /> <!-- 🔥 Aquí se cargan dinámicamente las páginas según la ruta -->
  </main>
  <Footer />
</template>