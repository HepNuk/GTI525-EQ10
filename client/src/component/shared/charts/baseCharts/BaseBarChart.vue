<template>
  <BarChart v-bind="barChartProps" />
</template>
<script>
import { shuffle } from 'lodash';

import { computed, ref } from 'vue';
import { BarChart, useBarChart } from 'vue-chart-3';

// Dont Remove needed for chart to work.
import Chart from 'chart.js/auto';

export default {
  components: {
    BarChart,
  },

  props: {
    chartOptions: {
      type: Object,
      required: false,
      default: () => ({
        plugins: {
          legend: {
            display: true,
            labels: {},
          },
          title: {
            display: true,
            text: 'Chart.js Car Chart (No Options)',
          },
        },
      }),
    },

    chartData: {
      type: Object,
      required: false,
      default: () => ({
        labels: ['No Data', 'No Data2'],
        datasets: [
          {
            label: 'No Data',
            data: [2, 4],
            backgroundColor: '#A5C8ED',
            borderColor: 'rgba(150, 150, 250, 0.8)',
            color: 'rgba(255, 0, 0, 0.1)',
            borderWidth: 1,
            barPercentage: 1.01,
            categoryPercentage: 1.0,
          },
        ],
      }),
    },

    plugins: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  setup(props, ctx) {
    const { barChartProps, barChartRef, update } = useBarChart({
      chartData: props.chartData,
      options: props.chartOptions,
      plugins: [],
    });

    return { barChartProps, barChartRef, update };
  },
};
</script>
<style lang="scss" scopped></style>
