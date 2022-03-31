<template>
  <div class="fountain-view content-view">
    <div class="content-view-header p-3">
      <h2 class="title">
        Point d'intérêts: Fontaines à boire
      </h2>

      <!-- TODO: Add Later if needed else Remove -->
      <!-- <Sort
        title="Trier par: "
        :sort-options="filteredHeader"
        :sort="sort"
        @toggle-sort="toggleSort"
      /> -->
    </div>

    <MyTable
      v-if="fountainData"
      :header="headerRow"
      :filtered-header="filteredHeader"
      :data="fountainData"
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
import { getAllPointOfInterestsFountain } from 'src/utils/Services';
import POIDetails from './POIDetails.vue';

export default {
  components: {
    // Sort,
    POIDetails,
  },

  data() {
    return {
      fountainData: undefined,
      showPOIDetails: undefined,

      sort: {
        key: 'Arrondissement',
        direction: 'asc',
      },
    };
  },

  computed: {
    headerRow() {
      return Object.keys(this.fountainData[0]);
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

    // filteredDataExtra() {
    //   return this.fountainData.map((e) => {
    //     return { ...e, Type: 'Fontaine à boire' };
    //   });
    // },

    filteredHeader() {
      return {
        Arrondissement: 'Arrondissement',
        Type: 'Type',
        Nom_parc_lieu: 'Nom du lieu',
        Intersection: 'Adresse',
        // Proximité_jeux_repère: 'Proximité',
        // Remarque: 'Remarque',
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
    getAllPointOfInterestsFountain().then(({ data }) => {
      console.log(data);
      this.fountainData = data;
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

<style lang="scss" scoped>
.map-marked-icon {
  height: 100px;
  width: 100px;
}
</style>
