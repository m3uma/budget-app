<template>
  <h1>Login view</h1>
  <form @submit.prevent="handleSubmit">
    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required />

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required />

    <button>Login</button>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script setup>
import { login } from '@/composable/firesbase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

const isLoading = ref(false);
const error = ref(null);

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await login({ email: email.value, password: password.value });
    router.push('/');
  } catch (e) {
    error.value = e.message;
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
