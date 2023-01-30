<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div class="column" v-for="(column, columnKey) in board.columns" :key="columnKey">

        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">

          <div class="task" v-for="(task, taskKey) in column.tasks" :key="taskKey" @click="goToTask(task)">
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