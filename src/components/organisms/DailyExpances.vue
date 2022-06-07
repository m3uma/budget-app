<template>
    <div>
        <div class="date">{{ date }}</div>
        <Expence v-for="expance in expances" :expanceName="expance.title" :categoryName="expance.category" :price="expance.amount + ' zł'" :key="expance.id" />
    </div>
</template>

<script setup>
    import Expence from '../molecules/Expence.vue';
    const props = defineProps(['expances', 'date'])

</script>
<style scoped lang="scss">
div {
    border-top: 1px solid #E8E8E8;
    max-width: 550px;
    width: 100%;
    text-align: left;
    > .date {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        padding: 0.5rem;
        color: #969696;
        border: none;
    }
}

</style>