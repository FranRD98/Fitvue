<template>
  <footer class="bg-[#cccccc] text-gray-700 text-sm pt-12">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start pb-12">
      
      <!-- Social + descripción -->
      <div class="space-y-4">
        <div class="flex gap-3">
          <a href="#"><i class="fab fa-instagram text-xl"></i></a>
          <a href="#"><i class="fab fa-tiktok text-xl"></i></a>
          <a href="#"><i class="fab fa-facebook-f text-xl"></i></a>
          <a href="#"><i class="fab fa-x-twitter text-xl"></i></a>
          <a href="#"><i class="fab fa-linkedin-in text-xl"></i></a>
        </div>
        <p class="text-sm text-gray-500">
          *FitVue no ofrece asesoramiento médico ni diagnóstico. Su uso es informativo.
        </p>

      </div>

      <!-- Navegación principal -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <h4 class="text-base font-semibold mb-2">FitVue</h4>
          <ul class="space-y-2">
            <li><router-link to="/nosotros">¿Qué es FitVue?</router-link></li>
            <li><router-link to="/rutinas">Rutinas</router-link></li>
            <li><router-link to="/nutricion">Nutrición</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="text-base font-semibold mb-2">Soporte</h4>
          <ul class="space-y-2">
            <li><router-link to="/contacto">Contacto</router-link></li>
            <li><router-link to="/FAQ">FAQ</router-link></li>
            <li><router-link to="/empezar">Comenzar</router-link></li>
          </ul>
        </div>
      </div>

      <!-- Info legal y contacto -->
      <div class="space-y-4">
        <h4 class="text-base font-semibold">Contacto</h4>
        <p>Email: <span class="font-medium">support@fitvue.com</span></p>
        <p>Teléfono: <span class="font-medium">+34 567 890 012</span></p>
      </div>
    </div>

    <!-- Legal links -->
    <div class="border-t border-gray-300 pt-6 pb-10">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-md text-gray-500 gap-2">
        <p>© 2025 FitVue · Fran Riera</p>
        <div class="flex gap-4">
          <router-link to="/politica-privacidad">Política de privacidad</router-link>
          <router-link to="/terminos-y-condiciones">Términos y condiciones</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
a:hover {
  color: #0e7490; /* cyan-800 */
  text-decoration: underline;
}
</style>
