<template>
    <div class="middle-component">
      <NavBar 
        :nav-items="navBarActionItems"
        class="nav-view"
        @change-view="changeViewTo"
      />

      <div class="data-view">
        <!-- Bike Counter View -->
        <BikeCounterView
          v-if="showBikeView"
          class="main-view"
        />

        <!-- Point of interests -->
        <FountainView
          v-else-if="showWaterFountainView"
          class="main-view"
        />
        <BikeRepairView
          v-else-if="showBikeRepairView"
          class="main-view"          
        />
        <AddIntPointView
          v-else-if="showAddIntPointView"
          class="main-view"
        />
      </div>
    </div>
</template>

<script>
import NavBar from 'src/component/nav/NavBar.vue';
import BikeCounterView from 'src/views/BikeCounterView.vue';
import FountainView from 'src/views/FountainView.vue';
import BikeRepairView from 'src/views/BikeRepairView.vue';
import AddIntPointView from 'src/views/AddIntPointView.vue';

const views = {
  bikeCounter: 'bike-counter',
  waterFountain: 'poi-water-fountain',
  bikeRepair: 'poi-bike-repair',
  addPoi: 'poi-add',
};

export default {
  components: {
    NavBar,
    BikeCounterView,
    FountainView,
    BikeRepairView,
    AddIntPointView,
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
          title: 'Bike Counter',
          value: views.bikeCounter,
          active: (this.view === views.bikeCounter),
          action: () => this.$emit('change-view', views.bikeCounter)
        },
        {
          title: 'Point of Interest',
          dropDownOptions: this.pointOfInterestDropDownOptions,
        }
      ];
    },

    pointOfInterestDropDownOptions() {
      const poi = {
        waterFountain: 'poi-water-fountain',
        bikeRepair: 'poi-bike-repair',
        addPoi: 'poi-add',
      };

      return [
        {
          title: 'Water Fountain',
          value: views.waterFountain,
          active: (this.view === views.waterFountain),
          action: () => this.$emit('change-view', views.waterFountain)
        },
        {
          title: 'Bike Repair',
          value: views.bikeRepair,
          active: (this.view === views.bikeRepair),
          action: () => this.$emit('change-view', views.bikeRepair)
        },
        {
          title: 'Add Point of Interest',
          value: views.addPoi,
          active: (this.view === views.addPoi),
          action: () => this.$emit('change-view', views.addPoi)
        }
      ];
    } 
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
