<template>
  <Navigation />
  <ExpenseModalVue />
  <Header :title-text="title" @tick="e => msg = e" />
  <article>
    <DateSelectorVue />
    <div class="total">
      <span>Total amount of expenses</span>
      <span>986,00 zł</span>
    </div>
    <div class="filter">
      <select name="" id="">
        <option selected value="all">all categories</option>
        <option :key="category" v-for="category in categories" value="{{ category }}">{{ category }}</option>
      </select>
    </div>
    <div class="expances-wrapper-full">
        <DailyExpances :key="key" v-for="(value, key) in expansesGroupedByDate" :expances="value" :date="key"/>   
    </div>
  </article>
</template>

<script setup>
  import Header from '@/components/molecules/Header.vue';
  import DateSelectorVue from '@/components/atoms/DateSelector.vue';
  import DailyExpances from '../components/organisms/DailyExpances.vue';
  import Navigation from '@/components/Navigation.vue';
  import ExpenseModalVue from '@/components/molecules/ExpenseModal.vue';
  import { storeToRefs } from 'pinia';

  import { useFirestore } from '../stores/useFirestore';
  import { ref } from 'vue';
  import json from '@/data.json';

  const title = ref("Expenses")
  let msg = ref('')
  const data = json;

  const store = useFirestore()
  const { categories, expansesGroupedByDate } = storeToRefs(store);

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
      border-bottom: 2px solid #FF7F0A;
      border-radius: 5px;
      font-weight: 600;
      font-size: 16px;
      line-height: 23px;
      color: #64615F;
      outline: none;
    }
  }
  .total {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 2rem 0.5rem;
    > span{
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
  .expances-wrapper-full {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-column-gap: 20px;
    grid-row-gap:6px;
    justify-items: center;
  }
}
@media (max-width: 1300px) {
  .expances-wrapper-full {
   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
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
