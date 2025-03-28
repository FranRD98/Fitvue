import { createRouter, createWebHistory } from 'vue-router';

// Importamos las vistas
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Plans from '@/views/Plans.vue';
import SuccessStories from '@/views/SuccessStories.vue';
import Contact from '@/views/Contact.vue';
import Login from '@/views/Login.vue';
import StartChange from '@/views/StartChange.vue';
import NotFound from '@/views/NotFound.vue';
import Routine from '@/views/Routine-list.vue';
import Nutrition from '@/views/Nutrition-list.vue';
import FAQ from '@/views/FAQ.vue';

import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import Terms from '@/views/Terms.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/nosotros', name: 'About', component: About },
  { path: '/rutinas/entrenamiento', name: 'Rutinas Entrenamiento', component: Routine },
  { path: '/rutinas/mindfulness', name: 'Rutinas Mindfulness', component: Routine },
  { path: '/rutinas/estiramientos', name: 'Rutinas Estiramientos', component: Routine },
  { path: '/rutinas/yoga', name: 'Rutinas Yoga', component: Routine },
  { path: '/nutricion/dietas', name: 'Nutrición Dietas', component: Nutrition },
  { path: '/nutricion/suplementacion', name: 'Nutrición Suplementación', component: Nutrition },
  { path: '/nutricion/recetas', name: 'Nutrición Recetas', component: Nutrition },
  { path: '/planes', name: 'Plans', component: Plans },
  { path: '/casos-de-exito', name: 'Cases', component: SuccessStories },
  { path: '/contacto', name: 'Contact', component: Contact },
  { path: '/FAQ', name: 'Preguntas Frecuentes', component: FAQ },
  { path: '/login', name: 'Login', component: Login },
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