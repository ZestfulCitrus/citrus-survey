import { createRouter, createWebHistory } from 'vue-router'
import Survey from '../views/Survey.vue'
import AdminPanel from '../views/AdminPanel.vue'
import HomePage from '@/views/admin/HomePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/survey',
      name: 'survey',
      component: Survey
    },
    {
      path: '/admin-panel',
      name: 'AdminPanel',
      redirect: '/admin-panel/home',
      component: AdminPanel,
      children: [
        {
          path: '/admin-panel//home',
          name: 'HomePage',
          component: HomePage,
        }
      ]
    }
  ]
})

export default router
