<template>
  <div class="form">
    <label for="id">
      {{ label }}
    </label>
    <input
      id="id"
      type="type"
      name="id"
      required="required"
      class="input-field"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
    label: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      required: true,
      default: '',
    },
    required: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input-field {
  margin-left: 10px;
}
</style>
