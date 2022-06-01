<template>
    <header>
        <Title :title-text="title" @tick="e => msg = e" />
    </header>
</template>

<script setup>
import Title from '@/components/atoms/Title.vue';
import { ref } from 'vue';

const title = ref("Categories");
let msg = ref('');
</script>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 6rem;
    background: linear-gradient(90deg, #FF7F0A 0%, #FF9F40 100%);
    padding-left: 2rem;
    max-width: 100vw;
}
</style>