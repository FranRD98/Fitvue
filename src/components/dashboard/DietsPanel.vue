<script>
import { ref, onMounted } from 'vue'

const diets = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    diets.value = await getDiets()
  } catch (error) {
    console.error('Error cargando dietas', error)
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <section>
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Dietas</h1>
      <button class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva dieta
      </button>
    </div>

  </section>
</template>
  