<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <RouterView />
</template>

<script>

</script>

<style scoped>
nav {
  text-align: center;
}
</style>
