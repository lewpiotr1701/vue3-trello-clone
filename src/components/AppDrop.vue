<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
export default {
  methods: {
    onDrop(event) {
      const transferData = JSON.parse(event.dataTransfer.getData('payload'))
      this.$emit('drop', transferData)
    }
  }
}
</script>

<style scoped>

</style>