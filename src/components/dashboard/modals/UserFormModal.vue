<script setup>
import { ref, watch } from 'vue'
import { createUser, updateUser } from '@/firebase/users'

const props = defineProps({ show: Boolean, initialData: Object })
const emit = defineEmits(['close', 'saved'])

const isEditing = ref(false)

const form = ref({
  name: '',
  last_name: '',
  email: '',
  password: '',
  role: 'user',
  suscriptionPlan: 'free'
})

watch(() => props.initialData, (val) => {
  if (val) {
    isEditing.value = true
    form.value = {
      name: val.name || '',
      last_name: val.last_name || '',
      email: val.email || '',
      role: val.role || 'user',
      suscriptionPlan: val.suscriptionPlan || 'free',
      password: '' // No se muestra ni actualiza en edición
    }
  } else {
    isEditing.value = false
    form.value = {
      name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'user',
      suscriptionPlan: 'free'
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  try {
    if (isEditing.value && props.initialData?.id) {
      await updateUser(props.initialData.id, form.value)
    } else {
      await createUser(form.value)
    }
    emit('saved')
    emit('close')
  } catch (err) {
    console.error('Error guardando usuario:', err)
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
      <h2 class="text-xl font-bold text-[var(--color-primary)] mb-4">
        {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="form.name" placeholder="Nombre" class="input" required />
        <input v-model="form.last_name" placeholder="Apellidos" class="input" required />
        <input v-model="form.email" type="email" placeholder="Email" class="input" required />
        <input v-if="!isEditing" v-model="form.password" type="password" placeholder="Contraseña" class="input" required />

        <select v-model="form.role" class="input">
          <option value="user">Usuario</option>
          <option value="coach">Coach</option>
          <option value="admin">Admin</option>
        </select>

        <select v-model="form.suscriptionPlan" class="input">
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>

        <div class="flex justify-end mt-4">
          <button type="submit" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[var(--color-secondary)]">
            {{ isEditing ? 'Guardar cambios' : 'Crear usuario' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}
</style>
