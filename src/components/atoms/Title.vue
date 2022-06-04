<script setup>
const props = defineProps(['titleText'])
const emit = defineEmits(['tick'])
emit('tick', '')
</script>

<template>
    <h1>{{ titleText }}</h1>
</template>

<style scoped lang="scss">
h1 {
    color: #FFFFFF;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    margin: 0px;
    text-align: left;
}
</style>