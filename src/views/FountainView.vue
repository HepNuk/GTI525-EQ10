<template>
  <div class="fountain-view content-view">
    <div class="content-view-header p-3">
      <h2 class="title">
        Point d'intérêts: Fontaines à boire
      </h2>

      <Sort
        title="Trier par: "
        :sort-options="filteredHeader"
        :sort="sort"
        @toggle-sort="toggleSort"
      />
    </div>

    <MyTable
      v-if="fountainData"
      :header="headerRow" 
      :filtered-header="filteredHeader"
      :data="filteredFountainData"
      class="table"
    />
  </div>
</template>

<script>
import MyTable from 'src/component/shared/MyTable.vue';
import csvFile from 'src/assets/csv/fontaines.csv';
import Sort from 'src/component/shared/Sort.vue';

export default {
  components: {
    MyTable,
    Sort,
  },
  
  data() {
    return {
      fountainData: csvFile,

      sort: {
        key: 'Arrondissement',
        direction: 'asc',
      }
    };
  },

  computed: {
    headerRow() {
      return Object.keys(csvFile[0]);
    },

    filteredFountainData(){
      const filteredFountainData = [...this.fountainData];

      filteredFountainData.sort((a, b) => {
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

      return filteredFountainData;
    },

    filteredHeader(){
      return {
        Arrondissement: 'Arrondissement',
        Proximité_jeux_repère: 'Type',
        Nom_parc_lieu: 'Nom du lieu',
        Intersection: 'Adresse',
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
  // .fountain-view{
  //   padding: 10px;
  //   display: grid;
  // }
  // .title{
  //   font-weight: bold;
  //   text-decoration: underline;
  // }
</style>