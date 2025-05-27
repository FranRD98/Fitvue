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
  console.log('[✅ URL Params]', route.query)

  if (![2, 3].includes(plan)) {
    return router.push('/dashboard')
  }

  // Esperamos a que el usuario esté actualizado
  await userStore.fetchUserData()

  const userId = userStore.userData?.uid

  if (userId) {
    const { error } = await supabase
      .from('users')
      .update({
        plan_id: plan,
        ...(plan === 3 && { role: 'coach' })
      })
      .eq('uid', userId)

    if (error) {
      return console.error('❌ Error actualizando plan:', error)
    }
  }

  // Esperamos de nuevo tras actualizar
  await userStore.fetchUserData()

  // Redirige según si completó el formulario
  if (userStore.userData?.completedForm) {
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