<template>
  <div draggable="true" @dragstart.self="onDrag" @dragover.prevent @dragenter.prevent>

  </div>
  <slot />
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
      event.dataTransfer.setData('payload', JSON.stringify(this.transferData))
    }
  }
}
</script>

<style scoped>

</style>