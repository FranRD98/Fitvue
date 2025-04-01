<template>
    <div class="bg-[var(--color-bg)] min-h-screen">

        <header class="text-[var(--color-text-light) py-12">
        <div class="container mx-auto text-center">
          <h1 class="text-5xl font-bold">Sobre nosotros</h1>
          <p class="mt-4 text-lg md:text-xl text-[var(--color-text-light)]">
            Descubre nuestra misión, visión y valores en FitVue.
          </p>
        </div>
      </header>

      <!-- Nuestra Misión -->
      <section class="py-20 px-8 bg-white text-[var(--color-text-light)]">
        <div class="container mx-auto text-center">
          <h2 class="text-4xl font-semibold text-[var(--color-primary)]">Nuestra Misión</h2>
          <p class="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            En FitVue, nos dedicamos a ofrecer planes de entrenamiento personalizados para ayudarte a transformar tu vida. Nos apasiona acompañarte en tu viaje hacia el bienestar y el estilo de vida saludable, proporcionando soluciones basadas en tus objetivos y necesidades únicas.
          </p>
        </div>
      </section>
  
      <!-- Nuestro Equipo -->
      <section class="py-20 px-8 bg-[var(--color-tertiary)] text-[var(--color-text-light)]">
        <div class="container mx-auto text-center">
          <h2 class="text-4xl font-semibold">Nuestro Equipo</h2>
          <p class="mt-4 text-lg max-w-2xl mx-auto">
            El equipo de FitVue está formado por expertos en fitness, nutrición y bienestar. Nuestra misión es guiarte en cada paso del camino hacia un estilo de vida más saludable.
          </p>
        </div>
        <div class="container mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://placehold.co/150/387373/FFF?text=Carlos&font=poppins" alt="Entrenador 1" class="w-32 h-32 rounded-full mx-auto mb-4">
            <h3 class="text-2xl font-semibold text-[var(--color-primary)]">Carlos Gómez</h3>
            <p class="text-lg text-[var(--color-text-light)]">Entrenador personal certificado</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://placehold.co/150/387373/FFF?text=Laura&font=poppins" alt="Entrenador 2" class="w-32 h-32 rounded-full mx-auto mb-4">
            <h3 class="text-2xl font-semibold text-[var(--color-primary)]">Laura Díaz</h3>
            <p class="text-lg text-[var(--color-text-light)]">Nutricionista deportiva</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://placehold.co/150/387373/FFF?text=Juan&font=poppins" alt="Entrenador 3" class="w-32 h-32 rounded-full mx-auto mb-4">
            <h3 class="text-2xl font-semibold text-[var(--color-primary)]">Juan Pérez</h3>
            <p class="text-lg text-[var(--color-text-light)]">Coach de bienestar integral</p>
          </div>
        </div>
      </section>
  
      <!-- Nuestros Valores -->
      <section class="py-20 px-8 bg-[var(--color-secondary)] text-white">
        <div class="container mx-auto text-center">
          <h2 class="text-4xl font-semibold">Nuestros Valores</h2>
          <p class="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            En FitVue, nos guiamos por principios sólidos que nos permiten ofrecer un servicio de calidad y asegurar que cada uno de nuestros usuarios alcance sus metas.
          </p>
        </div>
        <div class="container mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-semibold text-[var(--color-primary)]">Compromiso</h3>
            <p class="mt-4 text-lg text-[var(--color-text-light)]">Nos comprometemos a estar a tu lado en todo momento, asegurándonos de que logres tus objetivos.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-semibold text-[var(--color-primary)]">Adaptabilidad</h3>
            <p class="mt-4 text-lg text-[var(--color-text-light)]">Nos ajustamos a tus necesidades, adaptando los planes de entrenamiento a tu ritmo y posibilidades.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-semibold text-[var(--color-primary)]">Empoderamiento</h3>
            <p class="mt-4 text-lg text-[var(--color-text-light)]">Queremos que tomes el control de tu bienestar y te ayudes a sentirte bien tanto física como mentalmente.</p>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-[var(--color-primary)] text-white py-6 mt-16">
        <div class="container mx-auto text-center">
          <p>&copy; 2025 FitVue. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  // Aquí puedes agregar funcionalidades si las necesitas
  </script>
  
  <style scoped>
  /* Estilos adicionales */
  </style>