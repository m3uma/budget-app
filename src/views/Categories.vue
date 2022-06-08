<template>
  <Navigation />
  <ExpenseModalVue />
  <Header>Categories</Header>
  <article>
    <DateSelectorVue />
    <section>
      <ChartVue :chart-data="chartData" :key="chartData" />
      <div class="chart-legend">
        <p>Key:</p>
        <div class="chart-legend-item" v-for="category in categories" :key="category.name">
          <svg viewBox="0 0 10 10" :fill="category.color">
            <circle cx="50%" cy="50%" r="5" />
          </svg>
          {{ category.name }}
        </div>
      </div>
    </section>
    <p>Spending summary:</p>
    <section>
      <div class="summary">
        <div v-for="category in categories" :key="category">
          <svg viewBox="0 0 10 10" :fill="category.color">
            <circle cx="50%" cy="50%" r="5" /></svg
          >{{ category.name }}
          <span>{{ getSumOfExpensesInCategory(category.name) }} zł</span>
        </div>
      </div>
      <CategoryModalVue />
    </section>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue';
import DateSelectorVue from '@/components/atoms/DateSelector.vue';
import CategoryModalVue from '@/components/molecules/CategoryModal.vue';
import Navigation from '@/components/Navigation.vue';
import AddButtonVue from '@/components/atoms/AddButton.vue';
import Header from '@/components/molecules/Header.vue';
import ChartVue from '@/components/Chart.vue';
import { useFirestore } from '@/stores/useFirestore';
import { addUserCategory, deleteUserCategory } from '@/composable/firesbase';
import ExpenseModalVue from '@/components/molecules/ExpenseModal.vue';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';

const error = ref(null);
const category = ref(null);
const isLoading = ref(false);

const store = useFirestore();
const { categories, expensesGroupedByCategory } = storeToRefs(store);
const getSumOfExpensesInCategory = (categoryName) => {
  return expensesGroupedByCategory.value[categoryName].reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0);
};

const handleSubmit = async () => {
  error.value = null;
  isLoading.value = true;
  try {
    await addUserCategory({ name: category.value, color: '#121212' });
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async () => {
  error.value = null;
  isLoading.value = true;
  try {
    await deleteUserCategory(category.value);
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const chartData = computed(() => ({
  data: categories.value.map(({ name, color }) => {
    return { name, color, value: getSumOfExpensesInCategory(name) };
  }),
}));
</script>

<style scoped>
article {
  margin-top: 105px;
  flex: 1;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
}

section {
  display: flex;
  flex-direction: row;
}

p {
  align-self: start;
  padding-top: 2rem;
  font-size: 1rem;
  font-weight: 600;
}

svg {
  width: 1.5rem;
  padding-right: 10px;
}

span {
  color: red;
}

.chart-legend {
  text-align: left;
}

.chart-legend-item {
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
}

.summary {
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0rem 2rem;
}
</style>
