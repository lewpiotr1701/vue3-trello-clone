import { createRouter, createWebHistory } from 'vue-router'
import Board from '@/views/Board.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'board',
      component: Board
    },
  ]
})

export default router
