<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input type="text" class="p-2 w-full mr-2 block text-xl font-bold" :value="task.name"
        @change="updateTaskProperty($event, 'name')" @keyup.enter="updateTaskProperty($event, 'name')">
      <textarea :value="task.description"
        class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
        @change="updateTaskProperty($event, 'description')" @keyup.enter="updateTaskProperty($event, 'description')">
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTask']),
    task() {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty(event, propertyName) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key: propertyName,
        value: event.target.value
      })
    }
  }
}
</script>

<style scoped>
.task-view {
  @apply relative flex flex-row bg-white inset-0 mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>