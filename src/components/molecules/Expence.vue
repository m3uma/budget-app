<template>
    <div class="expence-wapper">
        <div>
            <span>{{ expanceName }}</span>
            <span>{{ categoryName }}</span>
        </div>
        <div>
            <span>{{ price }}</span>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['expanceName', 'categoryName', 'price'])
    const emit = defineEmits(['expanceTick'])
    emit('expanceTick', '')
</script>
<style scoped lang="scss">
.expence-wapper {
    display: flex;
    justify-content:  space-around;
    border-bottom: 1px solid #E8E8E8;
    border-top: none;
    font-family: 'Roboto';
    font-style: normal;
    max-width: 350px;
    margin-left: 150px;
    margin-bottom: 0.5rem;

    color: #64615F;
    > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 0.5rem;
        &:first-of-type > span {
            font-weight: 600;
            font-size: 20px;
            line-height: 23px;
            &:last-of-type {
               font-weight: 400;
                font-size: 14px;
                line-height: 16px; 
            }
        }
        &:last-of-type > span {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #DD0E0E;
        }
    }
}
</style>