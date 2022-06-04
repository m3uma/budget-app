<template>
    <header>
        <Title :title-text="titleText" @tick="e => msg = e" />
    </header>
</template>

<script setup>
import Title from '@/components/atoms/Title.vue';
const props = defineProps(['titleText'])

</script>

<style scoped lang="scss">
header {
    position: absolute;
    margin: 0;
    width: 100%;
    height: 105px;
    left: 0px;
    top: 0px;
    min-height: 6rem;
    background: linear-gradient(90deg, #FF7F0A 0%, #FF9F40 100%);
    padding-left: 2rem;
    max-width: 100vw;
    display: flex;
    align-items: center;
}
</style>