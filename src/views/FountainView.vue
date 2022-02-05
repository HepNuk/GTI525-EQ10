<template>
  <div class="fountain-view">
    <p class="title">
      Point d'intérêts: Fontaines à boire
    </p>

    <p>
      <MyTable
        v-if="fountain"
        :header="headerRow" 
        :data="filteredData"
        class="table"
      />
    </p>
  </div>
</template>

<script>
import MyTable from 'src/component/shared/MyTable.vue';
import csvFile from 'src/assets/csv/fontaines.csv';

const filteredHeader = [{
  Arrondissement: 'Arrondissement',
  Type: 'Type',
  Lieu: 'Nom du lieu',
  Adresse: 'Adresse',
}];

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
      return Object.values(filteredHeader[0]);
    },

    filteredData(){
      let returnArray = [];
      for(let i = 0; i < this.fountain.length; i++){
        let poi = this.fountain[i];
        if(poi.Proximité_jeux_repère === 'fontaine'){
          let location = {
              Arrondissement: poi.Arrondissement,
              Type: poi.Proximité_jeux_repère,
              Lieu: poi.Nom_parc_lieu,
              Adresse: poi.Intersection,
          };
          returnArray.push(location);
        }
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
  .fountain-view{
    padding: 10px;
    display: grid;
  }
  .title{
    font-weight: bold;
    text-decoration: underline;
  }
</style>