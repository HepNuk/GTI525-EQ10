<template>
  <div class="bike-counter-view content-view">
    <template v-if="!chartInfo">
      <div class="content-view-header p-3">
        <MapModal
          :is-show="!!showModal"
          :selected="showModal"
          :list="coordinatesArray"
          @close-modal="closeModal"
        />

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
          @submit="getCharDetails"
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
import { ref, computed } from 'vue';

import csvFile from 'src/assets/csv/compteurs.csv';
import Sort from 'src/component/shared/Sort.vue';
import Stats from '../component/shared/Stats.vue';
import BikeCounterChart from 'src/component/shared/charts/BikeCounterChart.vue';

import { getCompteurDetailsBetweenDates } from '../utils/Services';
import MySpinner from '../component/shared/MySpinner.vue';
import MapModal from 'src/component/shared/modals/MapModal.vue';

export default {
  components: {
    Sort,
    Stats,
    BikeCounterChart,
    MySpinner,
    MapModal,
  },

  setup() {
    // MapModal
    const showModal = ref(undefined);

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    // Statistics
    const showStatsFor = ref(undefined);
    const counterName = ref('');
    const loadingChart = ref(false);
    const chartInfo = ref(undefined);

    const openStats = (row) => {
      showStatsFor.value = row['ID'];
      counterName.value = row['Nom'];
    };

    const closeStats = () => {
      showStatsFor.value = undefined;
      counterName.value = row['Nom'];
    };

    const stats = ref();
    const statsErrorMessage = (msg) => {
      stats.value.errorMessage = msg;
    };

    const getCharDetails = (q) => {
      const startDate = '' + q.fromYear + q.fromMonth + q.fromDay;
      const endDate = '' + q.toYear + q.toMonth + q.toDay;

      if (Number(startDate) >= Number(endDate)) {
        statsErrorMessage('La date de fin doit etre avant la date de début.');
        return;
      }

      loadingChart.value = true;
      getCompteurDetailsBetweenDates(showStatsFor.value, startDate, endDate)
        .then((res) => {
          chartInfo.value = {
            bikeCounterName: res.data.name,
            bikeCounterId: showStatsFor.value,
            startDate: `${q.fromYear}-${q.fromMonth}-${q.fromDay}`,
            endDate: `${q.toYear}-${q.toMonth}-${q.toDay}`,
            labels: res.data.label,
            count: res.data.count,
          };
        })
        .catch((err) => console.error(err))
        .finally(() => (loadingChart.value = false));
    };

    const closeChartDetails = () => {
      chartInfo.value = undefined;
    };

    // Action Buttons
    const tableActionButtons = computed(() => [
      {
        type: 'icon',
        icon: 'map-marker-alt',
        click: (row) => {
          showModal.value = {
            id: row['ID'],
            nom: row['Nom'],
            longitude: row['Longitude'],
            latitude: row['Latitude'],
          };
        },
      },
      {
        type: 'text',
        text: 'Statistique',
        click: (row) => openStats(row),
      },
    ]);

    return {
      tableActionButtons,
      openModal,
      closeModal,
      showModal,

      openStats,
      closeStats,
      closeChartDetails,
      getCharDetails,
      showStatsFor,
      counterName,
      loadingChart,
      chartInfo,
    };
  },

  data() {
    return {
      bikeCounterData: csvFile,

      sort: {
        key: 'ID',
        direction: 'asc',
      },
    };
  },

  computed: {
    coordinatesArray() {
      return this.bikeCounterData.map((element) => {
        return {
          id: element['ID'],
          longitude: element['Longitude'],
          latitude: element['Latitude'],
          nom: element['Nom'],
        };
      });
    },

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
  },
};
</script>

<style lang="scss" scoped></style>
