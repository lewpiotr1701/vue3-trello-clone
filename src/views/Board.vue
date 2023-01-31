<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div class="column" v-for="(column, $columnIndex) in board.columns" :key="$columnIndex" draggable="true"
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)" @dragover.prevent @dragenter.prevent
        @dragstart.self="pickUpColumn($event, $columnIndex)">

        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">

          <div class="task" v-for="(task, $taskIndex) in column.tasks" :key="$taskIndex" draggable="true"
            @dragover.prevent @dragenter.prevent @dragstart="pickUpTask($event, $taskIndex, $columnIndex)"
            @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)" @click="goToTask(task)">
            <span class="w-full flex-no-shrink font-bold">
              {{ task.name }}
            </span>
            <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
              {{ task.description }}
            </p>
          </div>

          <input type="text" class="block p-2 w-full bg-transparent" placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)">
        </div>

      </div>
    </div>

    <div v-if="isTaskOpen" class="task-bg" @click.self="closeModal">
      <router-view></router-view>
    </div>

    {{ dupa }}

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    },
    dupa() {
      return JSON.parse(localStorage.getItem('board'))
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    closeModal() {
      this.$router.push({ name: 'board' })
    },
    createTask(event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value
      })
      event.target.value = ''
    },
    pickUpTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    },
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
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline;
}

.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-500 h-full overflow-auto;
}

.task-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>