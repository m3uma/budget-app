<template>
  <TitleVue :title-text="title" @tick="e => msg = e"></TitleVue>
</template>

<script setup>
  import TitleVue from '@/components/atoms/Title.vue';
  import { ref } from 'vue';
  const title = ref("Expenses")
  let msg = ref('')
</script>

<style scoped>

</style>
