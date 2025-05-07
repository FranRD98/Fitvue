<script setup>
import { ref } from 'vue'
import { useAuth } from '@/supabase/useAuth'
import { uploadProfileImage, updateUserData } from '@/supabase/services/users'

const { userData, logout } = useAuth()

const name = ref(userData?.name || '')
const surname = ref(userData?.surname || '')
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
      surname: surname.value,
      email: email.value,
      profile_image: imageUrl
    }

    if (password.value) {
      await supabase.auth.updateUser({ password: password.value })
    }

    await updateUserData(userData.id, updates)
    alert('Datos actualizados correctamente.')
  } catch (err) {
    console.error(err)
    alert('Error al guardar los cambios.')
  } finally {
    updating.value = false
  }
}

const handleLogout = async () => {
  await logout()
  location.reload()
}
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Configuración</h1>
    </div>

    <div class="bg-white shadow rounded-xl p-6 max-w-3xl space-y-6">
      <!-- Imagen de perfil -->
      <div class="flex items-center gap-4">
        <img
          :src="profileImage"
          alt="profile"
          class="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Imagen de perfil</label>
          <input type="file" accept="image/*" @change="handleImageChange" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input v-model="name" type="text" class="w-full border rounded p-2 text-sm" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
        <input v-model="surname" type="text" class="w-full border rounded p-2 text-sm" />
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
