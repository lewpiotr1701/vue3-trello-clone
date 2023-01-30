export function saveStatePlugin(store) {
  store.subscribe((mutation, state) => {
    // called after every mutation.
    localStorage.setItem('board', JSON.stringify(state.board))
  })
}