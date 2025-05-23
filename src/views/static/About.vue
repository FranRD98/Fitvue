<template>
  <div class="bg-white text-[var(--color-text)]">
    <!-- Hero -->
    <section class="text-center py-20 px-4">
      <h1 class="text-5xl font-bold text-[var(--color-primary)] leading-tight mb-4">
        Desbloquea Tu Potencial<br />Con FitVue
      </h1>
      <p class="text-lg max-w-xl mx-auto text-gray-600 mb-6">
        Tu herramienta definitiva para entrenamientos, nutrición y bienestar. Todo en uno.
      </p>
      <div class="flex justify-center gap-4">
        <button class="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-secondary)]">
          Empezar gratis
        </button>
        <button class="px-6 py-2 border rounded-lg hover:border-[var(--color-primary)]">
          Solicitar demo
        </button>
      </div>
      <img
        src="https://placehold.co/900x500/005F78/FFF?text=Dashboard"
        alt="Dashboard preview"
        class="mx-auto mt-12 rounded-xl shadow-xl"
      />
    </section>

    <!-- Logos de confianza -->
    <section class="py-8 border-t border-b">
      <div class="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
        <img src="https://placehold.co/100x40?text=Logo1" alt="Logo1" />
        <img src="https://placehold.co/100x40?text=Logo2" alt="Logo2" />
        <img src="https://placehold.co/100x40?text=Logo3" alt="Logo3" />
        <img src="https://placehold.co/100x40?text=Logo4" alt="Logo4" />
        <img src="https://placehold.co/100x40?text=Logo5" alt="Logo5" />
      </div>
    </section>

    <!-- Características principales -->
    <section class="py-20 px-4 text-center">
      <h2 class="text-4xl font-bold text-[var(--color-primary)] mb-4">Lo que puedes hacer con FitVue</h2>
      <p class="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        Controla tu progreso, planifica tu rutina, cuida tu alimentación y mucho más desde una sola plataforma.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div class="p-6 bg-white rounded-xl shadow text-center">
          <img src="https://placehold.co/100x100?text=Img" alt="feature" class="mx-auto mb-4 rounded-full" />
          <h3 class="font-semibold text-lg text-[var(--color-primary)]">Planificación de Rutinas</h3>
          <p class="text-sm text-gray-600 mt-2">Organiza tu entrenamiento semanal y sigue tu progreso.</p>
        </div>
        <div class="p-6 bg-white rounded-xl shadow text-center">
          <img src="https://placehold.co/100x100?text=Img" alt="feature" class="mx-auto mb-4 rounded-full" />
          <h3 class="font-semibold text-lg text-[var(--color-primary)]">Seguimiento de Dieta</h3>
          <p class="text-sm text-gray-600 mt-2">Recibe planes personalizados y registra tus comidas diarias.</p>
        </div>
        <div class="p-6 bg-white rounded-xl shadow text-center">
          <img src="https://placehold.co/100x100?text=Img" alt="feature" class="mx-auto mb-4 rounded-full" />
          <h3 class="font-semibold text-lg text-[var(--color-primary)]">Control de Hábitos</h3>
          <p class="text-sm text-gray-600 mt-2">Desarrolla disciplina y construye hábitos saludables.</p>
        </div>
        <div class="p-6 bg-white rounded-xl shadow text-center">
          <img src="https://placehold.co/100x100?text=Img" alt="feature" class="mx-auto mb-4 rounded-full" />
          <h3 class="font-semibold text-lg text-[var(--color-primary)]">Informes y Resultados</h3>
          <p class="text-sm text-gray-600 mt-2">Visualiza gráficas e informes sobre tu evolución física y nutricional.</p>
        </div>
      </div>
    </section>

    <!-- Planes -->
    <section class="py-20 bg-gray-50 px-4 text-center">
      <h2 class="text-4xl font-bold text-[var(--color-primary)] mb-4">Elige tu plan</h2>
      <p class="text-lg text-gray-600 mb-12">Planes pensados para cualquier nivel de compromiso.</p>
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-xl font-semibold text-[var(--color-primary)] mb-2">Básico</h3>
          <p class="text-4xl font-bold">Gratis</p>
          <ul class="text-left mt-4 space-y-2 text-sm text-gray-600">
            <li>- Acceso a rutinas</li>
            <li>- Seguimiento de progreso</li>
            <li>- Acceso limitado a dietas</li>
          </ul>
          <button class="mt-6 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg">Empieza ya</button>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-xl border-2 border-[var(--color-primary)]">
          <h3 class="text-xl font-semibold text-[var(--color-primary)] mb-2">Pro</h3>
          <p class="text-4xl font-bold">$9<span class="text-lg font-normal">/mes</span></p>
          <ul class="text-left mt-4 space-y-2 text-sm text-gray-600">
            <li>- Todo en el plan Básico</li>
            <li>- Planes de dieta personalizados</li>
            <li>- Historial completo de entrenamientos</li>
            <li>- Recomendaciones de suplementos</li>
          </ul>
          <button class="mt-6 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg">Probar 7 días</button>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-xl font-semibold text-[var(--color-primary)] mb-2">Empresas</h3>
          <p class="text-4xl font-bold">Custom</p>
          <ul class="text-left mt-4 space-y-2 text-sm text-gray-600">
            <li>- Entrenadores y grupos</li>
            <li>- Admin multiusuario</li>
            <li>- Integración con apps externas</li>
          </ul>
          <button class="mt-6 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg">Contactar</button>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="py-20 px-4 text-center">
      <h2 class="text-4xl font-bold text-[var(--color-primary)] mb-4">Lo que dicen nuestros usuarios</h2>
      <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Miles de personas han transformado su vida con FitVue. Esto es lo que dicen:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div class="bg-white p-6 rounded-xl shadow text-left">
          <p class="text-sm text-gray-600 italic mb-4">
            "Gracias a FitVue he logrado entrenar de forma constante y con objetivos claros. Súper recomendable."
          </p>
          <div class="font-bold text-[var(--color-primary)]">Marta R.</div>
          <div class="text-sm text-gray-500">Diseñadora UX</div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-left">
          <p class="text-sm text-gray-600 italic mb-4">
            "Llevo 6 meses usando FitVue y los resultados hablan por sí solos. Me encanta el seguimiento de hábitos."
          </p>
          <div class="font-bold text-[var(--color-primary)]">Luis G.</div>
          <div class="text-sm text-gray-500">Entrenador personal</div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-left">
          <p class="text-sm text-gray-600 italic mb-4">
            "Nunca me había sentido tan motivado. FitVue hace que sea fácil mantener el rumbo."
          </p>
          <div class="font-bold text-[var(--color-primary)]">Ana S.</div>
          <div class="text-sm text-gray-500">Emprendedora</div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="bg-[var(--color-primary)] text-white py-16 text-center px-4">
      <h2 class="text-3xl font-bold mb-4">Unifica tu salud y rendimiento en un solo lugar</h2>
      <p class="mb-6">Prueba FitVue gratis y descubre el cambio.</p>
      <button class="bg-white text-[var(--color-primary)] font-semibold px-6 py-2 rounded-lg">
        Empieza ahora
      </button>
    </section>

    <!-- Footer -->
    <footer class="bg-white py-10 text-sm text-gray-500 text-center">
      <div class="max-w-4xl mx-auto space-y-2">
        <p>© 2025 FitVue. Todos los derechos reservados.</p>
        <div class="flex justify-center gap-6">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Contacto</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Este componente estático no requiere lógica JS por ahora
</script>

<style scoped>
/* Animaciones opcionales para mejorar interactividad */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
