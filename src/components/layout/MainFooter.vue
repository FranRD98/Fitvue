<template>
  <footer class="bg-[var(--color-primary)] shadow-xl text-white text-sm pt-12">
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
        <p class="text-sm">
          *FitVue no ofrece asesoramiento médico ni diagnóstico. Su uso es informativo.
        </p>

      </div>

      <!-- Navegación principal -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <h4 class="text-lg font-semibold mb-2">fitVUE</h4>
          <ul class="space-y-2">
            <li><router-link to="/nosotros" class="nav-link">¿Qué es FitVue?</router-link></li>
            <li><router-link to="/rutinas" class="nav-link">Rutinas</router-link></li>
            <li><router-link to="/nutricion" class="nav-link">Nutrición</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-2">Soporte</h4>
          <ul class="space-y-2">
            <li><router-link to="/contacto" class="nav-link">Contacto</router-link></li>
            <li><router-link to="/FAQ" class="nav-link">FAQ</router-link></li>
            <li><router-link to="/empezar" class="nav-link">Comenzar</router-link></li>
          </ul>
        </div>
      </div>

      <!-- Info legal y contacto -->
      <div class="space-y-4">
        <h4 class="text-lg font-semibold">Contacto</h4>
        <p>Email: <span class="font-medium">support@fitvue.com</span></p>
        <p>Teléfono: <span class="font-medium">+34 567 890 012</span></p>
      </div>
    </div>

    <!-- Legal links -->
    <div class="bg-[var(--color-secondary)] text-white pt-6 pb-10">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-md gap-2">
        <p>© 2025 FitVue · Fran Riera</p>
        <div class="flex gap-4">
          <router-link to="/politica-privacidad" class="nav-link">Política de privacidad</router-link>
          <router-link to="/terminos-y-condiciones" class="nav-link">Términos y condiciones</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

.nav-link {
  position: relative;
  display: inline-block;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: white;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
