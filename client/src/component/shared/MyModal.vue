<template>
  <div>
    <Modal v-model="isShow" :close="closeModal">
      <div class="modal">
        <slot name="modal" :closeModal="closeModal" />
      </div>
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['show-modal', 'close-modal', 'submit'],

  setup(props, ctx) {
    function showModal() {
      ctx.emit('show-modal', true);
    }

    function closeModal() {
      ctx.emit('close-modal', false);
    }

    return {
      showModal,
      closeModal,
    };
  },
};
</script>

<style scoped lang="scss">
.modal {
  width: full;
  height: full;
  background-color: transparent !important;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
