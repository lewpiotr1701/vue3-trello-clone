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
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value
    },
    MOVE_TASK(state, { fromColumnTasks, fromTaskIndex, toColumnTasks, toTaskIndex }) {
      const taskToMove = fromColumnTasks.splice(fromTaskIndex, 1)[0]
      toColumnTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    }
  },
  actions: {

  },
  modules: {

  },
  plugins: [saveStatePlugin]
})