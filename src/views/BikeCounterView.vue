<template>
  <div class="bike-counter-view">
    <p class="title">
      Comptages de vélos
    </p>

    <Sort
        title="Trier par: "
        :sort-options="filteredHeader"
        :sort="sort"
        @toggle-sort="toggleSort"
    />

    <MyTable
        v-if="bikeCounterData"
        :header="headerRow"
        :filtered-header="filteredHeader"
        :data="filteredBikeData"
        class="table"
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
    }
  }
};

</script>

<style lang="scss" scoped>
.bike-counter-view {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.title {
  font-weight: bold;
  text-decoration: underline;
  margin: 0;
  grid-column: 1/3;
  grid-row: 1;
}

.table {
  grid-area: 2/1/4/4;
}
</style>
