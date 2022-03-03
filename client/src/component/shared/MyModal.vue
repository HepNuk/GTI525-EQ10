<template>
  <div>
    <Modal
      v-model="isShow"
      :close="closeModal"
    >
      <div class="modal">
        <slot name="modal" :closeModal="closeModal"/>
      </div>
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['show-modal', 'close-modal', 'submit'],

  props: {
    isShow: {
      type: Boolean,
      required: true,
    }
  },

  setup (props, ctx) {

    function showModal () {
      ctx.emit('show-modal', true)
    }

    function closeModal () {
      ctx.emit('close-modal', false)
    }

    return {
      // isShow,
      showModal,
      closeModal
    }
  }
};

</script>

<style scoped lang="scss">
.modal {
  width: full;
  height: full;
  background-color: transparent !important;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>