import { createRouter, createWebHistory } from 'vue-router'
import Survey from '../views/Survey.vue'

const router = createRouter({
  mode: 'hash', // 设置为哈希模式
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/survey',
      name: 'survey',
      component: Survey
    }
  ]
})

export default router
