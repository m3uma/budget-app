<template>
  <Header :title-text="title" @tick="e => msg = e" />
  <article>
    <DateSelectorVue />
  </article>

</template>

<script setup>
  import Header from '../components/Header.vue';
  import DateSelectorVue from '@/components/atoms/DateSelector.vue';
  import { ref } from 'vue';
  const title = ref("Expenses")
  let msg = ref('')
</script>

<style scoped>
article {
  margin-top: 105px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
