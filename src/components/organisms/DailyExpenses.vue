<template>
  <div>
    <div class="date">{{ date }}</div>
    <Expense
      v-for="expense in expenses"
      :expenseName="expense.title"
      :categoryName="expense.category"
      :price="expense.amount"
      :key="expense.id"
      @click="$emit('handleClick', expense.id)"
    />
  </div>
</template>

<script setup>
import Expense from '@/components/molecules/Expense.vue';
const props = defineProps(['expenses', 'date']);
</script>
<style scoped lang="scss">
div {
  border-top: 1px solid #e8e8e8;
  max-width: 550px;
  width: 100%;
  text-align: left;
  > .date {
    font-weight: 600;
    font-size: 1rem;
    padding: 0.5rem 0;
    color: #969696;
  }
}
</style>
