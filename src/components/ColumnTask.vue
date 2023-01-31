<template>
  <div class="task" draggable="true" @dragover.prevent @dragenter.prevent @click="goToTask(task)"
    @dragstart="pickUpTask($event, taskIndex, columnIndex)"
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)">

    <span class="w-full flex-no-shrink font-bold">
      {{ task.name }}
    </span>

    <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
      {{ task.description }}
    </p>

  </div>
</template>

<script>
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
    task: {
      type: Object,
      requred: true
    },
    taskIndex: {
      type: Number,
      requred: true
    },
    columnIndex: {
      type: Number,
      requred: true
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickUpTask(event, fromTaskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-task-index', fromTaskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    },
    moveTaskOrColumn(event, toColumnTasks, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData('type')

      if (type === 'task') {
        this.moveTask(event, toColumnTasks, toTaskIndex !== undefined ? toTaskIndex : toColumnTasks.length)
      } else {
        this.moveColumn(event, toColumnIndex)
      }
    },
    moveTask(event, toColumnTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')

      const fromColumnTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('MOVE_TASK', {
        fromColumnTasks,
        fromTaskIndex,
        toColumnTasks,
        toTaskIndex
      })
    },
    moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')

      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    },
  }
}
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline;
}
</style>>