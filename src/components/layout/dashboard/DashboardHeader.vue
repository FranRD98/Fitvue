<script setup>
import { useAuth } from '@/firebase/useAuth'
const { userData } = useAuth()
</script>

<template>
  <header class="bg-white shadow-sm px-10 py-6 flex gap-4 items-center">
    <img
        :src='"https://i.pravatar.cc/256" || userData?.avatar'
        alt="avatar"
        class="w-12 h-12 rounded-full"
      />
    <div>

      <h1 class="text-xl font-bold text-[var(--color-primary)]">
        ¡Hola, {{ userData?.name || 'Usuario' }}!
      </h1>
      <p class="text-sm text-gray-500">Estás haciendo un gran progreso hoy, ¡sigue así! 💪</p>
    </div>
  </header>
</template>
