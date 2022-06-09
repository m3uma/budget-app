<template>
  <figure>
    <HighchartsVue :options="options" />
  </figure>
</template>

<script setup>
import { ref, resolveComponent } from 'vue';

const props = defineProps({
  chartData: Object,
});

const { data } = props.chartData;
const totalValue = data.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
const HighchartsVue = resolveComponent('highcharts');
const options = ref({
  title: {
    verticalAlign: 'middle',
    floating: true,
    text: `Total:`,
    y: -10,
    style: {
      fontSize: '20px',
    },
  },
  subtitle: {
    verticalAlign: 'middle',
    floating: true,
    text: `${totalValue.toFixed(2)} zł`,
    y: 35,
    style: {
      color: 'red',
      fontSize: '24px',
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      innerSize: '50%',
      type: 'pie',
      dataLabels: {
        formatter: function () {
          if (this.y === 0) return null;

          const total = this.series.total,
            share = parseInt((this.y / total) * 100);

          return `${share}%`;
        },
        color: '#fbfbfb',
        style: {
          outline: 'none',
          fontSize: '24px',
        },
        distance: -45,
      },
      data: data.map(({ name, value, color }) => ({ name, y: value, color })),
    },
  ],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 350,
      },
      chartOptions: {
        title: {
          style: {
            fontSize: '16px'
          }
        },
        subtitle: {
          style: {
            fontSize: '20px'
          }
        },
        series: [{
          innerSize: '60%',
          dataLabels: {
            distance: -30,
            style: {
              fontSize: '16px'
            }
          }
        }]
      }
    }, {
      condition: {
        maxWidth: 250
      },
      chartOptions: {
        chart: {
          spacing: [30, 0, 0, 0],
          height: 300
        },
        title: {
          y: -5,
          style: {
            fontSize: '14px'
          }
        },
        subtitle: {
          y: 20,
          style: {
            fontSize: '14px'
          }
        },
        series: [{
          innerSize: '60%',
          dataLabels: {
            distance: -20,
            style: {
              fontSize: '14px'
            }
          }
        }]
      }
    }, {
      condition: {
        maxWidth: 200
      },
      chartOptions: {
        chart: {
          width: 200
        }
      }
    }]
  }
});
</script>

<style scoped>
</style>
