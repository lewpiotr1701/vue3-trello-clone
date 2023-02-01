import { createRouter, createWebHistory } from 'vue-router'
import Board from '@/views/Board.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'board',
      component: Board,
      children: [
        {
          path: 'task/:id',
          name: 'task',
          component: () => import('@/views/Task.vue')
        }
      ]
    },
  ]
})

export default router
