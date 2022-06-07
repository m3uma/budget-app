<script setup>
import { ref } from 'vue';
import addImg from '@/assets/icons/add.png?url';
import closeImg from '@/assets/icons/close.png?url';

const open = ref(false);
console.log(addImg);
</script>

<template>
  <button
    @click="open = true"
    class="add-expense"
    :style="{ 'background-image': open ? `url(${closeImg})` : `url(${addImg})` }"
  ></button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p class="header">Add Expense</p>
      <div class="content">
        <p>Title</p>
        <input placeholder="Type (up to 25 characters)" />
        <div class="buttons">
          <button class="back" @click="open = false">Close</button>
          <button class="confirm">Add</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.header {
  padding: 0.5rem;
  background-color: #ff7f0a;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #fbfbfb;
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
p {
  padding: 0;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
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
  padding: 2rem 1rem;
}
</style>
