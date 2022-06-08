<template>
  <header>
    <h1><slot></slot></h1>
  </header>
</template>

<script setup></script>

<style scoped lang="scss">
header {
  position: absolute;
  margin: 0;
  height: 105px;
  left: 0px;
  right: 0px;
  top: 0px;
  min-height: 6rem;
  background: linear-gradient(90deg, #ff7f0a 0%, #ff9f40 100%);
  padding-left: 2rem;
  max-width: 100%;
  display: flex;
  align-items: center;
}
h1 {
  color: #ffffff;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  margin: 0px;
  text-align: left;
}
</style>
