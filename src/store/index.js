import { createStore } from 'vuex'
import defaultBoard from '@/services/default-board.js'
import { saveStatePlugin } from '@/services/helpers.js'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default createStore({
  state: {
    board
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {

  },
  actions: {

  },
  modules: {

  },
  plugins: [saveStatePlugin]
})