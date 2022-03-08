<template>
  <MyModal>
    MAP MODAL
    <template #modal="">
      <button class="close-button" @click="$emit('close-modal')">
        X
      </button>
      <Map :markers="filtered" class="map" />
      <!-- :center-coordinates="center" -->
    </template>
  </MyModal>
</template>

<script>
import Map from '../Map.vue';
import MyModal from 'src/component/shared/MyModal.vue';
import { computed } from 'vue';
import Leaflet from 'leaflet';
import { localeData } from 'moment';

export default {
  components: {
    MyModal,
    Map,
  },
  props: {
    selected: {
      type: [Object, Boolean],
      default: undefined,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    console.log(props.selected);

    const filtered = computed(() => {
      return props.list.map((element) => {
        return {
          ...element,
          color: element.id !== props.selected.id ? 'blue' : 'red',
          selected: element.id === props.selected.id,
        };
      });
    });

    const center = computed(() => {
      return [0, 0];
      return [
        props.list.map((e) => e.latitude).reduce((p, c) => p + c) /
          props.list.length,
        props.list.map((e) => e.longitude).reduce((p, c) => p + c) /
          props.list.length,
      ];
    });

    // const zoom = computed(() => {
    //   let furtestMarkerCoord = center.value;

    //   props.list.forEach((e) => {
    //     const deltaLat = Math.abs(center.value[0] - e.lat);
    //     const deltaLng = Math.abs(center.value[1] - e.lng);

    //     const dist = deltaLat*deltaLat + deltaLng*deltaLng;

    //     if (
    //       dist >
    //       (furtestMarkerCoord[0]*furtestMarkerCoord[0] + furtestMarkerCoord[1]*furtestMarkerCoord[1])
    //     ) {
    //       furtestMarkerCoord = [deltaLat, deltaLng];
    //     }
    //   });

    //   const zoom = 0; // Calczoom with furtestMarkerCoord and center.value

    //   return zoom;
    // });

    return {
      filtered,
      center,
      // zoom,
    };
  },
};
</script>

<style scoped lang="scss">
.map {
  // display: flex;
  // max-height: 600px;
  // max-width: 600px;
  max-width: 50%;
  max-height: 65%;
  margin: 25px;
}
// temporary, need to import icon
.close-button {
  color: #d8d8d8;
  border-radius: 50% !important;
  background: #2c2c2c;
  height: 35px;
  width: 35px;
  z-index: 1001;
  // display: inline-flex;
  // align-self: flex-start;
  position: absolute;
  top: calc(50% - 175px);
  right: calc(50% - 285px);
}
</style>
