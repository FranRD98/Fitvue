<script setup>
import { onMounted, ref } from 'vue'
import { useAuth } from '@/supabase/useAuth'
import { uploadProfileImage, updateUserData } from '@/supabase/services/users'

const { userData, logout } = useAuth()

const name = ref(userData?.name || '')
const lastName = ref(userData?.last_name || '')
const email = ref(userData?.email || '')
const password = ref('')
const profileImage = ref(userData?.profile_image || '')
const imageFile = ref(null)
const updating = ref(false)

const handleImageChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  imageFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    profileImage.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const handleSave = async () => {
  updating.value = true
  try {
    let imageUrl = userData.profile_image
    if (imageFile.value) {
      imageUrl = await uploadProfileImage(imageFile.value, userData.id)
    }

    const updates = {
      name: name.value,
      lastName: lastName.value,
      email: email.value,
      profileImage: imageUrl
    }

    if (password.value) {
      await supabase.auth.updateUser({ password: password.value })
    }

    await updateUserData(userData.id, updates)
    alert('Datos actualizados correctamente.')
  } catch (err) {
    // Mostrar el error de manera detallada
    console.error('Error al guardar los cambios:', err)  // Mejor para depuración
    alert(`Error al guardar los cambios: ${err.message || 'Error desconocido'}`)
  } finally {
    updating.value = false
  }
}



const handleLogout = async () => {
  await logout()
  location.reload()
}

onMounted(async () => {
  try {
    if (userData.value) {
      name.value = userData.value.name || ''
      lastName.value = userData.value.last_name || ''
      email.value = userData.value.email || ''
      profileImage.value = userData.value.profile_image || ''
    }
  } catch (error) {
    console.error('Error al montar el componente:', error)
  }
})

</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Configuración</h1>
    </div>

    <div class="bg-white shadow rounded-xl p-6 max-w-3xl space-y-6">
      <!-- Imagen de perfil -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Imagen de perfil</label>
        <div class="image-upload-container">
          <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="hidden"
            id="profile-image-upload"
          />
          <label
            for="profile-image-upload"
            class="cursor-pointer border-dashed border-2 border-gray-300 p-4 w-full text-center rounded-lg hover:border-gray-400 flex flex-col items-center justify-center"
          >
            <span v-if="!profileImage" class="text-gray-600">Haz clic para subir una imagen</span>
            <div v-else class="relative w-32 h-32">
              <img :src="profileImage" alt="Imagen de perfil" class="w-full h-full object-cover rounded-full border" />
              <!-- Botón de eliminar (opcional) -->
              <button
                @click.prevent="profileImage = null"
                class="absolute top-1 right-1 w-6 h-6 bg-white bg-opacity-75 rounded-full flex items-center justify-center shadow hover:bg-opacity-100"
                title="Eliminar imagen"
              >
                ✖
              </button>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input v-model="name" type="text" class="w-full border rounded p-2 text-sm" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
        <input v-model="lastName" type="text" class="w-full border rounded p-2 text-sm" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
        <input v-model="email" type="email" class="w-full border rounded p-2 text-sm" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
        <input v-model="password" type="password" placeholder="Deja en blanco para no cambiarla" class="w-full border rounded p-2 text-sm" />
      </div>

      <div class="flex justify-between items-center pt-4 border-t">
        <button @click="handleLogout" class="text-sm text-red-600 hover:underline">Cerrar sesión</button>
        <button
          @click="handleSave"
          :disabled="updating"
          class="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] disabled:opacity-50 transition"
        >
          {{ updating ? 'Guardando...' : 'Guardar cambios' }}
        </button>
      </div>
    </div>
  </section>
</template>
