<template>
  <button
    :class="`btn btn-${type}`"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info' , 'light', 'dark', 'link'].includes(value)
    },
  },
};
</script>

<style lang="scss" scopped>

</style>
