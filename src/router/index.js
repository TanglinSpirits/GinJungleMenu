import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import HomeView from '@/views/Home.vue'
import MarriotView from '@/views/Marriot.vue'
import QuizView from '@/views/Quiz.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Tanglin Menu'
      }
    },
    {
      path: '/marriot',
      name: 'marriot',
      component: MarriotView,
      meta: {
        title: 'Marriot At The Crossroads'
      }
    },
    {
      path: '/marriot/start',
      name: 'quiz',
      component: QuizView,
      meta: {
        title: 'Quiz'
      }
    },
  ],
})

// This global navigation guard runs before each route change.
router.beforeEach((to, from, next) => {
  // 'to' is the route the user is navigating to.
  // We check if it has a title defined in its meta field.
  
  const defaultTitle = 'Tanglin Gin'; // A fallback title

  // Set the document title. Use the route's title if it exists, otherwise use the default.
  document.title = to.meta.title || defaultTitle;
  
  // 'next()' must be called to resolve the hook and continue with the navigation.
  next();
});

export default router
