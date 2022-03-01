<template>
  <div class="middle-component">
    <NavBar :nav-items="navBarActionItems" class="nav-view" />

    <div class="data-view">
      <router-view class="main-view" />
    </div>
  </div>
</template>

<script>
import NavBar from 'src/component/nav/NavBar.vue';

const views = {
  bikeCounter: 'BikeCounter',
  waterFountain: 'Fountain',
  bikeRepair: 'BikeRepair',
  addPoi: 'AddIntPoint'
};

export default {
  components: {
    NavBar
  },

  computed: {
    navBarActionItems() {
      return [
        {
          title: 'Comptages de vélos',
          value: views.bikeCounter,
          active: this.$route.name === views.bikeCounter,
          action: () => this.$router.push({ name: views.bikeCounter })
        },
        {
          title: 'Points d\'intérêt',
          dropDownOptions: this.pointOfInterestDropDownOptions
        }
      ];
    },

    pointOfInterestDropDownOptions() {
      return [
        {
          title: 'Fontaines à boire',
          value: views.waterFountain,
          active: this.$route.name === views.waterFountain,
          action: () => this.$router.push({ name: views.waterFountain })
        },
        {
          title: 'Réparation vélos',
          value: views.bikeRepair,
          active: this.$route.name === views.bikeRepair,
          action: () => this.$router.push({ name: views.bikeRepair })
        },
        {
          title: 'Ajouter un point d\'intérêt',
          value: views.addPoi,
          active: this.$route.name === views.addPoi,
          action: () => this.$router.push({ name: views.addPoi })
        }
      ];
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

.data-view,
.nav-view {
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
