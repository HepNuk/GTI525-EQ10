<template>
  <div>
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <Modal v-model="isShow" :close="closeModal">
      <div class="modal">
        <slot :closeModal="closeModal" />
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['show-modal', 'close-modal', 'submit'],

  setup(_, ctx) {
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
