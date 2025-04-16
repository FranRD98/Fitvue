<script setup>
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/MainFooter.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Esto ocultará header/footer si estamos en /dashboard o cualquier subruta (/dashboard/usuarios, etc.)
const hideLayout = computed(() => route.path.startsWith('/dashboard'))
</script>

<template>
  <div>
    <Header v-if="!hideLayout" />

    <main>
      <router-view />
    </main>

    <Footer v-if="!hideLayout" />
  </div>
</template>
