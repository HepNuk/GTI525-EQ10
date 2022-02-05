<template>
  <div class="fountain-view">
    <p class="title">
      Point d'intérêts: Fontaines à boire
    </p>

    <p>
      <MyTable
        v-if="fountainData"
        :header="headerRow" 
        :filtered-header="filteredHeader"
        :data="filteredFountainData"
        class="table"
      />
    </p>
  </div>
</template>

<script>
import MyTable from 'src/component/shared/MyTable.vue';
import csvFile from 'src/assets/csv/fontaines.csv';

export default {
  components: {
    MyTable,
  },
  
  data() {
    return {
      fountainData: csvFile
    };
  },

  computed: {
    headerRow() {
      return Object.keys(csvFile[0]);
    },

    filteredFountainData(){
      const filteredFountainData = [...this.fountainData];
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

  mounted(){
    console.log(this.filteredData);
  }
};

</script>

<style lang="scss" scoped>
  .fountain-view{
    padding: 10px;
    display: grid;
  }
  .title{
    font-weight: bold;
    text-decoration: underline;
  }
</style>