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
  const storedPlan = Number(localStorage.getItem('pendingPlan'))

  // Validamos que plan venga de query o localStorage
  const validPlan = [2, 3].includes(plan) ? plan : [2, 3].includes(storedPlan) ? storedPlan : null

  if (!validPlan) {
    console.warn('No se pudo determinar el plan válido')
    router.push('/dashboard')
    return
  }

  // Actualizamos los datos del usuario
  await userStore.fetchUserData()
  const userId = userStore.userData?.uid

  if (userId) {
    const { error } = await supabase
      .from('users')
      .update({ plan_id: validPlan })
      .eq('uid', userId)

    if (error) console.error('Error actualizando plan:', error)
  }

  localStorage.removeItem('pendingPlan')

  if (userStore.userData?.completedForm) {
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