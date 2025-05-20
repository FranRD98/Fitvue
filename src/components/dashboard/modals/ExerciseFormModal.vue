<template>
  <div v-if="show" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center px-4">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[90vh] flex flex-col relative overflow-hidden">
      <!-- Botón de cerrar -->
      <button @click="emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition" aria-label="Cerrar">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Navegación superior -->
      <div class="flex border-b divide-x">
        <div
          class="flex-1 text-center py-4 cursor-pointer hover:bg-gray-100"
          :class="{ 'bg-gray-100 font-semibold text-[var(--color-primary)]': selectedTab === 'info' }"
          @click="selectedTab = 'info'"
        >
          Información
        </div>
        <div
          class="flex-1 text-center py-4 cursor-pointer hover:bg-gray-100"
          :class="{ 'bg-gray-100 font-semibold text-[var(--color-primary)]': selectedTab === 'history' }"
          @click="selectedTab = 'history'"
        >
          Historial
        </div>
        <div
          class="flex-1 text-center py-4 cursor-pointer hover:bg-gray-100"
          :class="{ 'bg-gray-100 font-semibold text-[var(--color-primary)]': selectedTab === 'tutorial' }"
          @click="selectedTab = 'tutorial'"
        >
          Tutorial
        </div>
      </div>

      <!-- Contenido inferior -->
      <transition name="fade" mode="out-in">
        <div :key="selectedTab" class="p-6 overflow-y-auto flex-1">
          <!-- Info -->
          <div v-if="selectedTab === 'info'" class="space-y-4">
            <h2 class="text-xl font-semibold text-[var(--color-primary)]">
              {{ exercise.id ? 'Editar ejercicio' : 'Crear ejercicio' }}
            </h2>
            <form @submit.prevent="submitForm" class="space-y-4">
              <input v-model="exercise.name" placeholder="Ejercicio" class="input" required />
              <input v-model="exercise.description" placeholder="Descripción corta" class="input" />

              <label class="block text-sm font-medium text-gray-700">Grupo muscular</label>
              <select v-model="exercise.id_category" class="w-full border border-gray-300 p-2 rounded" required>
                <option disabled value="">Selecciona un grupo muscular</option>
                <option v-for="category in exerciseCategories" :key="category.id" :value="category.id">
                  {{ category.category_name }}
                </option>
              </select>

              <label class="block text-sm font-medium text-gray-700">Imagen</label>
              <div class="image-upload-container">
                <input type="file" accept="image/*" @change="handleImageChange" class="hidden" id="image-upload-input" />
                <label for="image-upload-input" class="cursor-pointer border-dashed border-2 border-gray-300 p-6 text-center rounded-lg hover:border-gray-400 block">
                  <span v-if="!exercise.image" class="text-gray-600">Haz clic para subir una imagen</span>
                  <div v-if="exercise.image" class="relative mt-4">
                    <img :src="exercise.image" alt="Imagen del ejercicio" class="w-full h-40 object-cover rounded" />
                    <button
                      @click.prevent="deleteImage"
                      class="absolute top-2 right-2 w-6 h-6 bg-white bg-opacity-75 rounded-full flex items-center justify-center shadow hover:bg-opacity-100"
                      title="Eliminar imagen"
                    >✖</button>
                  </div>
                </label>
              </div>

              <div class="text-right">
                <button
                  type="submit"
                  class="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
                >
                  {{ exercise.id ? 'Guardar cambios' : 'Crear ejercicio' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Historial -->
          <div v-else-if="selectedTab === 'history'">
            <p class="text-gray-500">Aquí irá el historial de levantamientos. (Aún por implementar)</p>
          </div>

          <!-- Tutorial -->
          <div v-else-if="selectedTab === 'tutorial'">
            <p class="text-gray-500">Aquí se mostrará el tutorial del ejercicio. (Aún por implementar)</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '@/supabase/config';
import { createExercise, getExerciseCategories, updateExercise } from '@/supabase/services/exercises';

const props = defineProps({ show: Boolean, initialData: Object })
const emit = defineEmits(['close', 'saved'])

const selectedTab = ref('info')
const exerciseCategories = ref([])
const loading = ref(true)

const exercise = ref({ name: '', description: '', id_category: '', image: '' })
const imageFile = ref(null)

onMounted(async () => {
  try {
    exerciseCategories.value = await getExerciseCategories()
  } catch (error) {
    console.error('Error al obtener categorías:', error)
  } finally {
    loading.value = false
  }
})

watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) exercise.value = { ...newVal }
    else resetForm()
  },
  { immediate: true }
)

const uploadImage = async () => {
  if (!imageFile.value) return;
  const file = imageFile.value;
  const filePath = `icons/exercises/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from('fitvue').upload(filePath, file);
  if (error) return console.error('Error al subir imagen:', error);
  const imageUrl = supabase.storage.from('fitvue').getPublicUrl(filePath).data.publicUrl;
  exercise.value.image = imageUrl;

  if (exercise.value.id) {
    const { error: updateError } = await supabase
      .from('exercises')
      .update({ image: imageUrl })
      .match({ id: exercise.value.id });
    if (updateError) console.error('Error actualizando imagen:', updateError);
  }
};

const deleteImage = async () => {
  const imageUrl = exercise.value.image;
  if (!imageUrl || imageUrl.startsWith('blob:')) return;
  const path = imageUrl.split('/storage/v1/object/public/fitvue/')[1];
  if (path) await supabase.storage.from('fitvue').remove([path]);
  if (exercise.value.id) await supabase.from('exercises').update({ image: '' }).eq('id', exercise.value.id);
  exercise.value.image = '';
  imageFile.value = null;
};

const submitForm = async () => {
  if (imageFile.value) await uploadImage();
  if (exercise.value.id) await updateExercise(exercise.value.id, exercise.value)
  else await createExercise(exercise.value)
  emit('saved')
  close()
};

function close() {
  resetForm()
  emit('close')
}

function resetForm() {
  exercise.value = { name: '', description: '', id_category: '', image: '' }
  imageFile.value = null
}

const handleImageChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const resizedFile = await resizeImage(file, 800)
  exercise.value.image = URL.createObjectURL(resizedFile)
  imageFile.value = resizedFile
}

const resizeImage = (file, maxWidth = 800) => {
  return new Promise((resolve) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target.result
    }

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const scaleFactor = maxWidth / img.width
      canvas.width = maxWidth
      canvas.height = img.height * scaleFactor

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], file.name, { type: file.type })
        resolve(resizedFile)
      }, file.type, 0.8) // compresión al 80%
    }

    reader.readAsDataURL(file)
  })
}

</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.image-upload-container {
  position: relative;
  text-align: center;
}

.image-upload-container img {
  object-fit: cover;
  width: 100%;
  height: 8rem;
  border-radius: 0.5rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>