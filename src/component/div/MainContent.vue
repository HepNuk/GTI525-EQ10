<template>
    <div class="middle-component">
      <NavBar 
        class="main-nav-bar"
      />
      <div class="data-view">
        <BikeCounterView
          v-if="view === 'bike-counter'"
          class="main-view"
        />
        <PointOfIntresView
          v-else-if="view === 'poi'"
          class="main-view"
        />
      </div>
    </div>
</template>

<script>
import NavBar from 'src/component/nav/NavBar.vue';
import BikeCounterView from 'src/views/dataView/BikeCounterView.vue';
import PointOfIntresView from 'src/views/dataView/PointOfIntresView.vue';

export default {
  components: {
    NavBar,
    BikeCounterView,
    PointOfIntresView,
  },

  props: {
    view: {
      type: String,
      required: true,
    }
  }
};

</script>

<style lang="scss" scoped>
  .middle-component{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    right: 0;
    border: 5px solid black;
    padding: 5px;
    margin: 5px;
    min-height: 10rem;
  }

  .data-view, .main-nav-bar{
    right: 0;
    border: 2px solid black;
    padding: 5px;
    margin: 5px;
  }

  .data-view{
    flex-grow: 1;
  }
</style>