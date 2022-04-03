<template>
  <l-map
    id="myMap"
    ref="myMap"
    :center="center"
  >
    <fa
      class="close-button"
      :icon="['fa', 'times-circle']"
      style="cursor: pointer"
      @click="$emit('close-modal')"
    />
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    <l-marker
      ref="center"
      :lat-lng="[center[0], center[1]]"
      :icon="redMarker"
    >
    </l-marker>
  </l-map>
</template>
<script>
import Leaflet from 'leaflet';
import { ref, onBeforeMount } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  props: {
    center: {
      type: Array,
      default: () => [45.470493, -73.609566],
    },
  },

  setup() {
    const zoom = ref(14);

    const redMarker = new Leaflet.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
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

    const marker = ref();
    const myMap = ref();

    return {
      redMarker,
      zoom,
      marker,
      myMap,
    };
  },
};
</script>
