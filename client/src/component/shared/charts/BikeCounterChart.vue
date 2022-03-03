<template>
  <div>
    <div class="chart-hearder">
      <div
          class="d-flex"
          style="
          flex-direction: column;
          align-items: center;
          justify-content: center;
        "
      >
        <h6
            style="align-self: flex-start; cursor: pointer"
            @click="$emit('close')"
        >
          <!-- TODO: -->
          {{ '<- Go Back' }}
        </h6>
        <h3 class="title ms-3">
          Comptages de vélos
        </h3>
      </div>

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

      <MyRadioChoices v-model="groupBy" :options="groupByOptions"/>
    </div>
    <hr/>
    <BaseBarChart :chart-options="chartOptions" :chart-data="chartData"/>
  </div>
</template>
<script>
import {ref, computed, watch} from 'vue';
import BaseBarChart from './baseCharts/BaseBarChart.vue';
import moment from "moment";

export default {
  components: {BaseBarChart},
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
    const groupBy = ref('day');
    const groupByOptions = computed(() => [
      {
        value: 'day',
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

    // TODO: in these 2 computed properties filter out array based on selection
    const groupedValues = computed(() => {
      if (groupBy.value === 'week') {


        return {
          labels: props.labels,
          data: [],
        };
      }


      if (groupBy.value === 'month') {
        let start_date = new Date(props.labels[0]);
        start_date = moment(start_date).add(1, 'days');
        let end_date = new Date(props.labels[props.labels.length - 1]);
        let month_label = [];
        let month_data = [];

        while (start_date <= end_date) {
          month_label.push(moment(start_date).format('YYYY-MM'))
          start_date = moment(start_date).add(1, 'month')
        }
        for (let i = 0; i < month_label.length; i++) {
          let count = 0;
          for (let j = 0; j < props.labels.length; j++) {
            if (month_label[i] === moment(props.labels[j]).format('YYYY-MM')) {
                count+=props.count[j];
            }
          }
          month_data.push(count);
        }
        return {
          labels: month_label,
          data: month_data,
        }
      }

      return {
        labels: props.labels,
        data: props.count,
      }; // already grouped by day
    });

    const chartData = computed(() => ({
      labels: groupedValues.value.labels,
      datasets: [
        {
          data: groupedValues.value.data,
          backgroundColor: '#6387ad',
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        },
      ],
    }));

    return {
      groupedValues,
      groupBy,
      groupByOptions,
      bikeCounterData,
      chartData,
      chartOptions,
    };
  }
  ,
};
</script>

<style lang="scss" scopped>
.chart-hearder {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
