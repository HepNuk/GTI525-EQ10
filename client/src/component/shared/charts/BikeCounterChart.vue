<template>
  <hr />
  <BaseBarChart :chart-options="chartOptions" :chart-data="chartData" />
</template>
<script>
import { ref, computed } from 'vue';
import BaseBarChart from './baseCharts/BaseBarChart.vue';

export default {
  components: { BaseBarChart },
  props: {
    bikeCounterId: {
      type: String,
      required: true,
    },

    bikeCounterName: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: false,
      default: undefined,
    },

    endDate: {
      type: String,
      required: false,
      default: undefined,
    },

    labels: {
      type: Array,
      required: true,
    },

    count: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const bikeCounterData = ref(undefined);

    const chartTitleText = computed(() => {
      let text = `Bike Counter: ${props.bikeCounterName}`;
      if (props.startDate) text += ` | From: ${props.startDate}`;
      if (props.endDate) text += ` | To: ${props.endDate}`;

      return text;
    });

    const chartOptions = computed(() => ({
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          // text: chartTitleText.value,
        },
      },
    }));

    const chartData = computed(() => ({
      labels: props.labels,
      datasets: [
        {
          data: props.count,
          backgroundColor: '#6387ad',
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        },
      ],
    }));

    return {
      bikeCounterData,
      chartData,
      chartOptions,
    };
  },
};
</script>

<style lang="scss" scopped></style>
