<template>
    <figure>
        <HighchartsVue :options="options" />
    </figure>
</template>

<script setup>
import { ref, resolveComponent } from "vue";
const HighchartsVue = resolveComponent("highcharts");
const options = ref({
    chart: {
        width: 500,
        height: 500
    },
    title: {
        verticalAlign: 'middle',
        floating: true,
        text: `Total:`,
        y: -10,
        style: {
            fontSize: '20px'
        }
    },
    subtitle: {
        verticalAlign: 'middle',
        floating: true,
        text: `986,00zł`,
        y: 35,
        style: {
            color: 'red',
            fontSize: '24px'
        }
    },
    credits: {
        enabled: false
    },
    series: [
        {
            innerSize: '45%',
            type: 'pie',
            dataLabels: {
                color: '#fbfbfb',
                style: {
                    outline: 'none',
                    fontSize: '24px'
                },
                distance: -60,
                format: '{y} %'
            },
            data: [10, 20, 30, 12, 10, 10, 10]
        }
    ]
});
</script>

<style scoped>
</style>