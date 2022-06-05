import { createApp } from 'vue';
import { pinia } from './stores';
import App from './App.vue';
import router from './router';
import { Chart } from 'highcharts-vue';

createApp(App).use(router).use(pinia).component('highcharts', Chart).mount('#app');
