<template>
  <l-map
    id="myMap"
    ref="myMap"
    :center="[marker.latitude, marker.longitude]"
    :zoom="zoom"
  >
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    <l-marker
      v-if="marker"
      ref="marker"
      :lat-lng="[marker.latitude, marker.longitude]"
      :icon="blueMarker"
    />
  </l-map>
</template>

<script>
import Leaflet from 'leaflet';
import { ref, onBeforeMount } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

import 'leaflet/dist/leaflet.css';
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  props: {
    marker: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const zoom = ref(14);
    const mapIsReady = ref(false);
    const blueMarker = new Leaflet.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const geojsonOptions = ref({});

    onBeforeMount(async () => {
      const { circleMarker } = await import('leaflet/dist/leaflet-src.esm');

      geojsonOptions.value.pointToLayer = (feature, latLng) =>
        circleMarker(latLng, { radius: 8 });
      mapIsReady.value = true;
    });

    return {
      zoom,
      blueMarker,
    };
  },
};
</script>
<style scoped lang="scss">
#myMap {
  margin: 0;
}
.close-button {
  background-color: #f3f3f3;
  justify-content: center;
  align-items: center;
  height: 35px;
  border-radius: 50% !important;
  z-index: 1001;
  position: absolute;
  right: 1%;
  top: 1%;
}
</style>
