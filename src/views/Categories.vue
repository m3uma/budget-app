<template>
  <h1>Categories view</h1>
</template>

<script setup>
import { useFirestore } from '@/stores/useFirestore';
import { addUserCategory, deleteUserCategory } from '@/composable/firesbase';
import { ref } from '@vue/reactivity';

const error = ref(null);
const category = ref(null);
const isLoading = ref(false);

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
</script>

<style scoped></style>
