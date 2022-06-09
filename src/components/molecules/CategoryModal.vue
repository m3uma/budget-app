<script setup>
import { ref } from 'vue';
import { addCategory } from '@/composable/firesbase';

const open = ref(false);

const name = ref('');
const color = ref('#ff85e4');

const handleSubmit = async () => {
  try {
    await addCategory({ name: name.value, color: color.value });
    open.value = false;
    name.value = '';
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <button @click="open = true">
    <img src="@/assets/icons/addCategory.svg" />
    Add category
  </button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Add Category</p>
      <form @submit.prevent="handleSubmit" class="content">
        <input placeholder="Category Name" v-model="name" required />
        <input type="color" class="colorpicker" v-model="color" />
        <div class="buttons">
          <button type="button" class="close" @click="open = false">Close</button>
          <button type="submit" class="add">Add</button>
        </div>
      </form>
    </div>
  </Teleport>
</template>

<style scoped>

img {
  width: 2rem;
}

button {
  display: flex;
  align-self: start;
  align-items: center;
  font-size: 1rem;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  margin-left: 1rem;
}

p {
  padding: 0.5rem;
  background-color: #ff7f0a;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #fbfbfb;
}

div {
  display: block;
}

button:focus {
  outline: none;
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

.add {
  font-size: 1rem;
  color: #fbfbfb;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #ff7f0a;
}

.close {
  font-size: 1rem;
  background-color: #fbfbfb;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #ff7f0a;
  border: 1px solid #ff7f0a;
}

.content {
  padding: 2rem 1rem;
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

@media (max-width: 780px) {
  button {
    margin-left: 0rem;
    margin-top: 0.5rem;
  }
}
</style>
