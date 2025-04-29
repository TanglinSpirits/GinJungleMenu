import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import landingPage from '@/components/landingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
    },
  ],
})

export default router
