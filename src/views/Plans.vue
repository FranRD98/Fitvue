<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-12">
    <h2 class="text-3xl font-bold text-gray-800">Elige tu plan</h2>
    <p class="text-gray-600 mt-2">Selecciona el plan que mejor se adapte a tus necesidades</p>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      <!-- Plan Básico -->
      <div class="p-6 bg-white rounded-lg shadow-lg border border-gray-200 relative flex flex-col justify-between h-full">
        <h3 class="text-xl font-semibold text-gray-800 text-center">Básico</h3>
        <p class="text-lg text-gray-600 text-center mt-2 font-medium">€9.99 / mes</p>

        <ul class="mt-4 space-y-2 text-gray-700">
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Acceso a entrenamientos básicos
          </li>
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Soporte por email
          </li>
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> 1 rutina personalizada
          </li>
        </ul>

        <button class="mt-6 w-full px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition">
          Elegir plan
        </button>
      </div>

      <!-- Plan Avanzado -->
      <div class="p-6 bg-white rounded-lg shadow-lg border border-gray-200 relative flex flex-col justify-between h-full">
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-accent text-white text-sm px-4 py-1 rounded-b-lg">
          Más popular
        </div>
        <h3 class="text-xl font-semibold text-gray-800 text-center">Avanzado</h3>
        <p class="text-lg text-gray-600 text-center mt-2 font-medium">€19.99 / mes</p>

        <ul class="mt-4 space-y-2 text-gray-700">
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Acceso completo a todos los entrenamientos
          </li>
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Soporte prioritario
          </li>
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Rutinas personalizadas ilimitadas
          </li>
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Seguimiento de progreso avanzado
          </li>
        </ul>

        <button class="mt-6 w-full px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition">
          Elegir plan
        </button>
      </div>

      <!-- Plan Premium -->
      <div class="p-6 bg-white rounded-lg shadow-lg border border-gray-200 relative flex flex-col justify-between h-full">
        <h3 class="text-xl font-semibold text-gray-800 text-center">Premium</h3>
        <p class="text-lg text-gray-600 text-center mt-2 font-medium">€29.99 / mes</p>

        <ul class="mt-4 space-y-2 text-gray-700">
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Todo lo del plan Avanzado
          </li>
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Sesiones en vivo con entrenadores
          </li>
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Acceso a contenido exclusivo
          </li>
          <li class="flex items-center">
            <span class="text-accent mr-2">✔</span> Descuentos en productos asociados
          </li>
        </ul>

        <button class="mt-6 w-full px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition">
          Elegir plan
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.bg-accent {
  background-color: var(--color-accent); /* Usando la variable de color definida */
}

.text-accent {
  color: var(--color-accent); /* Usando la variable de color para los íconos y texto */
}
</style>