<template>
  <l-map ref="myMap" 
    v-model="zoom"
    v-model:zoom="zoom"
    style="height:30vh"
    :center="[45.470493, -73.609566]"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <l-control-layers />
    <l-marker :lat-lng="[45.470493, -73.609566]" />
  </l-map>
</template>
<script>
import { ref, onMounted, onBeforeMount } from "vue";
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LTooltip,
    LPopup,
  },

  setup() {
    const zoom = ref(8)
    const mapIsReady = ref(false)

    const geojson = ref({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [45.470493, -73.609566]
      },
      // features: [
      //   // ...
      // ],
    })

    const geojsonOptions = ref({})

    onBeforeMount(async () => {
      // HERE is where to load Leaflet components!
      const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

      // And now the Leaflet circleMarker function can be used by the options:
      geojsonOptions.value.pointToLayer = (feature, latLng) =>
        circleMarker(latLng, { radius: 8 });
      mapIsReady.value= true;
    })

    // const doSomething = () => {
      
    // }
    return {
      zoom,
      // geojson,
      // mapIsReady,
      // geojsonOptions,
    }
  }
};
</script>