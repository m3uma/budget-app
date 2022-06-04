<template>
    <button></button>
</template>

<script setup>
</script>

<style scoped lang="scss">
button {
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 4rem;
    height: 4rem;
    background: #FF7F0A;
    border-radius: 4px;
    border: none;
    background-image: url('@/assets/icons/add.png');
    background-position: center; background-repeat: no-repeat;
}
@media (max-width: 576px) {
    button {
        width: 3rem;
        height: 3rem;
        background-size: 2.5rem;
        bottom: 20px;
        left: 47%;
    }
}
</style>