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
  { 
    path: '/design',
    name: 'DesignDetails',
    component: () => import('./components/DesignDetails.vue'), 
    props: true,
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./components/NotFound.vue'), 
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
}) 

createApp(App)
  .use(router)
  .mount('#app')
