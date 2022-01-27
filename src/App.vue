<template>
  <div class="app">
    <HeaderComponent/>
    <MainContent :view="view" />
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderComponent from './component/header/HeaderComponent.vue';
import MainContent from './component/div/MainContent.vue';
import FooterComponent from './component/footer/FooterComponent.vue';
export default {
  components: {
    HeaderComponent,
    MainContent,
    FooterComponent
  },

  props: {
  
  },

  data() {
    return {
      view: 'bike-counter',
    };
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

.app {
  right: 0;
}

</style>
