<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style lang="scss">

body,
html,
#app {
  margin: 0;
  min-height: 100vh;
  max-width: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.wrapper {
  display: flex;
  flex-direction: row;
  flex: 1;
}
</style>
