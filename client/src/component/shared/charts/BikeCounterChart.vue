<template>
  <div>
    <div class="chart-hearder">
      <h2 class="title">
        Comptages de vélos
      </h2>

      <div style="display: flex; flex-direction: column">
        <h5 class="mx-2">
          Prériode:
        </h5>
        <span class="d-flex" style="justify-content: space-between">
          <strong class="me-2">
            Debut:
          </strong>
          {{ startDate }}
        </span>

        <span class="d-flex" style="justify-content: space-between">
          <strong class="me-2">
            Fin:
          </strong>
          {{ endDate }}
        </span>
      </div>

      <MyRadioChoices v-model="groupBy" :options="groupByOptions" />
    </div>
    <hr />
    <BaseBarChart :chart-options="chartOptions" :chart-data="chartData" />
  </div>
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
    const groupBy = ref('days');
    const groupByOptions = computed(() => [
      {
        value: 'days',
        label: 'Jours',
      },
      {
        value: 'week',
        label: 'Semaine',
      },
      {
        value: 'month',
        label: 'Mois',
      },
    ]);

    const bikeCounterData = ref(undefined);

    // const chartTitleText = computed(() => {
    //   let text = `Bike Counter: ${props.bikeCounterName}`;
    //   if (props.startDate) text += ` | From: ${props.startDate}`;
    //   if (props.endDate) text += ` | To: ${props.endDate}`;

    //   return text;
    // });

    const chartOptions = computed(() => ({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          // text: chartTitleText.value,
        },
      },
      scales: {
        yAxes: {
          title: {
            display: true,
            text: 'Passages',
            font: {
              size: 15,
            },
          },
          ticks: {
            precision: 0,
          },
        },
        xAxes: {
          title: {
            display: true,
            text: 'Date',
            font: {
              size: 15,
            },
          },
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
      groupBy,
      groupByOptions,
      bikeCounterData,
      chartData,
      chartOptions,
    };
  },
};
</script>

<style lang="scss" scopped>
.chart-hearder {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
