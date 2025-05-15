<script setup>
import { ref, watch } from 'vue'
import { createUser } from '@/supabase/services/users.js'
import { supabase } from '@/supabase/config.js' 

const props = defineProps({ show: Boolean, initialData: Object })
const emit = defineEmits(['close', 'saved'])

const session = supabase.auth.getSession()  // Esto devuelve una promesa ahora, ¡ojo!
const token = session?.data?.session?.access_token
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
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) throw new Error('Debes iniciar sesión');

    await createUser(form.value, token);

    emit('saved');
    emit('close');
  } catch (err) {
    console.error('Error guardando usuario:', err.message);
  }
}

</script>

<template>
<div
  v-if="show"
  class="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center z-50 px-4"
>
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
      <!-- Botón de cerrar -->
      <button @click="emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition" aria-label="Cerrar">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>

      <h2 class="text-xl font-bold text-[var(--color-primary)] mb-4">
        {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <label for="name" class="text-sm font-medium text-gray-700">Nombre</label>
        <input id="name" v-model="form.name" placeholder="Nombre" class="input" required />

        <label for="last_name" class="text-sm font-medium text-gray-700">Apellidos</label>
        <input id="last_name" v-model="form.last_name" placeholder="Apellidos" class="input" required />

        <label for="email" class="text-sm font-medium text-gray-700">Email</label>
        <input id="email" v-model="form.email" type="email" placeholder="Email" class="input" required />

        <label v-if="!isEditing" for="password" class="text-sm font-medium text-gray-700">Email</label>
        <input v-if="!isEditing" id="password"  v-model="form.password" type="password" placeholder="Contraseña" class="input" required />

        <label for="role" class="text-sm font-medium text-gray-700">Rol</label>
        <select id="role" v-model="form.role" class="input">
          <option value="user">Usuario</option>
          <option value="coach">Coach</option>
          <option value="admin">Admin</option>
        </select>

        <label for="plan" class="text-sm font-medium text-gray-700">Plan</label>
        <select id="plan" v-model="form.suscriptionPlan" class="input">
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
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background-color: white;
  color: #374151;
  transition: all 0.2s ease;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
  outline: none;
}

/* Slide down para abrir caja de comida */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Drop-fade para cada plato */
.drop-fade-enter-active {
  transition: all 0.3s ease;
}
.drop-fade-leave-active {
  transition: all 0.2s ease;
  position: absolute;
}
.drop-fade-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}
.drop-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>