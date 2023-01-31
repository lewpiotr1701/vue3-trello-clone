<template>
  <div class="column" draggable="true" @dragover.prevent @dragenter.prevent
    @dragstart.self="pickUpColumn($event, columnIndex)" @drop="moveTaskOrColumn($event, column.tasks, columnIndex)">

    <div class="flex items-center mb-2 font-bold">
      {{ column.name }}
    </div>
    <div class="list-reset">

      <ColumnTask v-for="(task, $taskIndex) in column.tasks" :key="$taskIndex" :board="board" :column="column"
        :task=task :taskIndex="$taskIndex" :columnIndex="columnIndex" />

      <input type="text" class="block p-2 w-full bg-transparent" placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.tasks)">

    </div>

  </div>
</template>

<script>
import ColumnTask from '@/components/ColumnTask.vue'

export default {
  components: { ColumnTask },
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
    pickUpColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
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
    createTask(event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value
      })
      event.target.value = ''
    },
  }
}
</script>

<style scoped>
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>