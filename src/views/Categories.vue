<template>
  <Navigation />
  <AddButtonVue />
  <Header :title-text="title" @tick="e => msg = e" />
  <article>
    <DateSelectorVue />
    <ChartVue />
  </article>
</template>

<script setup>
import DateSelectorVue from '@/components/atoms/DateSelector.vue';
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

handleAddExpense()
</script>

<style scoped>
article {
  margin-top: 105px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
