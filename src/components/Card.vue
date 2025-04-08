<script setup>
defineProps({
  item: Object,
  routeTo: String
})
</script>

<template>
  <router-link
    :to="routeTo"
    class="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col transition-all h-full"
  >
    <!-- Imagen -->
    <img
    :src="item?.imageUrl || 'https://placehold.co/600x400?text=Sin+Imagen'"
    alt="Imagen"
        class="w-full h-48 object-cover"
      />

    <!-- Contenido -->
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-[var(--color-primary)] mb-1">
        {{ item.title }}
      </h3>

      <p class="text-sm text-gray-500 mb-3 line-clamp-3">
        {{ item.description }}
      </p>

      <!-- Info inferior: ocupa el espacio restante -->
      <div class="text-xs text-gray-400 mt-auto">
        <p v-if="item.author"><strong>Autor:</strong> {{ item.author }}</p>
        <p v-if="item.category?.title"><strong>Categoría:</strong> {{ item.category.title }}</p>
        <p v-if="item.created"><strong>Fecha:</strong> {{ item.created.toDate().toLocaleDateString() }}</p>
      </div>
    </div>
  </router-link>
</template>
