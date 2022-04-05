<template>
  <l-map
    id="myMap"
    ref="myMap"
    :center="[defaultLocation.lat, defaultLocation.lng]"
    :zoom="zoom"
    @dblclick="onMapClick"
  >
    <fa
      class="close-button"
      :icon="['fa', 'times-circle']"
      style="cursor: pointer"
      @click="$emit('close-modal')"
    />
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    <l-marker
      v-if="position && position.lat && position.lng"
      v-model:lat-lng="position"
      visible
      draggable
      :icon="redMarker"
      @dragstart="dragging = true"
      @dragend="dragging = false"
    >
      <l-tooltip :content="tooltipContent" :options="{ permanent: true }" />
    </l-marker>
  </l-map>
</template>
<script>
import Leaflet from 'leaflet';
import { ref, onBeforeMount, watch, computed } from 'vue';
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  props: {
    defaultLocation: {
      type: Object,
      default: () => ({ lat: 45.470493, lng: -73.609566 }),
    },
  },

  setup(_, ctx) {
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

    const mapIsReady = ref(false);
    const marker = ref();
    const myMap = ref();
    const position = ref({});
    const loading = ref(false);
    const dragging = ref(false);

    const geojsonOptions = ref({});
    onBeforeMount(async () => {
      const { circleMarker } = await import('leaflet/dist/leaflet-src.esm');

      geojsonOptions.value.pointToLayer = (feature, latLng) =>
        circleMarker(latLng, { radius: 8 });
      mapIsReady.value = true;
    });

    watch(
      position,
      (value) => {
        if (value) {
          ctx.emit('coord-selected', {
            lat: Math.floor(value.lat * 10000) / 10000,
            lng: Math.floor(value.lng * 10000) / 10000,
          });
        }
      },
      {
        deep: true,
      }
    );

    const tooltipContent = computed(() => {
      if (dragging.value) return true;
      if (loading.value) return 'Loading...';
      return `<strong>lat:</strong> ${position.value.lat}<br/> <strong>lng:</strong> ${position.value.lng}`;
    });

    function onMapClick(value) {
      position.value = value.latlng;
    }

    return {
      redMarker,
      zoom,
      marker,
      myMap,
      tooltipContent,
      onMapClick,
      position,
      mapIsReady,
      dragging,
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
