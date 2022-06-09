<template>
  <Navigation />
  <ExpenseModalVue />
  <Header>Categories</Header>
  <article>
    <DateSelectorVue />
    <section>
      <ChartVue :chart-data="chartData" :key="chartData" class="chart" />
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
    <section class="categories">
      <div class="summary">
        <div v-for="category in categories" :key="category" class="summary__item">
          <button @click="handleDelete(category)">del</button>
          <svg viewBox="0 0 10 10" :fill="category.color">
            <circle cx="50%" cy="50%" r="5" /></svg
          >{{ category.name }}
          <span>{{ getSumOfExpensesInCategory(category.name).toFixed(2) }} zł</span>
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
import { deleteCategory } from '@/composable/firesbase';
import ExpenseModalVue from '@/components/molecules/ExpenseModal.vue';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';

const error = ref(null);
const isLoading = ref(false);

const store = useFirestore();
const { categories, expensesGroupedByCategory } = storeToRefs(store);
const getSumOfExpensesInCategory = (categoryName) => {
  return expensesGroupedByCategory.value[categoryName].reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0);
};

const handleDelete = async (category) => {
  error.value = null;
  isLoading.value = true;
  try {
    await deleteCategory(category);
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

<style scoped lang="scss ">
article {
  margin-top: 105px;
  flex: 1;
  padding: 0 2rem 2rem;
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
}

span {
  color: #dd0e0e;
  margin-left: auto;
}

.chart-legend {
  margin-left: 2rem;
  text-align: left;
}

.chart-legend-item {
  margin-bottom: 0.5rem;
  display: flex;
  gap: 1em;
  align-items: center;

}

.summary {
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .5rem 2rem;
}

.summary__item{
  display: flex;
  align-items: center;
  gap: 1em;

}
button{
  padding: .2em .8em;
  color: #ff7f0a;
  border: 2px solid #ff7f0a;
  font-weight: bold;
  border-radius: .2em;
  background: transparent;
  cursor: pointer;
}
button:hover{
  color: white;
  background: #ff7f0a;
}
.chart {
  width: auto;
  padding: 0;
  margin: 0;
}

@media (max-width: 1024px) {
  .chart {
    width: 350px;
  }
}
@media (max-width: 780px) {
  .summary {
    gap: 0.5rem 0.5rem;
    margin-bottom: 55px;
  }
  .summary__item{
    gap: 0.5rem;
  }
  .chart {
    width: 250px;
  }
  .categories {
    flex-direction:column
  }
}
@media (max-width: 500px) {
  .summary {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .chart-legend {
    width: 100%;
    margin-left: 0.5rem;
    text-align: left;
    font-size: 14px;
  }
  svg {
    width: 0.5rem;
  }
  .chart-legend-item {
    gap: 0.5rem;
  }
  .chart {
    width: 200px;
  }
}
</style>
