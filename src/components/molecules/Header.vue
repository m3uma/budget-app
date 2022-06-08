<template>
  <header>
    <Title :title-text="titleText" />
  </header>
</template>

<script setup>
import Title from '@/components/atoms/Title.vue';
const props = defineProps(['titleText']);
</script>

<style scoped lang="scss">
header {
  position: absolute;
  margin: 0;
  height: 105px;
  left: 0px;
  right: 0px;
  top: 0px;
  min-height: 6rem;
  background: linear-gradient(90deg, #ff7f0a 0%, #ff9f40 100%);
  padding-left: 2rem;
  max-width: 100%;
  display: flex;
  align-items: center;
}
</style>
