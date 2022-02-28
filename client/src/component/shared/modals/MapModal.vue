<template>
  <MyModal>
    MAP MODAL
    <template v-slot:modal="{ closeModal }">
      <div class="map-modal">
        <button @click="closeModal">
          Close
        </button>
      </div>
    </template>
  </MyModal>
</template>

<script>
import MyModal from 'src/component/shared/MyModal.vue';

export default {
  components: {
    MyModal,
  }
}
</script>

<style scoped lang="scss">
.map-modal{
  display: felx;
}
</style>