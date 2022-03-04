<template>
  <div class="bike-counter-view content-view">
    <template v-if="!chartInfo">
      <div class="content-view-header p-3">
        <h2 class="title">
          Comptages de vélos
        </h2>

        <Sort
          title="Trier par: "
          :sort-options="filteredHeader"
          :sort="sort"
          @toggle-sort="toggleSort"
        />
      </div>

      <MyTable
        v-if="bikeCounterData"
        :header="headerRow"
        :filtered-header="filteredHeader"
        :data="filteredBikeData"
        :action-buttons="tableActionButtons"
        :paginate="15"
        show-bottom-separator
        class="table"
      />

      <MySpinner v-if="loadingChart" show-text />
      <template v-else>
        <Stats
          v-if="showStatsFor"
          ref="stats"
          :counter-name="counterName"
          :counter-id="showStatsFor"
          @submit="loadChartDatails"
          @close="closeStats"
        />
      </template>
    </template>

    <template v-else>
      <BikeCounterChart
        v-if="chartInfo"
        v-bind="chartInfo"
        @close="chartInfo = undefined"
      />
    </template>
  </div>
</template>

<script>
import csvFile from 'src/assets/csv/compteurs.csv';
import Sort from 'src/component/shared/Sort.vue';
import Stats from '../component/shared/Stats.vue';
import BikeCounterChart from 'src/component/shared/charts/BikeCounterChart.vue';

import { getCompteurDetailsBetweenDates } from '../utils/Services';
import MySpinner from '../component/shared/MySpinner.vue';

export default {
  components: {
    Sort,
    Stats,
    BikeCounterChart,
    MySpinner,
  },

  data() {
    return {
      loadingChart: false,
      chartInfo: undefined,
      bikeCounterData: csvFile,

      showStatsFor: undefined,
      counterName: '',

      sort: {
        key: 'ID',
        direction: 'asc',
      },
    };
  },

  computed: {
    headerRow() {
      return Object.keys(csvFile[0]);
    },

    filteredBikeData() {
      const filteredBikeData = [...this.bikeCounterData];
      filteredBikeData.sort((a, b) => {
        a = a[this.sort.key];
        b = b[this.sort.key];

        if (this.sort.direction === 'asc') {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        } else {
          if (a > b) {
            return -1;
          }
          if (a < b) {
            return 1;
          }
          return 0;
        }
      });

      return filteredBikeData;
    },

    filteredHeader() {
      return {
        ID: 'ID',
        Nom: 'Nom du compteur',
        Statut: 'Statut',
        Annee_implante: 'Annee Implantée',
      };
    },

    tableActionButtons() {
      return [
        {
          type: 'icon',
          icon: 'map-marker-alt',
          click: (row) => {
            console.log(row.Longitude, row.Latitude);
          },
        },
        {
          type: 'text',
          text: 'Statistique',
          click: (row) => this.openStats(row),
        },
      ];
    },
  },

  methods: {
    toggleSort(key) {
      const newSort = {
        key,
        direction: 'asc',
      };

      if (this.sort.key === key && this.sort.direction === 'asc') {
        newSort.direction = 'desc';
      }
      this.sort = newSort;
    },

    openStats(row) {
      this.showStatsFor = row['ID'];
      this.counterName = row['Nom'];
      console.log(row['Nom']);
    },

    closeStats() {
      this.showStatsFor = undefined;
      this.counterName = '';
    },

    statsErrorMessage(message) {
      this.$refs.stats.errorMessage = message;
    },

    loadChartDatails(p) {
      const startDate = '' + p.fromYear + p.fromMonth + p.fromDay;
      const endDate = '' + p.toYear + p.toMonth + p.toDay;

      if (Number(startDate) >= Number(endDate)) {
        this.statsErrorMessage(
          'La date de fin doit etre avant la date de début.'
        );
        return;
      }

      this.loadingChart = true;
      getCompteurDetailsBetweenDates(this.showStatsFor, startDate, endDate)
        .then((res) => {
          this.chartInfo = {
            bikeCounterName: res.data.name,
            bikeCounterId: this.showStatsFor,
            startDate: `${p.fromYear}-${p.fromMonth}-${p.fromDay}`,
            endDate: `${p.toYear}-${p.toMonth}-${p.toDay}`,
            labels: res.data.label,
            count: res.data.count,
          };
        })
        .catch((err) => console.error(err))
        .finally(() => (this.loadingChart = false));
    },

    closeChartDetails() {
      this.chartInfo = undefined;
    },
  },
};
</script>

<style lang="scss" scoped></style>
