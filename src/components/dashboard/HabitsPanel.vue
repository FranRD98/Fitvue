<script setup>
import { ref, onMounted } from 'vue'
import HabitModal from '@/components/dashboard/modals/HabitFormModal.vue'

import {
  getHabits,
  toggleHabitCompletion,
  createHabit,
  deleteHabit
} from '@/supabase/services/habits'

const habits = ref([])  // Lista de hábitos
const loading = ref(true)  // Estado de carga
const showModal = ref(false)  // Mostrar el modal para crear un hábito
const newHabit = ref({ name: '', emoji: '🔥' })  // Datos del nuevo hábito

import { IconPlus } from '@tabler/icons-vue'

onMounted(async () => {

    loadHabits()
})

const loadHabits = async () => {
  loading.value = true
  try {
    habits.value = await getHabits()  // Obtener hábitos
  } catch (error) {
    console.error('Error al cargar hábitos:', error)
  } finally {
    loading.value = false
  }
}

const handleCreateHabit = async (habitData) => {
  // Crear un nuevo hábito
  await createHabit({ ...habitData, completed: false })  
  loadHabits()  // Recargar hábitos después de la creación
}

const handleToggle = async (habit) => {
  // Cambiar el estado de completado de un hábito
  const index = habits.value.findIndex(h => h.id === habit.id)
  if (index !== -1) {
    habits.value[index] = {
      ...habits.value[index],
      completed: !habits.value[index].completed
    }
  }
  await toggleHabitCompletion(habit.id, habits.value[index].completed)  // Actualizar el estado en la base de datos
}

const handleDelete = async (habitId) => {
  // Eliminar un hábito
  if (confirm('¿Seguro que quieres eliminar este hábito?')) {
    await deleteHabit(habitId)  // Llamada a la función de eliminar
    loadHabits()  // Recargar hábitos después de la eliminación
  }
}
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Mis Hábitos</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <IconPlus class="w-5 h-5" />
        Añadir hábito
      </button>
    </div>

    <div v-if="loading">Cargando hábitos...</div>
    <div v-else-if="habits.length === 0" class="text-gray-600">No tienes hábitos aún.</div>

    <div v-else class="flex flex-wrap gap-4">
      <div
        v-for="habit in habits"
        :key="habit.id"
        @click="handleToggle(habit)"
        :class="[
          'cursor-pointer px-6 py-4 rounded-full border border-[var(--color-primary)] shadow transition-all duration-500',
          habit.completed ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-primary)]'
        ]"
      >
        <span class="text-lg mr-2">{{ habit.icon }}</span>
        <span class="font-semibold">{{ habit.name }}</span>
        <button @click.stop="handleDelete(habit.id)" class="ml-3 text-sm text-red-500 hover:underline">Eliminar</button>
      </div>
    </div>

    <h1 class="mt-8">Redondos</h1>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="habit in habits"
        :key="habit.id"
        @click="handleToggle(habit)"
        :class="[ 
          'w-20 h-20 rounded-full flex items-center justify-center text-2xl cursor-pointer shadow transition-all duration-300',
          habit.completed ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-primary)] border'
        ]"
      >
        {{ habit.icon }}
      </div>
    </div>

    <!-- Modal separado para crear un nuevo hábito -->
    <HabitModal
      :show="showModal"
      :initialValue="newHabit"
      @close="showModal = false"
      @create="handleCreateHabit"
    />
  </section>
</template>
