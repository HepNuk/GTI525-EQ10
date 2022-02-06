<template>
  <div class="bike-counter-view content-view">
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
      limitHeight
      class="table table-scroll"
    />
  </div>
</template>

<script>
import MyTable from 'src/component/shared/MyTable.vue';
import csvFile from 'src/assets/csv/compteurs.csv';
import Sort from 'src/component/shared/Sort.vue';

export default {
  components: {
    Sort,
    MyTable,
  },


  data() {
    return {
      bikeCounterData: csvFile,

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
        ID: 'Id',
        Nom: 'Nom du compteur',
        Statut: 'Statut',
        Annee_implante: 'Annee Implante',
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
    }
  }
};

</script>

<style lang="scss" scoped>

</style>
