<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/supabase/config'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  console.log('[✅ URL Params]', route.query)

  const plan = Number(route.query.plan)

  // Si no es plan de pago, redirige
  if (![2, 3].includes(plan)) {
    router.push('/dashboard')
    return
  }

  // Actualizamos datos del usuario desde Supabase
  await userStore.fetchUserData()

  const userId = userStore.userData?.uid

  if (userId) {
    const updateFields = {
      plan_id: plan,
      ...(plan === 3 && { role: 'coach' })  // si el plan es 3, añade el role
    }

    const { error } = await supabase
      .from('users')
      .update(updateFields)
      .eq('uid', userId)

    if (error) {
      console.error('❌ Error actualizando datos del usuario:', error)
    }
  }

  // Volvemos a actualizar los datos tras la modificación
  await userStore.fetchUserData()

  // Redirige según si ya completó el formulario inicial
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