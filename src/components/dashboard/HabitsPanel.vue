<script setup>
import { ref, onMounted } from 'vue'
import { getHabits, toggleHabitCompletion, deleteHabit, createHabit } from '@/firebase/habits'
import { getAuth } from 'firebase/auth'

const habits = ref([])
const loading = ref(true)
const showModal = ref(false)
const newHabit = ref({ name: '', emoji: '🔥' })
const currentUser = ref(null)

onMounted(async () => {
  const auth = getAuth()
  currentUser.value = auth.currentUser
  if (currentUser.value) {
    loadHabits()
  }
})

const loadHabits = async () => {
  loading.value = true
  try {
    habits.value = await getHabits(currentUser.value.uid)
  } catch (error) {
    console.error('Error al cargar hábitos:', error)
  } finally {
    loading.value = false
  }
}

const handleCreateHabit = async () => {
  if (!newHabit.value.name) return
  await createHabit({ ...newHabit.value, uid: currentUser.value.uid, completed: false })
  newHabit.value.name = ''
  showModal.value = false
  loadHabits()
}

const handleToggle = async (habit) => {
  await toggleHabitCompletion(habit.id, !habit.completed)
  loadHabits()
}

const handleDelete = async (habitId) => {
  if (confirm('¿Seguro que quieres eliminar este hábito?')) {
    await deleteHabit(habitId)
    loadHabits()
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
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>Añadir hábito
      </button>
    </div>

    <div v-if="loading">Cargando hábitos...</div>
    <div v-else-if="habits.length === 0" class="text-gray-600">No tienes hábitos aún.</div>

    <div v-else class="flex flex-wrap gap-4">
      <div
        v-for="habit in habits"
        :key="habit.id"
        @click="handleToggle(habit)"
        :class="['cursor-pointer px-6 py-4 rounded-full border shadow transition-all', 
                  habit.completed ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-primary)]']"
      >
        <span class="text-lg mr-2">{{ habit.emoji }}</span>
        <span class="font-semibold">{{ habit.name }}</span>
        <button @click.stop="handleDelete(habit.id)" class="ml-3 text-sm text-red-500 hover:underline">Eliminar</button>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button @click="showModal = false" class="absolute top-3 right-3 text-gray-400 text-xl">✖</button>
        <h2 class="text-xl font-bold mb-4 text-[var(--color-primary)]">Nuevo Hábito</h2>
        <form @submit.prevent="handleCreateHabit" class="space-y-4">
          <input v-model="newHabit.name" placeholder="Nombre del hábito" class="input" required />
          <input v-model="newHabit.emoji" placeholder="Emoji (🔥, 🏃‍♂️, 💧...)" class="input" />
          <button type="submit" class="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[var(--color-secondary)]">
            Crear hábito
          </button>
        </form>
      </div>
    </div>
  </section>
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
