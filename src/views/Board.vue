<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn v-for="(column, $columnIndex) in board.columns" :key="$columnIndex" :board="board" :column="column"
        :columnIndex="$columnIndex" />

      <div class="column flex">
        <input type="text" v-model="newColumName" placeholder="+ New Column Name" class="p-2 mr-2 flex-grow"
          @keyup.enter="createColumn">
      </div>
    </div>

    <div v-if="isTaskOpen" class="task-bg" @click.self="closeModal">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn.vue'

export default {
  components: { BoardColumn },
  data() {
    return {
      newColumName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    }
  },
  methods: {
    closeModal() {
      this.$router.push({ name: 'board' })
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumName
      })

      this.newColumName = ''
    },
  }
}
</script>

<style scoped>
.board {
  @apply p-4 bg-teal-500 h-full overflow-auto;
}

.task-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>