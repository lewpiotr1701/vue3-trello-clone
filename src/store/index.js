import { createStore } from 'vuex'
import defaultBoard from '@/services/default-board.js'
import { saveStatePlugin } from '@/services/helpers.js'
import { v4 as uuidv4 } from 'uuid'

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
    // We passed a fragment of state here (tasks)
    // that's why we don't have to using board.columns....
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuidv4(),
        description: ''
      })
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value
    }
  },
  actions: {

  },
  modules: {

  },
  plugins: [saveStatePlugin]
})