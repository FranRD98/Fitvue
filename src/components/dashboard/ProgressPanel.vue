<script setup>
import { ref, onMounted, watch } from 'vue'
import ProgressFormModal from '@/components/dashboard/modals/ProgressFormModal.vue'

const showModal = ref(false) // Modal to add exercises


</script>

<template>
  <section>
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold text-[var(--color-primary)]">Mi Progreso</h1>
      <button
        @click="showModal = true"
        class="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--color-secondary)] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva revisión
      </button>
    </div>

    <!-- Modal -->
    <ProgressFormModal
      :show="showModal"
      @close="showModal = false"
    />

  </section>
</template>
  