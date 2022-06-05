<template>
    <div>
        <div class="date">{{ date }}</div>
        <Expence :expanceName="expanceName" :categoryName="categoryName" :price="price" @expanceTick="e => msg = e" />
    </div>
</template>

<script setup>
    import Expence from '../molecules/Expence.vue';
    const props = defineProps(['expanceName', 'categoryName', 'price', 'date'])
    const emit = defineEmits(['dateTick'])
    emit('dateTick', '')
</script>
<style scoped lang="scss">
div {
    border-top: 1px solid #E8E8E8;
    max-width: 550px;
    width: 550px;
    text-align: left;
    > .date {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        padding: 0.5rem;
        color: #969696;
    }
}

</style>