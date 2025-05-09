<script setup>
import { ref, watch, computed } from 'vue'
import { createPlate, updatePlate } from '@/supabase/services/plates'

const props = defineProps({
  show: Boolean,
  plate: Object,
  ingredients: Array
})
const emit = defineEmits(['close', 'saved'])

const form = ref({
  name: '',
  items: []
})

const isEditing = computed(() => !!props.plate)

watch(() => props.plate, (plate) => {
  if (plate) {
    form.value = {
      name: plate.name,
      items: [...plate.items]
    }
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  form.value = { name: '', items: [] }
}

function addIngredientRow() {
  form.value.items.push({ ingredientId: '', quantity: 0 })
}

function removeIngredientRow(index) {
  form.value.items.splice(index, 1)
}

async function save() {
  const payload = { ...form.value }
  if (isEditing.value) {
    await updatePlate(props.plate.id, payload)
  } else {
    await createPlate(payload)
  }

  emit('saved')
  resetForm()
  emit('close')
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div class="bg-white p-6 rounded-lg w-full max-w-xl space-y-4">
      <h2 class="text-xl font-bold">{{ isEditing ? 'Editar' : 'Nuevo' }} plato</h2>

      <input v-model="form.name" placeholder="Nombre del plato" class="input" />

      <div v-for="(item, index) in form.items" :key="index" class="flex gap-2 items-center">
        <select v-model="item.ingredientId" class="input">
          <option disabled value="">Ingrediente</option>
          <option v-for="ing in ingredients" :key="ing.id" :value="ing.id">{{ ing.name }}</option>
        </select>
        <input v-model.number="item.quantity" type="number" placeholder="Cantidad (g)" class="input w-24" />
        <button @click="removeIngredientRow(index)" class="text-red-500 text-xs">Eliminar</button>
      </div>

      <button @click="addIngredientRow" class="text-sm text-blue-600 hover:underline">+ Añadir ingrediente</button>

      <div class="flex justify-between mt-4">
        <button @click="$emit('close')" class="text-gray-600 hover:underline">Cancelar</button>
        <button @click="save" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded">Guardar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}
</style>
