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
  <section>
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Usuarios</h1>
      <button class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nuevo usuario
      </button>
    </div>

  <div>

    <div v-if="loading">Cargando usuarios...</div>
    <div v-else-if="users.length === 0">No hay usuarios disponibles.</div>

      <!-- Filtros -->
      <div v-else class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <!-- Buscador -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Buscar usuario</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Nombre o correo..."
            class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700"
          />
        </div>

        <!-- Filtrar por plan -->
        <div>
          <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Plan</label>
          <select v-model="selectedPlan" class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700">
            <option value="">Todos</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <!-- Filtrar por rol -->
        <div>
          <label class="block text-sm font-medium text-[var(--color-primary)] mb-1">Rol</label>
          <select v-model="selectedRole" class="w-full border border-gray-300 rounded p-2 text-sm text-gray-700">
            <option value="">Todos</option>
            <option value="user">Usuario</option>
            <option value="coach">Coach</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>



    <div class="overflow-x-auto rounded-lg">
      <table class="min-w-full bg-white text-sm text-left rounded-full border border-gray-300">
        <thead class="bg-[var(--color-primary)] text-white">
          <tr>
            <th class="px-5 py-3 font-medium">Nombre</th>
            <th class="px-5 py-3 font-medium">Email</th>
            <th class="px-5 py-3 font-medium">Creado</th>
            <th class="px-5 py-3 font-medium">Plan</th>
            <th class="px-5 py-3 font-medium">Rol</th>
            <th class="px-5 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="odd:bg-white even:bg-gray-300 border-b border-gray-300"
          >
            <td class="px-5 py-2 font-semibold text-[var(--color-primary)] whitespace-nowrap">{{ user.name }} {{ user.last_name }}</td>
            <td class="px-5 py-2 font-medium whitespace-nowrap">{{ user.email }}</td>
            <td class="px-5 py-2 font-medium whitespace-nowrap">{{ user.created?.toDate().toLocaleDateString() }}</td>
            <td class="px-5 py-2 font-medium whitespace-nowrap">{{ user.suscriptionPlan }}</td>
            <td class="px-5 py-2 font-medium whitespace-nowrap">{{ user.role }}</td>

            <!-- Acciones -->
            <td class="px-5 py-2 flex items-center justify-end gap-3">
              <!-- Edit Button -->
              <button
                    @click="editUser(user)"
                    class="text-blue-500 hover:bg-blue-100 rounded-full transition"
                  >
                  <img class="w-6 h-auto" src="/icons/edit.svg">
                </button>

                <!-- Delete Button -->
                <button
                    @click="deleteUser(user)"
                    class="text-blue-500 hover:bg-blue-100 rounded-full transition"
                  >
                  <img class="w-6 h-auto" src="/icons/trash.svg">
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>  
</template>
  