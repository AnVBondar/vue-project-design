import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomePage from './components/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
}) 

createApp(App)
  .use(router)
  .mount('#app')
