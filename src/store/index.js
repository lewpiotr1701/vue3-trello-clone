import { createStore } from 'vuex'
import defaultBoard from '@/services/default-board.js'
import { saveStatePlugin } from '@/services/helpers.js'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default createStore({
  state: {
    board
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {

  },
  plugins: [saveStatePlugin]
})