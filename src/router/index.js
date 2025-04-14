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

import GuideList from '@/views/guides/Guide-list.vue';
import GuidesByCategory from '@/views/guides/GuidesByCategory.vue'
import GuideDetail from '@/views/guides/GuideDetail.vue';

import PrivacyPolicy from '@/views/legal/PrivacyPolicy.vue';
import Terms from '@/views/legal/Terms.vue';

import Dashboard from '@/views/dashboard/Dashboard.vue';
import NewReview from '@/components/dashboard/NewReview.vue';
import ReviewDetail from '@/components/dashboard/ReviewDetail.vue'

import Register from '@/views/auth/Register.vue';


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/nosotros', name: 'About', component: About },
  { path: '/rutinas', name: 'Rutinas', component: Routines },
  { path: '/rutinas/entrenamiento', name: 'Rutinas Entrenamiento', component: Routines },
  { path: '/rutinas/mindfulness', name: 'Rutinas Mindfulness', component: Routines },
  { path: '/rutinas/estiramientos', name: 'Rutinas Estiramientos', component: Routines },
  { path: '/rutinas/yoga', name: 'Rutinas Yoga', component: Routines },

  // Guías
  { path: '/guias', name: 'Guia listado', component: GuideList },
  { path: '/guias/:category', name: 'Guia por categoria', component: GuidesByCategory },
  { path: '/guias/:category/:id', name: 'Guia detalle', component: GuideDetail },

  { path: '/contacto', name: 'Contact', component: Contact },
  { path: '/FAQ', name: 'Preguntas Frecuentes', component: FAQ },
  { path: '/login', name: 'Login', component: Login },
  { path: '/registrarse', name: 'Register', component: Register },
  
  // Dashboard
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard/newReview', name: 'New Review', component: NewReview },
  { path: '/user/:uid/:date', name: 'Review Detail', component: ReviewDetail },

  
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