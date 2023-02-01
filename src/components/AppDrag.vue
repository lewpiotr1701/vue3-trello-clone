<template>
  <div draggable="true" @dragstart.self="onDrag" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    transferData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDrag(event) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('payload', JSON.stringify(this.transferData))
    }
  }
}
</script>

<style scoped>

</style>