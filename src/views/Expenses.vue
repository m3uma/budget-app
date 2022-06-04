<template>
  <Header :title-text="title" @tick="e => msg = e" />
  <article>
    <DateSelectorVue />
    <div class="total">
        <span>Total amount of expenses</span>
        <span>986,00 zł</span>
    </div>
    <div style="display: flex; justify-content:space-around">
      <div>
        <DailyExpances v-for="expance in data" :expanceName="expance.expence_name" :categoryName="expance.category_name" :price="expance.value + ' zł'" @expanceTick="e => msg = e" :date="expance.date" @dateTick="e => msg = e"/>
      </div>
      <div>
        <DailyExpances v-for="expance in data" :expanceName="expance.expence_name" :categoryName="expance.category_name" :price="expance.value + ' zł'" @expanceTick="e => msg = e" :date="expance.date" @dateTick="e => msg = e"/>
      </div>
      <div>
        <DailyExpances v-for="expance in data" :expanceName="expance.expence_name" :categoryName="expance.category_name" :price="expance.value + ' zł'" @expanceTick="e => msg = e" :date="expance.date" @dateTick="e => msg = e"/>
      </div>
    </div>
  </article>

</template>

<script setup>
  import Header from '@/components/molecules/Header.vue';
  import DateSelectorVue from '@/components/atoms/DateSelector.vue';
  import DailyExpances from '../components/organisms/DailyExpances.vue';
  import { ref } from 'vue';
  import json from '@/data.json';
  const title = ref("Expenses")
  let msg = ref('')
  const data = json;

</script>

<style scoped lang="scss">
article {
  margin-top: 105px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .total {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    > span{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 36px;
      line-height: 42px;
      text-align: center;
      color: #64615F;
      &:last-of-type {
        font-weight: 500;
        font-size: 40px;
        line-height: 47px;
        color: #DD0E0E;
      }
    }
  }
}
</style>
