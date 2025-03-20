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

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/plans', name: 'Plans', component: Plans },
  { path: '/cases', name: 'Cases', component: SuccessStories },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/login', name: 'Login', component: Login },
  { path: '/startChange', name: 'Start Change', component: StartChange },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // Página 404
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;