<template>
  <div class="app">
    <HeaderComponent />
    <MainContent />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './component/header/HeaderComponent.vue';
import MainContent from './component/content/MainContent.vue';
import FooterComponent from './component/footer/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    MainContent,
    FooterComponent,
  },
};
</script>

<style lang="scss">
@import 'src/assets/css/vars.scss';
@import 'src/assets/css/styles.scss';

.app {
  margin: 0 auto;
  flex-direction: column;
  max-width: 1400px;
}
</style>
