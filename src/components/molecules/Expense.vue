<template>
  <div class="expense-wrapper">
    <div>
      <span>{{ expenseName }}</span>
      <span>{{ categoryName }}</span>
    </div>
    <div>
      <span>{{ price.toFixed(2) }} zł</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['expenseName', 'categoryName', 'price']);
</script>
<style scoped lang="scss">
.expense-wrapper {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  border-top: none;
  font-family: 'Roboto';
  font-style: normal;
  max-width: 350px;
  width: 100%;
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: #64615f;
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0.5rem;
    margin-left: 2em;
    &:first-of-type > span {
      font-weight: 600;
      font-size: 20px;
      line-height: 23px;
      &:last-of-type {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
      }
    }
    &:last-of-type > span {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #dd0e0e;
    }
  }
}
</style>
