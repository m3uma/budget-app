<template>
  <nav>
    <ul>
      <li><router-link :to="{ name: 'Categories' }">Categories</router-link></li>
      <li><router-link :to="{ name: 'Expenses' }">Expenses</router-link></li>
      <li><button @click="handleClick">Logout</button></li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { logout } from '@/composable/firesbase';

const router = useRouter();
const handleClick = async () => {
  await logout();
  router.push('/login');
};
</script>

<style></style>
