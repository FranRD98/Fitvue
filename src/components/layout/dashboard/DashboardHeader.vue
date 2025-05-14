<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'  // Importamos el store de Pinia

const userStore = useUserStore()  // Usamos el store de usuario

const welcomeMessages = [
  'Estás haciendo un gran progreso hoy, ¡sigue así! 💪',
  '¡Hoy es un gran día para avanzar en tus metas! 🚀',
  '¡Vamos con todo, estás imparable! 🔥',
  'No te detengas, cada paso cuenta 🏃‍♂️',
  '¡Excelente trabajo, sigue construyendo tu mejor versión! 🛠️',
  'Hoy entrenas el cuerpo… y la disciplina 🧠💪',
  '¡Eres más constante que el WiFi del gimnasio! 📶',
  '¡A romperla! 💥 Tu constancia es tu superpoder.'
]

const randomMessage = ref(welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)])
</script>

<template>
  <header v-if="userStore.userData" class="bg-white shadow-sm px-10 py-6">
    <div class="flex gap-4 items-center">
      <img
        :src="userStore.userData.profile_image || 'https://bumjstjctwiokebjwnzn.supabase.co/storage/v1/object/public/fitvue/icons/profile/default-profile.svg'"
        alt="profile-icon"
        class="w-12 h-12 rounded-full"
      />
      <div>
        <h1 class="text-xl font-bold text-[var(--color-primary)]">
          ¡Hola, {{ userStore.userData?.name || 'Usuario' }}!
        </h1>
        <p class="text-sm text-gray-500">{{ randomMessage }}</p>
      </div>
    </div>
  </header>
</template>
