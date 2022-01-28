<template>
    <div class="middle-component">
      <NavBar 
        :nav-items="navBarActionItems"
        class="main-nav-bar"
        @change-view="changeViewTo"
      />

      <div class="data-view">
        <BikeCounterView
          v-if="view === 'bike-counter'"
          class="main-view"
        />
        <PointOfInterestView
          v-else-if="view === 'poi'"
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
    navBarActionItems() {
      return [
        {
          title: 'Bike Counter',
          value: 'bike-counter',
          active: (this.view === 'bike-counter'),
        },
        {
          title: 'Point of Interest',
          value: 'poi',
          active: (this.view === 'poi'),
          dropDown: true,
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
  min-width: 200px;
}

</style>
