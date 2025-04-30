<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useAuth } from '@/firebase/useAuth'
import DashboardSidebar from './DashboardSidebar.vue'
import DashboardHeader from './DashboardHeader.vue'

// Icons
import {
  IconChartBar,
  IconBarbell,
  IconTreadmill,
  IconLeaf,
  IconSoup,
  IconToolsKitchen2,
  IconCarrot,
  IconBook,
  IconUsers,
  IconSettings
} from '@tabler/icons-vue'

const { userData } = useAuth()

const menuItems = [
  { key: 'progress', label: 'Mi Progreso', icon: IconChartBar, roles: ['user', 'coach', 'admin'] },
  { key: 'exercises', label: 'Ejercicios', icon: IconBarbell, roles: ['user', 'coach', 'admin'] },
  { key: 'routines', label: 'Rutinas', icon: IconTreadmill, roles: ['user', 'coach', 'admin'] },
  { key: 'habits', label: 'Hábitos', icon: IconLeaf, roles: ['user', 'coach', 'admin'] },
  { key: 'diets', label: 'Dietas', icon: IconToolsKitchen2, roles: ['user', 'coach', 'admin'] },
  { key: 'plates', label: 'Platos', icon: IconSoup, roles: ['user', 'coach', 'admin'] },
  { key: 'ingredients', label: 'Ingredientes', icon: IconCarrot, roles: ['user', 'coach', 'admin'] },
  { key: 'guides', label: 'Guías', icon: IconBook, roles: ['coach', 'admin'] },
  { key: 'users', label: 'Usuarios', icon: IconUsers, roles: ['admin'] },
  { key: 'config', label: 'Configuración', icon: IconSettings, roles: ['user', 'coach', 'admin'] }
]

const visibleMenu = computed(() =>
  userData.value ? menuItems.filter(i => i.roles.includes(userData.value.role)) : []
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
  config: defineAsyncComponent(() => import('@/components/dashboard/ConfigPanel.vue'))
}

const ActiveComponent = computed(() => componentsMap[activeKey.value])
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <DashboardSidebar :menu="visibleMenu" v-model:activeKey="activeKey" />

    <!-- Main content -->
    <div class="flex flex-col flex-1 h-screen overflow-hidden">
      <DashboardHeader />
      <main class="flex-1 overflow-y-auto p-6">
        <component :is="ActiveComponent" />
      </main>
    </div>
  </div>
</template>

