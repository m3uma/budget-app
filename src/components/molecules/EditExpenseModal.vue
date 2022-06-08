<script setup>
import { ref } from 'vue';
import editImg from '@/assets/icons/edit.png?url';

const editMode = ref(false);
const emit = defineEmits(['close-modal']);
</script>

<template>
  <Teleport to="body">
    <div class="modal">
      <p class="header">{{ editMode ? 'Edit Expense' : 'Expense' }}</p>
      <div class="content">
        <div class="form-item">
          <p>Title</p>
          <img v-bind:src="editImg" @click="editMode = !editMode" />
        </div>
        <input placeholder="(up to 25 characters)" maxlength="25" />
        <div class="form-item">
          <p>Date</p>
          <input type="date" />
        </div>
        <div class="form-item">
          <p>Price</p>
          <input type="number" min="1" step="any" />
        </div>
        <div class="form-item">
          <p>Category</p>
          <select>
            <option>groceries</option>
            <option>placeholder</option>
          </select>
        </div>
        <p>Description (optional)</p>
        <input placeholder="(up to 300 characters)" maxlength="300" />
        <div class="buttons">
          <button class="back" @click="emit('close-modal')">Close</button>
          <button class="confirm" v-if="editMode">Confirm</button>
          <button class="confirm" v-if="!editMode">Remove expense</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
img {
  width: 1.5rem;
}

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

p {
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
  padding: 0rem 1rem 2rem 1rem;
}
</style>
