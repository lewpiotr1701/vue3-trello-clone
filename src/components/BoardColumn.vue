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
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin.js'

export default {
  components: { ColumnTask },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    pickUpColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
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