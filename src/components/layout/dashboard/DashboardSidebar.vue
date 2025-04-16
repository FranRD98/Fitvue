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

<template>
  <aside class="max-w-1/4 bg-white shadow-md h-auto flex flex-col items-center px-4 py-6 sticky">

    <!-- Logo -->
    <div class="flex flex-row items-center gap-4 mb-4">
      <router-link to="/">
        <h1 class="text-2xl font-bold tracking-widest flex items-center">
            <img src="/Logo_azul.png" alt="FitVue Logo" class="h-6 mb-3 mr-2">fitVUE
        </h1>
      </router-link>
    </div>

    <div class="flex flex-col h-full justify-between">
      <ul class="space-y-1">
        <li
          v-for="item in menu"
          :key="item.key"
          @click="setActive(item.key)"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition',
            item.key === activeKey
              ? 'bg-[var(--color-primary)] text-white'
              : 'hover:bg-gray-200 text-gray-600'
          ]"
        >
          <span>{{ item.icon }}</span>
          <span class="text-sm">{{ item.label }}</span>
        </li>
      </ul>

      <div
    class="w-1/2 h-1/2 group relative px-6 py-5 rounded-lg flex flex-col items-center text-center overflow-hidden shadow-lg bg-white border hover:shadow-xl transition duration-300"
  >
    <!-- Fondo animado -->
    <div
      class="absolute inset-0 z-0 bg-gradient-to-br from-[var(--color-primary)] to-[#abd373] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    ></div>

    <!-- Contenido -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 90 90"
      class="w-16 h-16 z-10 text-[#abd373] mb-3 group-hover:scale-110 transition-transform"
    >
      <path
        d="M 37.712 41.541 c -2.437 -10.14 2.919 -19.609 8.772 -25.137 c -6.221 11.54 -7.41 20.104 -3.461 33.177 l 2.29 -0.854 c -0.882 -2.464 -1.413 -4.873 -1.685 -7.241 c 8.23 -2.355 13.883 -7.209 15.231 -15.926 C 59.796 13.651 52.042 6.72 43.718 0.117 c 3.04 9.758 -11.581 17.964 -10.296 30.949 c 0.271 2.741 0.697 5.33 1.326 7.825"
        fill="#7fb241"
      />
      <path
        d="M 34.069 30.999 c 0.917 -12.923 13.599 -21.098 9.649 -30.883 c 1.394 8.216 -9.771 12.38 -12.663 22.195 c -1.575 5.836 -1.151 11.452 3.693 16.579 C 34.119 36.396 33.937 33.751 34.069 30.999 z"
        fill="#719c40"
      />
      <polygon
        points="68.77,61.09 70.46,47.61 43.69,47.61 19.54,47.61 21.23,61.09"
        fill="#a07e63"
      />
      <polyline
        points="63.11,61.09 59.5,90 44.01,90 30.5,90 26.89,61.09"
        fill="#a07e63"
      />
      <polygon
        points="62.61,65.09 63.11,61.09 26.89,61.09 27.39,65.09"
        fill="#916b4d"
      />
    </svg>

    <p class="text-lg font-bold text-gray-800 z-10 group-hover:text-white">¡Go Pro!</p>
    <p class="text-sm text-gray-500 z-10 group-hover:text-white">
      Mejora tu experiencia con características avanzadas
    </p>

    <button
      class="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#abd373] rounded-full shadow hover:scale-105 transition z-10"
    >
      Actualizar
    </button>
  </div>

    </div>
      
  
  </aside>
</template>
