export default {
  props: {
    board: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn(transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveTask({ fromColumnIndex, fromTaskIndex }) {
      const fromColumnTasks = this.board.columns[fromColumnIndex].tasks

      const toTaskIndex = this.taskIndex !== undefined ? this.taskIndex : this.column.tasks.length

      this.$store.commit('MOVE_TASK', {
        fromColumnTasks,
        fromTaskIndex,
        toColumnTasks: this.column.tasks,
        toTaskIndex: toTaskIndex
      })
    },
    moveColumn({ fromColumnIndex }) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    },
  }
}