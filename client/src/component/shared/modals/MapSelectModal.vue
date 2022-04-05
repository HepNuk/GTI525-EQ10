<template>
  <MyModal>
    <MapSelect
      class="map"
      @close-modal="$emit('close-modal')"
      @coord-selected="emitCoord"
    />
  </MyModal>
</template>

<script>
import MapSelect from '../MapSelect.vue';
import MyModal from 'src/component/shared/MyModal.vue';

export default {
  components: {
    MyModal,
    MapSelect,
  },

  setup(_, { emit }) {
    function emitCoord(value) {
      emit('coord-selected', value);
    }
    return { emitCoord };
  },
};
</script>

<style scoped lang="scss">
.map {
  max-width: 45%;
  max-height: 55%;
  margin: 25px;
}
</style>
