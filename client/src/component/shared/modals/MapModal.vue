<template>
  <MyModal>
    MAP MODAL
    <template v-slot:modal="{ closeModal }">
      <button @click="closeModal" class="close-button">
        X
      </button>
      <Map 
      class="map"/>
    </template>
  </MyModal>
</template>

<script>
import Map from '../Map.vue';
import MyModal from 'src/component/shared/MyModal.vue';
import { ref, onMounted, onBeforeMount } from "vue";

export default {
  components: {
    MyModal,
    Map,
  },
}
</script>

<style scoped lang="scss">
.map{
  // display: flex;
  height: 300px;
  max-width: 600px;
  margin: 25px;
}
// temporary, need to import icon
.close-button{
  color: #d8d8d8;
  border-radius: 50% !important;
  background: #2c2c2c;
  height: 35px;
  width: 35px;
  z-index: 1001;
  position: absolute;
  top: calc(50% - 175px);
  right: calc(50% - 285px);
}
</style>