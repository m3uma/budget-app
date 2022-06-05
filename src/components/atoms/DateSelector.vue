<template>
    <div>
        <i data-direction="left" />
        <p>January 2022</p>
        <i data-direction="right" />
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
div {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
}

p {
    font-size: 1rem;
    color: #2b2b2b;
    font-weight: 600;
}

i {
    height: 0.5rem;
    width: 0.5rem;
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 5px;
    cursor: pointer;
}

i[data-direction="left"] {
    transform: rotate(135deg);
}

i[data-direction="right"] {
    transform: rotate(-45deg);
}
</style>