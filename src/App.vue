<template>
  <Header />
  <div class="wrapper">
    <Navigation />
    <router-view />
    <AddButtonVue />
  </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
import Header from '@/components/Header.vue';
import AddButtonVue from '@/components/atoms/AddButton.vue';
</script>

<style>
body,
html,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  max-width: 100vw;
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
