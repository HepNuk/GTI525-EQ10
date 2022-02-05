<template>
  <div class="bike-counter-view">
    <p class="title">
      Comptages de vélos
    </p>
    <p class="sort">
      I am SORT
    </p>
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

export default {
  components: {
    MyTable,
  },

  data() {
    return {
      bikeCounterData: csvFile
    };
  },

  computed: {
    headerRow() {
      return Object.values(this.bikeCounterData[0]);
    },

    filteredBikeData(){
      // To use jimmy's filter here
      return this.bikeCounterData; // Temporary, just returning the full list
    },

    filteredHeader() {
      return {
        ID: 'ID',
        Nom: 'Nom du compteur',
        Statut: 'Statut', 
        Annee_implante: 'Annee Implante',
      };
    }
  },
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
