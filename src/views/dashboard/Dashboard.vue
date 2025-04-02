<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'

// Aquí irían tus roles reales, por ejemplo: "admin", "coach", "user"
const userRole = ref('user')

// Menú del panel (con control de roles)
const menuItems = [
  { key: 'progress', label: 'Mi Progreso', icon: '📊', roles: ['user', 'coach', 'admin'] },
  { key: 'routines', label: 'Rutinas', icon: '💪', roles: ['user', 'coach'] },
  { key: 'dietas', label: 'Dietas', icon: '🥗', roles: ['user', 'coach'] },
  { key: 'usuarios', label: 'Usuarios', icon: '👥', roles: ['admin'] },
  { key: 'config', label: 'Configuración', icon: '⚙️', roles: ['user', 'coach', 'admin'] }
]

// Filtro según rol
const visibleMenu = computed(() =>
  menuItems.filter(item => item.roles.includes(userRole.value))
)

// Estado del panel activo
const activeKey = ref('progress')

// Componentes dinámicos (lazy-loaded)
const componentsMap = {
  progress: defineAsyncComponent(() => import('@/components/dashboard/ProgressPanel.vue')),
  routines: defineAsyncComponent(() => import('@/components/dashboard/RoutinesPanel.vue')),
  dietas: defineAsyncComponent(() => import('@/components/dashboard/DietsPanel.vue')),
  usuarios: defineAsyncComponent(() => import('@/components/dashboard/UsersPanel.vue')),
  config: defineAsyncComponent(() => import('@/components/dashboard/ConfigPanel.vue'))
}

const ActiveComponent = computed(() => componentsMap[activeKey.value])
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
    
    <!-- Sidebar -->
    <aside class="w-full md:w-1/4 bg-white shadow rounded-lg p-6 space-y-4">
      <h2 class="text-xl font-bold text-[var(--color-primary)]">Panel</h2>
      <ul class="space-y-3">
        <li
          v-for="item in visibleMenu"
          :key="item.key"
          @click="activeKey = item.key"
          :class="[
            'flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition',
            activeKey === item.key
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-gray-700 hover:bg-gray-100'
          ]"
        >
          <span>{{ item.icon }}</span>
          {{ item.label }}
        </li>
      </ul>
    </aside>

    <!-- Main content (dinámico) -->
    <main class="w-full min-h-[400px] bg-white rounded-lg shadow p-6">
      <component :is="ActiveComponent" />
    </main>
  </section>
</template>
