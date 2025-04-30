<script setup>
import { ref, onMounted } from 'vue'
import { getHabits, toggleHabitCompletion, deleteHabit, createHabit } from '@/firebase/habits'
import { getAuth } from 'firebase/auth'

const habits = ref([])
const loading = ref(true)
const showModal = ref(false)
const newHabit = ref({ name: '', emoji: '🔥' })
const currentUser = ref(null)

  // Icons
  import {
    IconPlus,
    IconLayoutGrid,
    IconLayoutList,
    IconEdit,
    IconTrash
  } from '@tabler/icons-vue'

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
  // Cambia visualmente primero
  const index = habits.value.findIndex(h => h.id === habit.id)
  if (index !== -1) {
    habits.value[index] = {
      ...habits.value[index],
      completed: !habits.value[index].completed
    }
  }

  // Luego actualiza en la base de datos (sin esperar recarga)
  await toggleHabitCompletion(habit.id, habits.value[index].completed)
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
      <IconPlus class="w-5 h-5"/>
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
        :class="['cursor-pointer px-6 py-4 rounded-full border border-[var(--color-primary)] shadow transition-all duration-500', 
                  habit.completed ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-primary)]']"
      >
        <span class="text-lg mr-2">{{ habit.emoji }}</span>
        <span class="font-semibold">{{ habit.name }}</span>
        <button @click.stop="handleDelete(habit.id)" class="ml-3 text-sm text-red-500 hover:underline">Eliminar</button>
      </div>

</div>

  <h1>Redondos</h1>
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
    {{ habit.emoji }}
  </div>

    </div>

    <div
  v-if="showModal"
  class="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center z-50 px-4"
>      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
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
