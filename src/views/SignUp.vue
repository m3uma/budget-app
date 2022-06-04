<template>
  <h1>Sign up view</h1>
  <form @submit.prevent="handleSubmit">
    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required />

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required />

    <label for="confirm-password">Confirm password:</label>
    <input type="password" name="confirm-password" v-model="confirmPassword" required />

    <button>Sign up</button>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script setup>
import { signUp } from '@/composable/firesbase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const isLoading = ref(false);
const error = ref(null);

const handleSubmit = async () => {
  if (password.value.length < 6) {
    error.value = 'password must be at least 6 characters long';
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'password and confirmation password must be the same';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    await signUp({ email: email.value, password: password.value });
    router.push('/');
  } catch (e) {
    error.value = e.message;
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
