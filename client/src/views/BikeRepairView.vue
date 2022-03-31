<template>
  <div class="bike-repair content-view">
    <div class="content-view-header p-3">
      <h2 class="title">
        Point d'intérêts: Ateliers de réparation vélo
      </h2>
    </div>

    <MyTable
      v-if="atelierData"
      :header="headerRow"
      :filtered-header="filteredHeader"
      :data="atelierData"
      :action-buttons="tableActionButtons"
      :paginate="15"
      :column-settings="columnSettings"
      show-bottom-separator
      class="table"
    />

    <POIDetails v-if="showPOIDetails" :point-of-interest="showPOIDetails" />
  </div>
</template>

<script>
import { getAllPointOfInterestsAtelier } from 'src/utils/Services';
import POIDetails from './POIDetails.vue';

export default {
  components: {
    POIDetails,
  },

  data() {
    return {
      atelierData: undefined,
      showPOIDetails: undefined,
    };
  },

  computed: {
    headerRow() {
      return Object.keys(this.atelierData[0]);
    },

    columnSettings() {
      return {
        Arrondissement: {
          maxWidth: '300px',
        },
        Type: {
          maxWidth: '150px',
        },
        Nom_parc_lieu: {
          maxWidth: '300px',
        },
        Intersection: {
          maxWidth: '200px',
        },
        buttonActions: {
          maxWidth: '20px',
        },
      };
    },

    filteredHeader() {
      return {
        Arrondissement: 'Arrondissement',
        Type: 'Type',
        Nom_parc_lieu: 'Nom du lieu',
        Intersection: 'Adresse',
      };
    },

    tableActionButtons() {
      return [
        {
          type: 'icon',
          icon: 'map-marker-alt',
          click: (row) => this.openPOIDetails(row),
        },
      ];
    },
  },

  mounted() {
    getAllPointOfInterestsAtelier().then(({ data }) => {
      console.log(data);
      this.atelierData = data;
    });
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

    openPOIDetails(row) {
      this.showPOIDetails = row;
    },

    closePOIDetails() {
      this.showPOIDetails = undefined;
    },
  },
};
</script>

<style lang="scss" scoped></style>
