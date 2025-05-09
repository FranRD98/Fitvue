<!-- src/components/IngredientModal.vue -->
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  initialData: {
    type: Object,
    default: () => ({ name: '', calories: '', protein: '', carbs: '', fats: '' })
  }
})
const emit = defineEmits(['close', 'save'])

const form = ref({
  name: '',
  calories: '',
  protein: '',
  carbs: '',
  fats: ''
})

// Para resetear el formulario cuando los datos cambian
watch(() => props.initialData, (val) => {
  form.value = { ...val }
}, { immediate: true })

const resetForm = () => {
  form.value = {
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  }
}

const handleSubmit = () => {
  if (!form.value.name) return
  emit('save', form.value) // Emitir los datos al componente padre
  emit('close') // Cerrar el modal
}

</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center z-50 px-4">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold text-[var(--color-primary)]">{{ initialData.id ? 'Editar' : 'Nuevo' }} ingrediente</h2>

      <input v-model="form.name" placeholder="Nombre" class="input" />
      <input v-model="form.calories" type="number" placeholder="Calorías (por 100g)" class="input" />
      <input v-model="form.protein" type="number" placeholder="Proteínas" class="input" />
      <input v-model="form.carbs" type="number" placeholder="Carbohidratos" class="input" />
      <input v-model="form.fats" type="number" placeholder="Grasas" class="input" />

      <div class="flex justify-between">
        <button @click="emit('close')" class="text-gray-600 hover:underline">Cancelar</button>
        <button @click="handleSubmit" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded">Guardar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}
</style>
