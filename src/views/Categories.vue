<template>
  <article>
    <DateSelectorVue />
    <section>
      <ChartVue :chart-data="chartData" />
      <div class="chart-legend">
        <p>Key:</p>
        <div class="chart-legend-item" v-for="category in categories" :key="category">
          <svg viewBox="0 0 10 10" :fill="category.color">
            <circle cx="50%" cy="50%" r="5" />
          </svg>{{ category.name }}
        </div>
      </div>
    </section>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import DateSelectorVue from '@/components/atoms/DateSelector.vue';
import ChartVue from '@/components/Chart.vue';

const categories = [{
  name: 'Groceries',
  value: 323.25,
  color: '#FF9F40'
}, {
  name: 'Entertainment',
  value: 0.00,
  color: '#FF6384'
}, {
  name: 'Car & Transport',
  value: 173.25,
  color: '#FFCD56'
}, {
  name: 'Education',
  value: 130.29,
  color: '#4BC0C0'
}, {
  name: 'Clothing',
  value: 241.25,
  color: '#F040FF'
}, {
  name: 'Finances',
  value: 101.25,
  color: '#00C514'
}, {
  name: 'Health & Beauty',
  value: 0.00,
  color: '#FF4B40'
}, {
  name: 'Other',
  value: 101.25,
  color: '#FF4B40'
}];

const chartData = ref({
  data: categories
});
</script>

<style scoped>
article {
  flex: 1;
  display: flex;
  flex-direction: column;
}

section {
  display: flex;
  flex-direction: row;
}

p {
  padding-top: 2rem;
  font-size: 1rem;
  font-weight: 600;
}


svg {
  width: 1.5rem;
  padding-right: 10px;
}

.chart-legend {
  text-align: left;
}

.chart-legend-item {
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
}
</style>
