import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Home from './views/Home.vue'
import router from './router'

const home = createApp(Home)

home.use(createPinia())
home.use(router)

home.mount('#app')
