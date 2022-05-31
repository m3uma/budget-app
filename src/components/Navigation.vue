<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'Categories' }">
          <img src="@/assets/icons/categories.png" alt="categories">
          Categories
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Expenses' }">
          <img src="@/assets/icons/expanses.png" alt="expences">
          Expenses
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
  nav {
    display: flex;
    flex-direction: column;
    width:90px;
    margin-top: 210px;
    > ul {
      list-style: none;
      padding: 0;
      > li {
        width: 90px;
        height: 90px;
        border: 1px solid #E8E8E8;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        >  a {
          text-decoration: none;
          color: #64615F;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          img {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  
</style>
