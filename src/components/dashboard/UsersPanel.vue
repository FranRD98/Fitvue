<!-- UsersPanel.vue -->
<script setup>

import { ref, onMounted } from 'vue'
import { getUsers, editUser, deleteUser } from '@/firebase/firebase-functions.js'

const users = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    users.value = await getUsers()
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 text-[var(--color-primary)]">Usuarios</h1>

    <div v-if="loading">Cargando usuarios...</div>
    <div v-else-if="users.length === 0">No hay usuarios disponibles.</div>

    <table v-else class="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead class="bg-[var(--color-primary)] text-white">
        <tr>
          <th class="text-left px-4 py-3">Nombre</th>
          <th class="text-left px-4 py-3">Email</th>
          <th class="text-left px-4 py-3">Rol</th>
          <th class="text-left px-4 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id" class="border-t hover:bg-gray-50">
          <td class="px-4 py-3">{{ user.name }} {{ user.last_name }}</td>
          <td class="px-4 py-3">{{ user.email }}</td>
          <td class="px-4 py-3">{{ user.role }}</td>
          <td class="px-4 py-3 text-right">
            <div class="flex justify-end gap-2">
              <button
                class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                @click="editUser(user)"
              >
                Editar
              </button>
              <button
                class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                @click="deleteUser(user)"
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  