<template>
  <nav>
    <router-link :to="{ name: 'Categories' }">
      <img src="@/assets/icons/categories.png" alt="categories" />
      Categories
    </router-link>
    <router-link :to="{ name: 'Expenses' }">
      <img src="@/assets/icons/expanses.png" alt="expences" />
      Expenses
    </router-link>
    <button @click="handleClick">Sign out</button>
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

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: column;

  padding-top: 14rem;
  border-right: solid 1px #ccc;
  button {
    margin-top: auto;
    background: rgba(217, 217, 217, 0.15);
    border: none;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    padding: 1rem;
    color: #ff7b02;
  }
}

a {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;

  font-size: 1rem;
  font-weight: 700;
  color: #2b2b2b;
  text-decoration: none;
  &.router-link-active {
    background: #e8e8e8;
  }
}

img {
  width: 2.5rem;
  margin-bottom: 1rem;
}
@media (max-width: 576px) {
  nav {
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    bottom: 0px;
    border: none;
    border-top: solid 1px #ccc;
    height: 55px;
    width: 100%;
    padding: 0 0 1rem;
    background: #ffffff;
    button {
      position: fixed;
      bottom: 72px;
      width: 100%;
      background: rgb(243, 243, 243);
    }
  }
  a {
    padding: 0.5rem;
    &.router-link-active {
      background: none;
    }
  }
  img {
    width: 1.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
