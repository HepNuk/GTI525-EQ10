<template>
  <l-map 
    ref="myMap" 
    v-model="zoom"
    v-model:zoom="zoom"
    style="height:30vh"
    :center="center"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <l-control-layers />
    <l-marker
      v-for="item in markers" 
      :key="item.id" 
      :ref="item.ref ? 'marker' : undefined" 
      :lat-lng="[item.latitude, item.longitude]"
      :icon="getIcon(item.color)"
    >
      <l-popup ref="popup" :content="item.nom" >
      </l-popup>
    </l-marker>

    <l-marker
      id="fkthis"
      ref="marker"
      :lat-lng="center"
    >
      <l-popup ref="popup" @ready="ready">
        This is a popup open by default
      </l-popup>
    </l-marker>

  </l-map>
</template>
<script>
import Leaflet from 'leaflet';
import { ref, onBeforeMount, onMounted, nextTick } from 'vue';
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LTooltip,
  LPopup,
} from '@vue-leaflet/vue-leaflet';

import 'leaflet/dist/leaflet.css';
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LTooltip,
    LPopup,
  },

  props: {
    markers: {
      type: Array,
      default: ()=>[],
    },
    center: {
      type: Array,
      default: ()=>[45.470493, -73.609566],
    },
    centerCoordinates: {
      type: Object,
      default: undefined,
    },
  },

  setup() {
    const zoom = ref(11);
    const mapIsReady = ref(false);

    const redMarker = new Leaflet.Icon({
        iconUrl:
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
    });

    const blueMarker = new Leaflet.Icon({
        iconUrl:
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
    });

    const getIcon = (color) => {
      if (color === 'red') return redMarker;
      if (color === 'blue') return blueMarker;
    };

    const geojson = ref({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [45.470493, -73.609566],
      },
      // features: [
      //   // ...
      // ],
    });

    const geojsonOptions = ref({});

    onBeforeMount(async () => {
      // HERE is where to load Leaflet components!
      const { circleMarker } = await import('leaflet/dist/leaflet-src.esm');

      // And now the Leaflet circleMarker function can be used by the options:
      geojsonOptions.value.pointToLayer = (feature, latLng) =>
        circleMarker(latLng, { radius: 8 });
      mapIsReady.value= true;

    });
  
    const marker = ref();
    const popup = ref();
    const ready = () => {
      marker.value.leafletObject.openPopup();
    };

    const test =
      [{
      		position: L.latLng(47.413220, -1.219482),
          text: 'Marker 1',
        },
        {
      		position: L.latLng(47.313220, -1.219482),
          text: 'Marker 2',
        },
     ];


    return {
      zoom,
      getIcon,
      marker,
      ready,
      // geojson,
      // mapIsReady,
      // geojsonOptions,
    };
  },

  // mounted() {
  //   this.$nextTick(() => {
  //     // console.log(this.$refs['selected']);
  //     const map = this.$refs.mymap.mapObject;
  //     console.log(map);
  //     console.log(this.$refs.get('marker'));
  //     this.$refs.marker.leafletObject.openPopup();
  //   });
  // },
};
</script>