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
        :header="bikeCounterHeader"
        :filtered-header="filteredHeader"
        :data="bikeCounterData"
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
import { ref, computed, watch } from 'vue';
import Sort from 'src/component/shared/Sort.vue';
import Stats from '../component/shared/Stats.vue';
import BikeCounterChart from 'src/component/shared/charts/BikeCounterChart.vue';

import {
  getAllCompteur,
  getCompteurDetailsBetweenDates,
} from '../utils/Services';
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
    const bikeCounterData = ref(undefined);
    const sort = ref({ key: 'ID', direction: 'asc' });
    const limit = ref(undefined);

    watch(
      sort,
      () => {
        getAllCompteur(sort.value, limit.value).then(({ data }) => {
          bikeCounterData.value = data;
        });
      },
      { immediate: true }
    );

    const bikeCounterHeader = computed(() => {
      if (bikeCounterData.value) return Object.keys(bikeCounterData.value[0]);
      return [];
    });

    const filteredHeader = computed(() => {
      return {
        ID: 'ID',
        Nom: 'Nom du compteur',
        Statut: 'Statut',
        Annee_implante: 'Annee Implantée',
      };
    });

    const toggleSort = (key) => {
      const newSort = {
        key,
        direction: 'asc',
      };

      if (sort.value.key === key && sort.value.direction === 'asc') {
        newSort.direction = 'desc';
      }

      sort.value = newSort;
    };

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
        .then(({ data }) => {
          chartInfo.value = {
            bikeCounterName: data['Nom'],
            bikeCounterId: data['ID'],
            startDate: `${q.fromYear}-${q.fromMonth}-${q.fromDay}`,
            endDate: `${q.toYear}-${q.toMonth}-${q.toDay}`,
            labels: data.counterData.map((e) => e.date),
            count: data.counterData.map((e) => e.count),
          };
        })
        .catch((err) => console.error(err))
        .finally(() => (loadingChart.value = false));
    };

    const closeChartDetails = () => {
      chartInfo.value = undefined;
    };

    const coordinatesArray = computed(() => {
      if (!bikeCounterData.value) return [];

      return bikeCounterData.value.map((e) => {
        return {
          id: e['ID'],
          longitude: e['Longitude'],
          latitude: e['Latitude'],
          nom: e['Nom'],
        };
      });
    });

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
      bikeCounterData,
      bikeCounterHeader,
      filteredHeader,
      sort,
      toggleSort,

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
      coordinatesArray,
    };
  },
};
</script>

<style lang="scss" scoped></style>
