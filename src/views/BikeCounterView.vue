<template>
  <div class="bike-counter-view">
    <p class="title">
      Comptages de vélos
    </p>
    <!-- <Sort
    :data="csvFile"
    /> -->

    <Sort2
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
import Sort2 from 'src/component/shared/Sort2.vue';

export default {
  components: {
    Sort2,
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
      // Clone Array, we dont want to mutate directly the data, we want to mutated a computed value that way the orginal data is gone
      const filteredBikeData = [...this.bikeCounterData];

      // Sort 
      /*
        Sort filteredBikeData here based on Sort.vue > sortArray algo you made
        using this.sort.key and this.sort.direction as how to sort
      */

      // Filter/Paginate

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
.bike-counter-view{
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
.title{
  font-weight: bold;
  text-decoration: underline;
  margin: 0;
  grid-column: 1/3;
  grid-row: 1;
}
.table{
  grid-area: 2/1/4/4;
}
</style>
