import { createRouter, createWebHistory } from 'vue-router';

// Importamos las vistas
import Home from '@/views/Home.vue';
import About from '@/views/static/About.vue';
import Contact from '@/views/static/Contact.vue';
import Login from '@/views/auth/Login.vue';
import StartChange from '@/views/auth/StartChange.vue';
import NotFound from '@/views/static/NotFound.vue';
import FAQ from '@/views/static/FAQ.vue';

import Routines from '@/views/routines/Routines.vue';
import Nutrition from '@/views/nutrition/Nutritions.vue';
import Diets from '@/views/nutrition/Diets.vue';
import Suplementation from '@/views/nutrition/Suplementation.vue';

import PrivacyPolicy from '@/views/legal/PrivacyPolicy.vue';
import Terms from '@/views/legal/Terms.vue';

import Dashboard from '@/views/dashboard/Dashboard.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/nosotros', name: 'About', component: About },
  { path: '/rutinas', name: 'Rutinas', component: Routines },
  { path: '/rutinas/entrenamiento', name: 'Rutinas Entrenamiento', component: Routines },
  { path: '/rutinas/mindfulness', name: 'Rutinas Mindfulness', component: Routines },
  { path: '/rutinas/estiramientos', name: 'Rutinas Estiramientos', component: Routines },
  { path: '/rutinas/yoga', name: 'Rutinas Yoga', component: Routines },
  { path: '/nutricion', name: 'Nutrición', component: Nutrition },
  { path: '/nutricion/dietas', name: 'Nutrición Dietas', component: Diets },
  { path: '/nutricion/suplementacion', name: 'Nutrición Suplementación', component: Suplementation },
  { path: '/nutricion/recetas', name: 'Nutrición Recetas', component: Nutrition },
  { path: '/contacto', name: 'Contact', component: Contact },
  { path: '/FAQ', name: 'Preguntas Frecuentes', component: FAQ },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/empezar', name: 'Start Change', component: StartChange },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // Página 404
  { path: '/politica-privacidad', name: 'Politica de privacidad', component: PrivacyPolicy }, // Página 'Terminos y condiciones'
  { path: '/terminos-y-condiciones', name: 'Terminos y condiciones', component: Terms }, // Página 'Terminos y condiciones'

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;