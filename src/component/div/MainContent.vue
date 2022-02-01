<template>
    <div class="middle-component">
      <NavBar 
        :nav-items="navBarActionItems"
        class="main-nav-bar"
        @change-view="changeViewTo"
      />

      <div class="data-view">
        <BikeCounterView
          v-if="showBikeView"
          class="main-view"
        />
        <PointOfInterestView
          v-else-if="showPointOfInterestView"
          :view="view"
          class="main-view"
        />
      </div>
    </div>
</template>

<script>
import NavBar from 'src/component/nav/NavBar.vue';
import BikeCounterView from 'src/views/dataView/BikeCounterView.vue';
import PointOfInterestView from 'src/views/dataView/PointOfInterestView.vue';

export default {
  components: {
    NavBar,
    BikeCounterView,
    PointOfInterestView,
  },

  props: {
    view: {
      type: String,
      required: true,
    }
  },

  computed: {
    showBikeView() {
      return this.view === 'bike-counter';
    },

    showPointOfInterestView() {
      return this.view.substring(0,3) === 'poi';
    },

    navBarActionItems() {
      return [
        {
          title: 'Bike Counter',
          value: 'bike-counter',
          active: (this.view === 'bike-counter'),
          action: () => this.$emit('change-view', 'bike-counter')
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
        bikeRepaire: 'poi-bike-repair',
        addPoi: 'poi-add',
      };

      return [
        {
          title: 'Water Fountain',
          value: poi.waterFountain,
          active: (this.view === poi.waterFountain),
          action: () => this.$emit('change-view', poi.waterFountain)
        },
        {
          title: 'Bike Repaire',
          value: poi.bikeRepaire,
          active: (this.view === poi.bikeRepaire),
          action: () => this.$emit('change-view', poi.bikeRepaire)
        },
        {
          title: 'Add Point of Interest',
          value: poi.addPoi,
          active: (this.view === poi.addPoi),
          action: () => this.$emit('change-view', poi.addPoi)
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

.data-view, .main-nav-bar {
  border: 2px solid black;
  padding: 5px;
  margin: 5px;
}

.data-view {
  flex-grow: 1;
}

.main-nav-bar {
  min-width: 250px;
}

</style>
