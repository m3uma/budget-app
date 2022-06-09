<script setup>
import { ref } from 'vue';
import addImg from '@/assets/icons/add.png?url';
import closeImg from '@/assets/icons/close.png?url';
import { addExpense } from '@/composable/firesbase';
import { useFirestore } from '@/stores/useFirestore';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
const store = useFirestore();
const { categories } = storeToRefs(store);
const open = ref(false);
const today = dayjs().format('YYYY-MM-DD');
const title = ref('');
const date = ref(today);
const amount = ref('');
const category = ref('other');
const description = ref('');

const handleAddExpense = async () => {
  const dateObj = dayjs(date.value);
  await addExpense({
    title: title.value,
    date: dateObj,
    amount: +amount.value,
    category: category.value,
    description: description.value,
  });
  store.getExpensesFromDB(dateObj);
  open.value = false;
};
</script>

<template>
  <button
    @click="open = !open"
    class="add-expense"
    :style="{ 'background-image': open ? `url(${closeImg})` : `url(${addImg})` }"
  ></button>

  <Teleport to="body">
    <form v-if="open" class="modal" @submit.prevent="handleAddExpense">
      <p class="header">Add Expense</p>
      <div class="content">
        <label for="title">Title</label>
        <input placeholder="(up to 25 characters)" maxlength="25" v-model="title" id="title" required />
        <div class="form-item">
          <label for="date">Date</label>
          <input type="date" v-model="date" :max="today" id="date" />
        </div>
        <div class="form-item">
          <label for="price">Price</label>
          <input type="number" min="1" step="any" v-model="amount" id="price" required />
        </div>
        <div class="form-item">
          <label for="category">Category</label>
          <select v-model="category" id="category">
            <option v-for="category in categories" :key="category.name" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>
        <label for="desc">Description (optional)</label>
        <input placeholder="(up to 300 characters)" maxlength="300" v-model="description" id="desc" />
        <div class="buttons">
          <button class="back" type="button" @click="open = false">Close</button>
          <button class="confirm" type="submit">Add</button>
        </div>
      </div>
    </form>
  </Teleport>
</template>

<style scoped>
button {
  cursor: pointer;
}

.header {
  padding: 0.5rem;
  background-color: #ff7f0a;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #fbfbfb;
}

.form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 15rem;
  gap: 5rem;
}

input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  height: 2rem;
  width: 100%;
  padding: 0;
  margin: 0 0 1rem 0;
}

label {
  font-size: 1rem;
  padding: 1.3em 0;
  font-weight: 600;
}

.modal {
  overflow: hidden;
  background-color: #fbfbfb;
  border-radius: 10px;
  border: 1px solid #cccccc;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  min-width: 20rem;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.add-expense {
  position: absolute;
  right: 50px;
  bottom: 50px;
  width: 4rem;
  height: 4rem;
  background: #ff7f0a;
  border-radius: 4px;
  border: none;
  background-position: center;
  background-repeat: no-repeat;
}

.back {
  border: none;
  font-size: 1rem;
  color: #fbfbfb;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #ff7f0a;
}

.confirm {
  font-size: 1rem;
  background-color: #fbfbfb;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #ff7f0a;
  border: 1px solid #ff7f0a;
}

.content {
  padding: 0rem 1rem 2rem 1rem;
}
</style>
