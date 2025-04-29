<script setup>
const props = defineProps({
  menu: Array,
  activeKey: String
})
const emit = defineEmits(['update:activeKey'])

function setActive(key) {
  emit('update:activeKey', key)
}
</script>

<!-- DashboardSidebar.vue -->
<template>
  <aside class="w-64 bg-white shadow-lg flex flex-col h-screen sticky top-0 z-40">
    <div class="p-6">
      <router-link to="/" class="text-2xl font-bold flex items-center gap-2 text-[var(--color-primary)]">
        <img src="/Logo_azul.png" alt="logo" class="h-6" />
        fitVUE
      </router-link>
    </div>

    <nav class="flex-1 px-4">
      <ul class="space-y-1">
        <li
          v-for="item in menu"
          :key="item.key"
          @click="setActive(item.key)"
          :class="[
            'flex items-center gap-2 px-4 py-1.5 rounded-lg transition cursor-pointer',
            item.key === activeKey ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:bg-gray-100'
          ]"
        >
          <span>{{ item.icon }}</span>
          <span class="text-sm font-medium">{{ item.label }}</span>
        </li>
      </ul>
    </nav>

    <div class="mt-auto p-4">
      <div class="bg-gradient-to-br from-[var(--color-primary)] to-[#abd373] text-white p-4 rounded-lg text-sm">
        <p class="font-semibold mb-1">Actualiza a PRO</p>
        <p class="text-xs mb-2">Desbloquea funcionalidades avanzadas</p>
        <button class="bg-white text-[var(--color-primary)] px-3 py-1 rounded text-xs font-semibold">
          Actualizar
        </button>
      </div>
    </div>
  </aside>
</template>

