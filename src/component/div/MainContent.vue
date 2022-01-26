<template>
    <div class="middle-component">
      <NavBar />
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
    .data-view{
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      width: 100%;
      border: 5px solid black;
      padding: 5px;
      margin: 5px;
    }

    .main-view{
      width: 100%;
      border: 2px solid black;
      padding: 5px;
      margin: 5px;
    }
</style>