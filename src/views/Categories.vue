<template>
  <Header :title-text="title" @tick="e => msg = e" />
  <article>
    <DateSelectorVue />
    <ChartVue />
  </article>
</template>

<script setup>
import DateSelectorVue from '@/components/atoms/DateSelector.vue';
import Header from '../components/Header.vue';
import ChartVue from '@/components/Chart.vue'
import { ref } from 'vue';
const title = ref("Categories")
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
