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
          <fa icon="arrow-left" size="1x" /> Retour
        </h6>
        <h3 class="title ms-3">
          {{ bikeCounterName }}
        </h3>
      </div>

      <div style="display: flex; flex-direction: column">
        <h5 class="mx-2">
          Période:
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

      <MyRadioChoices
        v-model="groupBy"
        :options="groupByOptions"
        :disabled="loadingGroupBy"
      />
    </div>

    <hr />
    <BaseBarChart
      v-show="!loadingGroupBy"
      :chart-options="chartOptions"
      :chart-data="chartData"
    />
    <MySpinner v-if="loadingGroupBy" show-text />
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue';
import BaseBarChart from './baseCharts/BaseBarChart.vue';
import moment from 'moment';
import MySpinner from '../MySpinner.vue';

export default {
  components: { BaseBarChart, MySpinner },
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
    const loadingGroupBy = ref(false);
    const groupedValues = ref({});
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

    watch(groupBy, () => {
      loadingGroupBy.value = true;
      groupedValuesBySelection().then((res) => {
        groupedValues.value = res;
        loadingGroupBy.value = false;
      });
    });

    // TODO: https://stackoverflow.com/questions/56774051/how-to-compress-an-array-of-dates-to-their-months
    const groupedValuesBySelection = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let start_date = new Date(props.labels[0]);
          start_date = moment(start_date).add(1, 'days');
          let end_date = new Date(props.labels[props.labels.length - 1]);

          if (groupBy.value === 'week') {
            let week_label = [];
            let week_data = [];
            while (start_date <= end_date) {
              let weekStart = start_date.clone().startOf('week');
              week_label.push(moment(weekStart).format('YYYY-MM-DD'));
              start_date = moment(start_date).add(1, 'week');
            }

            for (let i = 0; i < week_label.length - 1; i++) {
              let count = 0;
              let startWeek = moment(week_label[i], 'YYYY-MM-DD');
              let endWeek = moment(week_label[i + 1], 'YYYY-MM-DD');
              for (let j = 0; j < props.labels.length; j++) {
                let currentDate = moment(props.labels[j]);
                if (currentDate.isBetween(startWeek, endWeek)) {
                  count += props.count[j];
                }
              }
              week_data.push(count);
            }

            resolve({
              labels: week_label,
              data: week_data,
            });
          }

          if (groupBy.value === 'month') {
            let month_label = [];
            let month_data = [];

            while (start_date <= end_date) {
              month_label.push(moment(start_date).format('YYYY-MM'));
              start_date = moment(start_date).add(1, 'month');
            }
            for (let i = 0; i < month_label.length; i++) {
              let count = 0;
              for (let j = 0; j < props.labels.length; j++) {
                if (
                  month_label[i] === moment(props.labels[j]).format('YYYY-MM')
                ) {
                  count += props.count[j];
                }
              }
              month_data.push(count);
            }
            resolve({
              labels: month_label,
              data: month_data,
            });
          }

          resolve({
            labels: props.labels,
            data: props.count,
          }); // already grouped by day
        }, 5);
      });
    };

    groupedValuesBySelection().then((res) => {
      groupedValues.value = res;
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
      loadingGroupBy,
      groupedValues,
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
