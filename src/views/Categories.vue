<template>
  <Navigation />
  <AddButtonVue />
  <Header :title-text="title" @tick="e => msg = e" />
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
    <p>Spending summary:</p>
    <section>
      <div class="summary">
        <div v-for="category in categories" :key="category">
          <svg viewBox="0 0 10 10" :fill="category.color">
            <circle cx="50%" cy="50%" r="5" />
          </svg>{{ category.name }}
          <span>{{ category.value }} zł</span>
        </div>
      </div>
      <CategoryModalVue />
    </section>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import DateSelectorVue from '@/components/atoms/DateSelector.vue';
import ChartVue from '@/components/Chart.vue';
import CategoryModalVue from '@/components/molecules/CategoryModal.vue';
import Navigation from '@/components/Navigation.vue';
import AddButtonVue from '@/components/atoms/AddButton.vue';
import Header from '@/components/molecules/Header.vue';
import ChartVue from '@/components/Chart.vue';
import { useFirestore } from '@/stores/useFirestore';
import { addUserCategory, deleteUserCategory, addExpense } from '@/composable/firesbase';
import { ref } from '@vue/reactivity';
import dayjs from 'dayjs';

const error = ref(null);
const category = ref(null);
const isLoading = ref(false);
const title = ref('Categories');
let msg = ref('');

const store = useFirestore();

const handleSubmit = async () => {
  error.value = null;
  if (store.categories.includes(category.value)) {
    error.value = `${category.value} category already exist`;
    return;
  }
  isLoading.value = true;
  try {
    await addUserCategory(category.value);
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
const handleAddExpense = async () => {
  const date = dayjs().set('month', 5).set('date', 13); //0 January, 11 December
  await addExpense({
    title: 'Sth',
    date,
    amount: '124.35',
    category: 'category',
    description: 'description text',
  });
  store.getExpanses(date);
};

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
