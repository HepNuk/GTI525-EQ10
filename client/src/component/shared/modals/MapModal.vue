<template>
  <MyModal>
    MAP MODAL
    <template v-slot:modal="{ closeModal }">
      <button @click="$emit('close-modal')" class="close-button">
        X
      </button>
      <Map 
      :markers="filtered"
      :center-coordinates="center"
      class="map"/>
    </template>
  </MyModal>
</template>

<script>
import Map from '../Map.vue';
import MyModal from 'src/component/shared/MyModal.vue';
import { computed } from "vue";
import Leaflet from "leaflet";
import { localeData } from 'moment';

export default {
  components: {
    MyModal,
    Map,
  },
  props: {
    selected: {
      type: Object,
      default: undefined,
    },
    list: {
      type: Array,
      default: ()=>[],
    },
  },

  setup(props){
    console.log(props.selected);
    
      // const center = computed(()=>{
      //   const centerLat = 0;
      //   const centerLon = 0;
      //   for(let i = 0; i< props.list.length; i++){
      //     centerLat += props.list[i].latitude;
      //     centerLon += props.list[i].longitude;
      //   }
      //   return [centerLat, centerLon];
      // });

    const filtered = computed(()=>{
      return props.list.map((element)=>{
        return {...element, color: (element.id !== props.selected.id)? 'blue': 'red', ref: (element.id === props.selected.id)? 'selected': ''};
      });
    });

    // const center = computed(()=>{
    //   return props.list.reduce((coord, props)=>{
    //     return coord + props.list.latitude;
    //   });
    // });

    // const center = computed(()=>{
    //   let lat = 0;
    //   let long = 0;
    //   for (let key in props.items){
    //     lat += props.items[key].latitude;
    //     long += props.items[key].longitude;
    //   }

    //   return [lat, long];
    // });

    return {
      filtered,
      // center,
    };
    
  },
};
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