<template>
    <div class="middle-component">
      <NavBar 
        :nav-items="navBarActionItems"
        class="nav-view"
        @change-view="changeViewTo"
      />

      <div class="data-view">
        <router-view class="main-view" />
      </div>
    </div>
</template>

<script>
import NavBar from 'src/component/nav/NavBar.vue';
import { testAxios } from 'src/utils/services'; 

const views = {
  bikeCounter: 'BikeCounter',
  waterFountain: 'Fountain',
  bikeRepair: 'BikeRepair',
  addPoi: 'AddIntPoint',
};

export default {
  components: {
    NavBar,
  },

  props: {
    view: {
      type: String,
      required: true,
    }
  },

  computed: {
    showBikeView() {
      return this.view === views.bikeCounter;
    },
    showWaterFountainView(){
      return this.view === views.waterFountain;
    },
    showBikeRepairView(){
      return this.view === views.bikeRepair;
    },
    showAddIntPointView(){
      return this.view === views.addPoi;
    },

    navBarActionItems() {
      return [
        {
          title: 'Comptages de vélos',
          value: views.bikeCounter,
          active: this.$route.name === views.bikeCounter,
          action: () => this.$router.push({ name: views.bikeCounter})
        },
        {
          title: 'Points d\'intérêt',
          dropDownOptions: this.pointOfInterestDropDownOptions,
        }
      ];
    },

    pointOfInterestDropDownOptions() {
      return [
        {
          title: 'Fontaines à boire',
          value: views.waterFountain,
          active: (this.$route.name === views.waterFountain),
          action: () => this.$router.push({ name: views.waterFountain })
        },
        {
          title: 'Réparation vélos',
          value: views.bikeRepair,
          active: (this.$route.name === views.bikeRepair),
          action: () => this.$router.push({ name: views.bikeRepair })
        },
        {
          title: 'Ajouter un point d\'intérêt',
          value: views.addPoi,
          active: (this.$route.name === views.addPoi),
          action: () => this.$router.push({ name: views.addPoi })
        }
      ];
    } 
  },

  mounted() {
    // Help example for Ai-Vi
    testAxios().then((res) => {
      console.log(res)
    })
  },

  methods: {
    changeViewTo(toView) {
      if (this.view !== toView) {
        this.$emit('change-view', toView);
      }
    }
  }
};

</script>

<style lang="scss" scoped>
.middle-component {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 5px solid black;
  padding: 5px;
  margin: 5px;
  min-height: 10rem;
}

.data-view, .nav-view{
  border: 2px solid black;
  padding: 5px;
  margin: 5px;
  flex-grow: 1;
}

.nav-view {
  min-width: 250px;
  max-width: 250px;
}

.data-view {
  max-width: 1100px;
  flex-grow: 1;
}
</style>
