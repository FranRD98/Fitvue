<script setup>
import { ref, onMounted, watch } from 'vue'
import { supabase } from '@/supabase/config';
import { createExercise, getExerciseCategories, updateExercise } from '@/supabase/services/exercises';

// Props y eventos
const props = defineProps({
  show: Boolean,
  initialData: Object
})
const emit = defineEmits(['close', 'saved'])

// Categorías y carga
const exerciseCategories = ref([]) 
const loading = ref(true)

const exercise = ref({
  name: '',
  description: '',
  id_category: '',
  image: ''
})

const imageFile = ref(null)  // Para almacenar la imagen seleccionada

// Cargar categorías
onMounted(async () => {
  try {
    exerciseCategories.value = await getExerciseCategories()
  } catch (error) {
    console.error('Error al obtener categorías:', error)
  } finally {
    loading.value = false
  }
})

// Escuchar cambios en initialData (edición)
watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      exercise.value = { ...newVal }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// Subir imagen al bucket
const uploadImage = async () => {
  if (imageFile.value) {
    const file = imageFile.value;
    const filePath = `icons/exercises/${Date.now()}-${file.name}`; // Ruta donde se guardará la imagen
    const { data, error } = await supabase
      .storage
      .from('fitvue') // Asegúrate de usar el nombre correcto de tu bucket
      .upload(filePath, file);

    if (error) {
      console.error('Error al subir la imagen:', error);
      return;
    }

    // Obtener la URL pública de la imagen subida
    const imageUrl = supabase
      .storage
      .from('fitvue')
      .getPublicUrl(filePath).data.publicUrl;

    // Asignar la URL de la imagen a `exercise.image` para que se refleje en el formulario
    exercise.value = { ...exercise.value, image: imageUrl };  // Aquí se asegura de que Vue observe el cambio

    // Actualizar imagen en la base de datos si el ejercicio tiene un id
    if (exercise.value.id) {
      const { error: updateError } = await supabase
        .from('exercises')
        .update({ image: imageUrl })  // Actualizar el campo 'image' con la nueva URL
        .match({ id: exercise.value.id }); // Asegúrate de que el ID del ejercicio sea correcto

      if (updateError) {
        console.error('Error al actualizar la imagen en la base de datos:', updateError);
      } else {
        console.log('Imagen actualizada en la base de datos correctamente');
      }
    }
  }
};

const deleteImage = async () => {
  const imageUrl = exercise.value.image;

  if (!imageUrl) return;

  // Si es una imagen subida (no local)
  if (!imageUrl.startsWith('blob:')) {
    // Extraer el path relativo dentro del bucket desde la URL pública
    const path = imageUrl.split('/storage/v1/object/public/fitvue/')[1];
    if (path) {
      const { error } = await supabase.storage.from('fitvue').remove([path]);
      if (error) {
        console.error('Error al eliminar la imagen del bucket:', error);
      } else {
        console.log('Imagen eliminada del bucket');
      }
    }

    // También borra la referencia en la base de datos si tiene ID
    if (exercise.value.id) {
      const { error: dbError } = await supabase
        .from('exercises')
        .update({ image: '' })
        .eq('id', exercise.value.id);

      if (dbError) {
        console.error('Error al limpiar la imagen de la base de datos:', dbError);
      } else {
        console.log('Imagen eliminada de la base de datos');
      }
    }
  }

  // Limpiar localmente
  exercise.value.image = '';
  imageFile.value = null;
};

// Guardar o actualizar
async function submitForm() {
  try {
    // Subir imagen si se seleccionó una
    if (imageFile.value) {
      await uploadImage()
    }

    if (exercise.value.id) {
      await updateExercise(exercise.value.id, exercise.value)
    } else {
      await createExercise(exercise.value)
    }

    emit('saved')
    close()
  } catch (error) {
    console.error('Error al guardar el ejercicio:', error)
  }
}

// Cerrar y limpiar
function close() {
  resetForm()
  emit('close')
}

// Reset form
function resetForm() {
  exercise.value = {
    name: '',
    description: '',
    id_category: '',
    image: ''
  }
  imageFile.value = null  // Limpiar archivo de imagen
}

// Función para manejar el cambio de la imagen
const handleImageChange = (event) => {
  const file = event.target.files[0]; // Accede al primer archivo seleccionado
  if (file) {
    // Crear una URL temporal para mostrar la vista previa de la imagen
    const imageUrl = URL.createObjectURL(file);
    
    // Asignar la URL temporal a exercise.image para que se vea la vista previa en el formulario
    exercise.value = { ...exercise.value, image: imageUrl };
    
    // Asignar el archivo a imageFile para subirlo más tarde
    imageFile.value = file;
  }
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center z-50 px-4">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl relative">
      <button @click="close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">✖</button>
      <h2 class="text-xl font-semibold mb-4 text-[var(--color-primary)]">
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

        <!-- Estilización del área de carga de imagen -->
        <label class="block text-sm font-medium text-gray-700">Imagen</label>
        <div class="image-upload-container">
          <input 
            type="file" 
            accept="image/*" 
            @change="handleImageChange" 
            class="hidden" 
            id="image-upload-input" 
          />
          <label for="image-upload-input" class="cursor-pointer border-dashed border-2 border-gray-300 p-6 w-full text-center rounded-lg hover:border-gray-400 flex justify-center items-center">
            <span v-if="!exercise.image" class="text-gray-600">Haz clic para subir una imagen</span>
            <span v-else class="text-gray-600">Imagen cargada</span>
            <div v-if="exercise.image" class="relative mt-4">
              <img :src="exercise.image" alt="Imagen del ejercicio" class="w-full h-40 object-cover rounded" />
              
              <!-- Botón de eliminar -->
              <button
                @click.prevent="deleteImage"
                class="absolute top-2 right-2 w-6 h-6 bg-white bg-opacity-75 rounded-full flex items-center justify-center shadow hover:bg-opacity-100"
                title="Eliminar imagen"
              >
              ✖
              </button>
            </div>
          </label>
        </div>

        <button
          type="submit"
          class="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
        >
          {{ exercise.id ? 'Guardar cambios' : 'Crear ejercicio' }}
        </button>
      </form>
    </div>
  </div>
</template>

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

.image-upload-container label {
  display: inline-block;
  width: 100%;
  cursor: pointer;
}

.image-upload-container img {
  object-fit: cover;
  max-width: 100%;
  height: 8rem; /* Reduce la altura de la imagen a 8rem (128px) */
  border-radius: 8px;
}

.text-center {
  text-align: center;
}

.hidden {
  display: none;
}
</style>
