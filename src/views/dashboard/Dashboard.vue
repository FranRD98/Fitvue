<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useAuth } from '@/firebase/useAuth'

const { userData } = useAuth();

const menuItems = [
  { key: 'progress', label: 'Mi Progreso', icon: '📈', roles: ['user', 'coach', 'admin'] },
  { key: 'exercises', label: 'Ejercicios', icon: '🏋️', roles: ['user', 'coach', 'admin'] },
  { key: 'routines', label: 'Rutinas', icon: '💪', roles: ['user', 'coach', 'admin'] },
  { key: 'habits', label: 'Habitos', icon: '🌱', roles: ['user', 'coach', 'admin'] },
  { key: 'diets', label: 'Dietas', icon: '🥗', roles: ['user', 'coach', 'admin'] },
  { key: 'plates', label: 'Platos', icon: '🍽️', roles: ['user', 'coach', 'admin'] },
  { key: 'ingredients', label: 'Ingredientes', icon: '🍗', roles: ['user', 'coach', 'admin'] },
  { key: 'guides', label: 'Guías', icon: '📖', roles: ['coach', 'admin'] },
  { key: 'users', label: 'Usuarios', icon: '👥', roles: ['admin'] },
  { key: 'config', label: 'Configuración', icon: '⚙️', roles: ['user', 'coach', 'admin'] },
]

const visibleMenu = computed(() =>
  userData.value
    ? menuItems.filter(item => item.roles.includes(userData.value.role))
    : []
)

const activeKey = ref('progress')

const componentsMap = {
  progress: defineAsyncComponent(() => import('@/components/dashboard/ProgressPanel.vue')),
  exercises: defineAsyncComponent(() => import('@/components/dashboard/ExercisesPanel.vue')),
  routines: defineAsyncComponent(() => import('@/components/dashboard/RoutinesPanel.vue')),
  habits: defineAsyncComponent(() => import('@/components/dashboard/HabitsPanel.vue')),
  diets: defineAsyncComponent(() => import('@/components/dashboard/DietsPanel.vue')),
  plates: defineAsyncComponent(() => import('@/components/dashboard/PlatesPanel.vue')),
  ingredients: defineAsyncComponent(() => import('@/components/dashboard/IngredientsPanel.vue')),
  guides: defineAsyncComponent(() => import('@/components/dashboard/GuidesPanel.vue')),
  users: defineAsyncComponent(() => import('@/components/dashboard/UsersPanel.vue')),
  config: defineAsyncComponent(() => import('@/components/dashboard/ConfigPanel.vue')),
}

const ActiveComponent = computed(() => componentsMap[activeKey.value])

const handleMenuClick = (key) => {
  activeKey.value = key
}

</script>


<template>
  <section class="max-w-[100rem] mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
    
    <!-- Sidebar -->
    <aside class="w-full md:w-1/4 bg-white shadow rounded-lg p-6 space-y-4">
      <h2 class="text-xl font-bold text-[var(--color-primary)]">Panel</h2>
      <ul class="space-y-1">
        <li
          v-for="item in visibleMenu"
          :key="item.key"
          @click="handleMenuClick(item.key)"
          :class="[
            'flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition',
            activeKey === item.key && item.key !== 'logout'
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