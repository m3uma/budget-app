<template>
  <nav>
    <router-link :to="{ name: 'Categories' }">
      <img src="@/assets/icons/categories.png" alt="categories">
      Categories
    </router-link>
    <router-link :to="{ name: 'Expenses' }">
      <img src="@/assets/icons/expanses.png" alt="expences">
      Expenses
    </router-link>
  </nav>
</template>

<script setup>

</script>

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: column;

  padding-top: 14rem;
  border-right: solid 1px #ccc;
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
    background: #E8E8E8;
  }
}

img {
  width: 3rem;
  margin-bottom: 1rem;
}
</style>
