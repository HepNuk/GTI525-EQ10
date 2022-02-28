<template>
  <div class="bike-counter-view content-view">
    <template v-if="!chartDetails">
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
  
      <Stats 
        v-if="showStatsFor"
        @submit="logSubmit"
        @close="closeStats"
      />

      <!-- <MyModal :is-show="showModal" @close-modal="closeModal"/> -->
      <MapModal :is-show="showModal" @close-modal="closeModal"/>
    </template>

    <template v-else>

    </template>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import csvFile from 'src/assets/csv/compteurs.csv';
import Sort from 'src/component/shared/Sort.vue';
import Stats from 'src/component/shared/Stats.vue';
import MyModal from 'src/component/shared/MyModal.vue';
import MapModal from 'src/component/shared/modals/MapModal.vue';

export default {
  components: {
    Sort,
    Stats,
    MyModal,
    MapModal,
  },

  setup() {
    const showModal = ref(false);

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    }

    const tableActionButtons = computed(() => [
      {
        type: 'icon',
        icon: 'map-marker-alt',
        click: (row) => { 
          showModal.value = true;
          console.log(row.Longitude, row.Latitude); 
        },
      },
      {
        type: 'text',
        text: 'Statistique',
        // click: (row) => this.openStats(row),
      }
    ]);

    return {
      tableActionButtons,
      openModal,
      closeModal,
      showModal,
    }
  },

  data() {
    return {
      chartDetails: false,
      bikeCounterData: csvFile,

      showStatsFor: undefined,

      sort: {
        key: 'ID',
        direction: 'asc',
      }
      
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

    // tableActionButtons() {
    //   return [
    //     {
    //       type: 'icon',
    //       icon: 'map-marker-alt',
    //       click: (row) => { 
    //         this.showModal = true;
    //         console.log(row.Longitude, row.Latitude); 
    //       },
    //     },
    //     {
    //       type: 'text',
    //       text: 'Statistique',
    //       click: (row) => this.openStats(row),
    //     }
    //   ];
    // },
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
      this.showStatsFor = row.ID;
    },
    
    closeStats() {
      this.showStatsFor = undefined;
    },

    logSubmit(payload) {
      console.log(payload);
    }
  }
};

</script>

<style lang="scss" scoped>
</style>
