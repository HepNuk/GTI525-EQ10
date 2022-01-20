<template>
  <div class="app">
    <HeaderComponent/>
    it works.
    GButton === g-button
    <GTIButton>test</GTIButton>
  </div>
</template>

<script>
import HeaderComponent from './component/header/HeaderComponent.vue'
export default {
  components: {
    HeaderComponent,
  },

  props: {
  
  },

  data() {
    return {

    }
  },

  computed: {

  },

  mounted() {

  },

  methods: {

  }
};
</script>

<style lang="scss">
@import "./assets/css/vars.scss";
@import "./assets/css/styles.scss";

</style>
