<template>
  <div class="poi-details p-3">
    <fa
      class="me-4"
      icon="map-marked-alt"
      size="8x"
    />
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
export default {
  props: {
    pointOfInterest: {
      type: [Object, undefined],
      required: false,
      default: undefined,
    },
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
</style>
