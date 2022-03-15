<template>
  <div class="poi-details p-3">
    <!-- <fa
      class="me-4"
      icon="map-marked-alt"
      size="8x"
    /> -->

    <!-- <Map
      :center="center"
      :markers="coordinate"
      class="map"
      @close-modal="$emit('close-modal')"
    /> -->

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
import Map from 'src/component/shared/Map.vue';

export default {
  componenets: {
    Map,
  },

  props: {
    pointOfInterest: {
      type: [Object, undefined],
      required: false,
      default: undefined,
    },
  },

  setup(props) {
    const center = computed(() => {
      return [props.pointOfInterest.latitude, props.pointOfInterest.longitude];
    });

    const coordinate = computed(() => {
      return [{ ...props.pointOfInterest, color: 'red', selected: true }];
    });

    return {
      coordinate,
      center,
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

.map {
  max-width: 45%;
  max-height: 55%;
  margin: 10px;
}
</style>
