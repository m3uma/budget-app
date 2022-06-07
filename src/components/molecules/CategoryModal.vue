<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
    <button @click="open = true">
        <img src="@/assets/icons/addCategory.svg" />
        Add category
    </button>

    <Teleport to="body">
        <div v-if="open" class="modal">
            <p>Add Category</p>
            <div class="content">
                <input placeholder="Category Name" />
                <input type="color" class="colorpicker" />
                <div class="buttons">
                    <button class="close" @click="open = false">Close</button>
                    <button class="add">Add</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
img {
    width: 2rem;
}

button {
    display: inline-block;
    display: flex;
    flex-direction: row;
    align-self: start;
    align-items: center;
    font-size: 1rem;
    gap: 0.5rem;
    cursor: pointer;
    border: none;
    background-color: transparent;
}

p {
    padding: 0.5rem;
    background-color: #FF7F0A;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: #fbfbfb;
}

div {
    display: block
}

button:focus {
    outline: none;
}

.modal {
    overflow: hidden;
    background-color: #fbfbfb;
    border-radius: 10px;
    border: 1px solid #cccccc;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    min-width: 20rem;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.add {
    font-size: 1rem;
    color: #fbfbfb;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: #FF7F0A;
}

.close {
    font-size: 1rem;
    background-color: #fbfbfb;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    color: #FF7F0A;
    border: 1px solid #FF7F0A;
}

.content {
    padding: 2rem 1rem;
}

input {

    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ccc;
    height: 2rem;
    width: 100%;
    padding: 0;
    margin: 0 0 1rem 0;
}
</style>