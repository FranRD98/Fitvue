import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue'; // ✅ Importamos App.vue en lugar de Home.vue
import router from './router'; // ✅ Mantenemos el router

const app = createApp(App); // ✅ Creamos la aplicación con App.vue

app.use(createPinia());
app.use(router);

app.mount('#app'); // ✅ Montamos la aplicación correctamente