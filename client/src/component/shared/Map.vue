<template>
  <l-map
    id="myMap"
    ref="myMap"
    :center="centerCoordinates"
    @ready="mapReady"
  >
    <fa
      class="close-button"
      :icon="['fa', 'times-circle']"
      style="cursor: pointer"
      @click="$emit('close-modal')"
    />
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <l-control-layers />

    <l-marker
      v-if="selectedMarker"
      ref="marker"
      :lat-lng="[selectedMarker.latitude, selectedMarker.longitude]"
      :icon="getIcon(selectedMarker.color)"
    >
      <l-popup
        ref="popup"
        :content="selectedMarker.nom"
        @ready="ready"
      />
    </l-marker>

    <template v-for="item in markers" :key="item.id">
      <l-marker
        v-if="!item.selected"
        :lat-lng="[item.latitude, item.longitude]"
        :icon="getIcon(item.color)"
      >
        <l-popup :content="item.nom" />
      </l-marker>
    </template>
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
    LPopup,
  },

  props: {
    markers: {
      type: Array,
      default: () => [],
    },
    center: {
      type: Array,
      default: () => [45.470493, -73.609566],
    },
    centerCoordinates: {
      type: Object,
      default: undefined,
    },
  },

  setup(props) {
    const zoom = ref(14);
    const mapIsReady = ref(false);

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

    const getIcon = (color) => {
      if (color === 'red') return redMarker;
      if (color === 'blue') return blueMarker;
    };

    const geojsonOptions = ref({});
    onBeforeMount(async () => {
      const { circleMarker } = await import('leaflet/dist/leaflet-src.esm');

      geojsonOptions.value.pointToLayer = (feature, latLng) =>
        circleMarker(latLng, { radius: 8 });
      mapIsReady.value = true;
    });

    const marker = ref();
    const popup = ref();
    const ready = () => {
      marker.value.leafletObject.openPopup();
    };

    const myMap = ref();
    const mapReady = () => {
      const myPoints = props.markers.map((e) => [e.latitude, e.longitude]);
      myMap.value.leafletObject.fitBounds(myPoints, { padding: [15, 15] });
    };

    const selectedMarker = ref({
      ...props.markers.find((e) => e.selected),
    });

    return {
      zoom,
      getIcon,
      marker,
      ready,
      popup,
      selectedMarker,
      mapReady,
      myMap,
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
