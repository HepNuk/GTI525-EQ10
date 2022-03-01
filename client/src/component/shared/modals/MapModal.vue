<template>
  <MyModal>
    MAP MODAL
    <template v-slot:modal="{ closeModal }">
      <button @click="closeModal" class="close-modal">
        X
      </button>
      <!-- Leaflet Map -->
      <div id="map"></div>
    </template>
  </MyModal>
</template>

<script>
import MyModal from 'src/component/shared/MyModal.vue';
import leaflet from "leaflet";
import { onMounted } from "vue";

export default {
  components: {
    MyModal,
  },
  setup() {
    let map;

    onMounted(()=> {
      map = leaflet.map('map').setView([51.505, -0.09], 13);

      leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW1lZXZlZW1pIiwiYSI6ImNsMDdpdm5vNDAzbjczYnA4enhuY21oNzgifQ.2AuMVwa3lUU3W6SdVSnLow', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiaW1lZXZlZW1pIiwiYSI6ImNsMDdpdm5vNDAzbjczYnA4enhuY21oNzgifQ.2AuMVwa3lUU3W6SdVSnLow'
      }).addTo(map); 
    });
  },
}
</script>

<style scoped lang="scss">
#map{
  // display: flex;
  height: full;
}
// temporary, need to import icon
.close-modal{
  color: #d8d8d8;
  border-radius: 50% !important;
  background: #2c2c2c;
  height: 35px;
  width: 35px;
  align-self: right;
}
</style>