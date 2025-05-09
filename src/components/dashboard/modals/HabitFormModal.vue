<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  initialData: {
    type: Object,
    default: () => ({ name: '', icon: '🔥' })
  }
})
const emit = defineEmits(['close', 'saved'])

const form = ref({
  name: '',
  icon: '🔥'
})

watch(() => props.initialData, (val) => {
  form.value = {
    name: val?.name || '',
    icon: val?.icon || '🔥'
  }
}, { immediate: true })

const handleSubmit = () => {
  if (!form.value.name) return
  emit('create', form.value)  // Emitir el evento 'saved' con los datos del formulario
  emit('close')  // Cerrar el modal
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center z-50 px-4"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-400 text-xl">✖</button>
      <h2 class="text-xl font-bold mb-4 text-[var(--color-primary)]">Nuevo Hábito</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="form.name" placeholder="Nombre del hábito" class="input" required />
        <input v-model="form.icon" placeholder="Emoji (🔥, 🏃‍♂️, 💧...)" class="input" />
        <button type="submit" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[var(--color-secondary)]">
          Crear hábito
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}
.input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 1px var(--color-primary);
}
</style>
