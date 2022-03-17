<template>
  <div class="poi-details p-3">
    <!-- <fa
      class="me-4"
      icon="map-marked-alt"
      size="8x"
    /> -->
    <div class="my-map">
      <MiniMap class="map" :marker="marker" />
    </div>

    <div class="details">
      <h5>
        Détails
      </h5>

      <span>
        <strong>
          Proximité:
        </strong>
        {{ pointOfInterest ? pointOfInterest['Proximité_jeux_repère'] : '' }}
      </span>

      <span>
        <strong>
          Remarque:
        </strong>
        {{ pointOfInterest ? pointOfInterest.Remarque : '' }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import MiniMap from 'src/component/shared/MiniMap.vue';

export default {
  components: {
    MiniMap,
  },

  props: {
    pointOfInterest: {
      type: Object,
      required: false,
      default: undefined,
    },
  },

  setup(props) {
    const marker = computed(() => {
      return {
        id: props.pointOfInterest.ID,
        longitude: props.pointOfInterest.Longitude,
        latitude: props.pointOfInterest.Latitude,
        nom: props.pointOfInterest.Nom_parc_lieu,
      };
    });

    return {
      marker,
    };
  },
};
</script>

<style lang="scss" scopped>
.poi-details {
  display: flex;
  flex-direction: row;
  border: 2px solid black;

  .details {
    display: flex;
    flex-direction: column;
    h5 {
      font-weight: bold;
    }
  }
}

.my-map {
  width: 200px;
  height: 200px;
  margin-right: 1em;

  .map {
    border-color: black;
    border: 1px;
    border-radius: 15px;
  }
}
</style>
