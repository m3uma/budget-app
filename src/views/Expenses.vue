<template>
  <Navigation />
  <ExpenseModalVue />
  <Header>Expenses</Header>
  <article>
    <DateSelectorVue />
    <div class="total">
      <span>Total amount of expenses</span>
      <span>{{ totalValue.toFixed(2) }} zł</span>
    </div>
    <div class="filter">
      <select @change="handleFilterChange" v-model="selectedFilter">
        <option value="/">all categories</option>
        <option :key="category.name" v-for="category in categories" :value="category.name">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="expenses-wrapper-full">
      <DailyExpenses
        @handle-click="handleClick"
        :key="key"
        v-for="(value, key) in expensesGroupedByDate"
        :expenses="value"
        :date="key"
      />
    </div>
    <EditExpenseModalVue v-if="activeModal" @close-modal="activeModal = false" :expenseId="expenseId" />
  </article>
</template>

<script setup>
import Header from '@/components/molecules/Header.vue';
import DateSelectorVue from '@/components/atoms/DateSelector.vue';
import DailyExpenses from '@/components/organisms/DailyExpenses.vue';
import Navigation from '@/components/Navigation.vue';
import ExpenseModalVue from '@/components/molecules/ExpenseModal.vue';
import { storeToRefs } from 'pinia';
import EditExpenseModalVue from '@/components/molecules/EditExpenseModal.vue';

import { useFirestore } from '@/stores/useFirestore';
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const store = useFirestore();
const { categories, expenses, date } = storeToRefs(store);

const activeModal = ref(false);
const expenseId = ref(null);
const selectedFilter = ref(route.params.category || '/');
const filteredExpenses = computed(() => {
  if (selectedFilter.value === '/') return expenses.value;
  return expenses.value.filter((expense) => expense.category === selectedFilter.value);
});

const totalValue = computed(() =>
  filteredExpenses.value.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
);
const expensesGroupedByDate = computed(() => {
  const uniqueDates = [...new Set(filteredExpenses.value.map(({ date }) => date.get('date')))];
  let key = date.value;
  const res = {};
  uniqueDates.forEach((d) => {
    key = key.set('date', d);
    res[key.format('DD/MM/YYYY')] = filteredExpenses.value.filter(
      (expense) =>
        expense.date.get('date') === d && categories.value.some((category) => category.name === expense.category)
    );
  });
  return res;
});

const handleClick = (id) => {
  activeModal.value = !activeModal.value;
  expenseId.value = id;
};
const handleFilterChange = (e) => {
  router.push({ name: 'Expenses', params: { category: e.target.value } });
};
</script>

<style scoped lang="scss">
article {
  margin-top: 105px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .filter {
    text-align: right;
    select {
      width: 15rem;
      padding: 0.5rem;
      margin: 0 17rem 2rem;
      border: none;
      border-bottom: 2px solid #ff7f0a;
      border-radius: 5px;
      font-weight: 600;
      font-size: 16px;
      line-height: 23px;
      color: #64615f;
      outline: none;
    }
  }
  .total {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 2rem 0.5rem;
    > span {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 36px;
      line-height: 42px;
      text-align: center;
      color: #64615f;
      &:last-of-type {
        font-weight: 500;
        font-size: 40px;
        line-height: 47px;
        color: #dd0e0e;
      }
    }
  }
  .expenses-wrapper-full {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-column-gap: 20px;
    grid-row-gap: 6px;
    justify-items: center;
    padding: 0 20px;
  }
  @media (max-width: 1300px) {
    .expenses-wrapper-full {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
}
@media (max-width: 992px) {
  article .filter {
    text-align: center;
    select {
      margin: 1rem 0;
    }
  }
}
@media (max-width: 576px) {
  article .total > span {
    font-size: 25px;
  }
}
</style>
