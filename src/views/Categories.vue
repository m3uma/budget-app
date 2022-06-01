<template>
  <article>
    <DateSelectorVue />
    <ChartVue />
  </article>
</template>

<script setup>
import DateSelectorVue from '@/components/atoms/DateSelector.vue';
import ChartVue from '@/components/Chart.vue'
</script>

<style scoped>
article {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
