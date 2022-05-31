<template>
    <h1>{{ titleText }}</h1>
</template>

<script setup>
  const props = defineProps(['titleText'])
  const emit  = defineEmits(['tick'])
  emit('tick', '')
</script>

<style scoped lang="scss">
    h1 {
        position: absolute;
        margin: 0;
        width: 100%;
        height: 105px;
        left: 0px;
        top: 0px;
        background: linear-gradient(90deg, #FF7F0A 0%, #FF9F40 100%);
        color: #FFFFFF;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 600;
        font-size: 48px;
        line-height: 56px;
        padding-left: 50px;
        display: flex;
        align-items: center;
    }
</style>