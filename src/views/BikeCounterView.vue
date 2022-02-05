<template>
  <div class="bike-counter-view">
    <p class="title">
      Comptages de vélos
    </p>
    <p class="sort">
      I am SORT
    </p>
    <MyTable
      v-if="bikeCounter"
      :header="headerRow"
      :data="filteredData"
      class="table"
    />
  </div>
</template>

<script>
import MyTable from 'src/component/shared/MyTable.vue';
import csvFile from 'src/assets/csv/compteurs.csv';

const filteredHeader = [{
  ID: 'ID',
  Compteur: 'Nom du compteur',
  Statut: 'Statut', 
  Annee: 'Annee Implante',
 }];

export default {
  components: {
    MyTable,
  },

  data() {
    return {
      loading: false,
      bikeCounter: csvFile
    };
  },

  computed: {
    headerRow() {
      return Object.values(filteredHeader[0]);
    },

    filteredData(){
      let returnArray = [];
      for(let i = 0; i < this.bikeCounter.length; i++){
        let poi = this.bikeCounter[i];
        let bc = {
            ID: poi.ID,
            Compteur: poi.Nom,
            Statut: poi.Statut,
            Annee: poi.Annee_implante,
            }
        returnArray.push(bc);
      }
      return returnArray;
    },
  },

    mounted(){
    console.log(this.filteredData);
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
