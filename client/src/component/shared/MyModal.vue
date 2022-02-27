<template>
  <div>
    <p>
      <button @click="showModal">
        Show modal
      </button>
    </p>

    <MyModal
      v-model="isShow"
      :close="closeModal"
    >
      <div class="modal">
        <p>
          Hello
        </p>
        <button @click="closeModal">
          close
        </button>
      </div>
    </MyModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const isShow = ref(false)

    function showModal () {
      isShow.value = true
    }

    function closeModal () {
      isShow.value = false
    }

    return {
      isShow,
      showModal,
      closeModal
    }
  }
})
</script>

<style scoped lang="scss">
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>