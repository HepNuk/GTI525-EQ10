<template>
    <footer>
        <Coordinates />
    </footer>
</template>

<script>
import Coordinates from 'src/component/footer/Coordinates.vue';
export default {
  components: {
    Coordinates,
  }
};

</script>

<style lang="scss" scoped>
footer {
  border: 5px solid black;
  padding: 5px;
  margin: 5px;
}
</style>