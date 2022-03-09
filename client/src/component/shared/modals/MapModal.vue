<template>
  <MyModal>
    <Map
      :markers="filtered"
      class="map"
      @close-modal="$emit('close-modal')"
    />
  </MyModal>
</template>

<script>
import Map from '../Map.vue';
import MyModal from 'src/component/shared/MyModal.vue';
import { computed } from 'vue';

export default {
  components: {
    MyModal,
    Map,
  },
  props: {
    selected: {
      type: [Object, Boolean],
      default: undefined,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const filtered = computed(() => {
      return props.list.map((element) => {
        return {
          ...element,
          color: element.id !== props.selected.id ? 'blue' : 'red',
          selected: element.id === props.selected.id,
        };
      });
    });

    return {
      filtered,
    };
  },
};
</script>

<style scoped lang="scss">
.map {
  max-width: 45%;
  max-height: 55%;
  margin: 25px;
}
</style>
