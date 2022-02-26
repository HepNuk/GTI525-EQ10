<template>
  <div class="app">
    <HeaderComponent/>
    <MainContent :view="view" @change-view="changeView"/>
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
    changeView(toView) {
      this.view = toView;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/css/vars.scss";
@import "src/assets/css/styles.scss";

.app {
  margin: 0 auto;
  flex-direction: column;
  max-width: 1400px;
}

</style>
