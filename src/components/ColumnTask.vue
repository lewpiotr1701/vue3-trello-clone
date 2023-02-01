<template>
  <AppDrop @drop.self="moveTaskOrColumn">
    <AppDrag class="task" @click="goToTask(task)"
      :transferData="{ type: 'task', fromColumnIndex: columnIndex, fromTaskIndex: taskIndex }">

      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>

      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>

    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from '@/components/AppDrag.vue'
import AppDrop from '@/components/AppDrop.vue'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin.js'

export default {
  components: { AppDrag, AppDrop },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      requred: true
    },
    taskIndex: {
      type: Number,
      requred: true
    },
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
  }
}
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline;
}
</style>>