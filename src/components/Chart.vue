<template>
    <figure>
        <HighchartsVue :options="options" />
    </figure>
</template>

<script setup>
import { ref, resolveComponent } from "vue";

const props = defineProps({
    chartData: Object
});

const { data } = props.chartData;
const HighchartsVue = resolveComponent("highcharts");
const options = ref({
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
                formatter: function () {
                    if (this.y === 0) return null;

                    const total = this.series.total,
                        share = parseInt(this.y / total * 100);

                    return `${share} %`;
                },
                color: '#fbfbfb',
                style: {
                    outline: 'none',
                    fontSize: '24px'
                },
                distance: -45,
            },
            data: data.map(({ name, value, color }) => ({ name, y: value, color }))
        }
    ]
});
</script>

<style scoped>
</style>