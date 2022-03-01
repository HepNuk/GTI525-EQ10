<template>
  <template v-if="bikeCounterData">
    <BaseBarChart 
      :chart-options="chartOptions"
      :chart-data="charData"
    />
  </template>
  <template v-else>
    <!-- Replace with a Spinner component later -->
    Loading ... 
  </template>
</template>
<script>
import { ref, computed } from 'vue';
import BaseBarChart from './baseCharts/BaseBarChart.vue';

import { getCompteur } from 'src/utils/Services.js';

export default {
  components: { BaseBarChart },
  props: {
    bikeCounterId: {
      type: String,
      required: true,
    },

    startFromData: {
      type: String,
      required: false,
      default: undefined,
    },

    endFromData: {
      type: String,
      required: false,
      default: undefined,
    }
  },

  setup(props) {
    const bikeCounterData = ref(undefined);
    

    // FIXME: Adapte once backend is figured out.
    getCompteur(props.bikeCounterId).then((res) => {
      data = res.data;
    });

    const chartTitleText = computed(() => {
      let text = `Bike Counter: ${props.bikeCounterId}`;
      if (props.startFromData) text += ` | From: ${props.startFromData}`;
      if (props.endFromData) text += ` | To: ${props.endFromData}`;

      return text;
    });

    const chartOptions = computed(() => ({
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: chartTitleText.value
        }
      }
    }));

    const chartData = computed(() => ({
      // Set up data based on data recieved
      labels: bikeCounterData.value ? [] : bikeCounterData.value.labels, // Should come from bikeCounterData backend setup.
      datasets: [
        {
          data: bikeCounterData.value ? [] : bikeCounterData.value.data, // bikeCounterData.data array,
          backgroundColor: '#A5C8ED',
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        }
      ]
    }));

    return { 
      bikeCounterData,
      chartData,
      chartOptions,
    };
  },
};
</script>
<style lang="scss" scopped>
  
</style>