<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/supabase/config'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  const plan = Number(route.query.plan)

  // Si no es plan de pago, ir directamente al dashboard
  if (![2, 3].includes(plan)) {
    router.push('/dashboard')
    return
  }

  // Actualizamos los datos
  await userStore.fetchUserData()

  const userId = userStore.userData?.uid
  if (userId) {
    const { error } = await supabase
      .from('users')
      .update({ plan_id: plan })
      .eq('uid', userId)

    if (error) {
      console.error('Error actualizando plan:', error)
    }
  }

  // Redirección en función de si ha realizado el formulario inicial
  if (userStore.userData?.completedForm) {

    // Actualizamos los datos
    await userStore.fetchUserData()

    router.push('/dashboard')
  } else {
    router.push('/empezar')
  }
})
</script>

<template>
  <div class="text-center p-10">
    <h2 class="text-2xl font-bold text-[var(--color-primary)]">Procesando tu suscripción...</h2>
    <p class="mt-4 text-gray-600">Estamos configurando tu cuenta.</p>
  </div>
</template>