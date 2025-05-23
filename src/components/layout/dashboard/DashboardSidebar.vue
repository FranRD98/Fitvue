<script setup>
const props = defineProps({
  menu: Array,
  activeKey: String
})
const emit = defineEmits(['update:activeKey', 'close'])

function setActive(key) {
  emit('update:activeKey', key)
  emit('close') // cerrar en móvil al seleccionar
}

import { IconCrown } from '@tabler/icons-vue'
</script>

<template>
  <aside class="flex flex-col h-full">
    <div class="py-4 px-6 flex items-center justify-between">
      <router-link to="/" class="text-4xl font-bold">
        <span>fit</span><span class="text-[var(--color-primary)]">VUE</span>
      </router-link>
      <!-- Botón cerrar solo visible en móvil -->
      <button class="md:hidden text-xl" @click="$emit('close')">✕</button>
    </div>

    <nav class="flex-1 overflow-y-auto px-4">
      <ul class="space-y-1">
        <li
          v-for="item in menu"
          :key="item.key"
          @click="setActive(item.key)"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-lg transition cursor-pointer',
            item.key === activeKey ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:bg-gray-100'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" :stroke-width="2" />
          <span class="text-sm font-medium">{{ item.label }}</span>
        </li>
      </ul>
    </nav>

    <!-- Premium: solo visible en desktop -->
    <div class="mt-auto p-4">
      <div class="bg-gradient-to-br from-cyan-900 via-cyan-700 to-cyan-600 text-white p-4 rounded-xl shadow-lg">
        <div class="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center mb-3">
          <IconCrown class="w-6 h-6"/>
        </div>
        <p class="font-semibold mb-1">Actualiza a PREMIUM</p>
        <p class="text-xs mb-4">Desbloquea nuevas funcionalidades</p>
        <button class="w-full bg-white text-cyan-900 text-sm font-semibold py-1.5 rounded-lg hover:bg-gray-100">
          Actualizar
        </button>
      </div>
    </div>
  </aside>
</template>
