import { createApp } from 'vue';
import { pinia } from './stores';
import App from './App.vue';
import router from './router';
import { Chart } from 'highcharts-vue';

const app = createApp(App)
    .use(router)
		.component("highcharts", Chart)
    .mount('#app');

createApp(App).use(router).use(pinia).mount('#app');