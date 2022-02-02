<template>
  <button
    ref="btn"
    class="btn"
    :class="[btnType, btnFill]"
    :disabled="disabled"
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

    notActiveType: {
      type: String,
      required: false,
      default: 'secondary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info' , 'light', 'dark', 'link'].includes(value)
    },

    fill: {
      type: Boolean,
      required: false,
      default: false,
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },

    active: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  
  computed: {
    btnType() {
      if (this.active) {
        return 'btn-' + this.type;
      }
      return 'btn-' + this.notActiveType;
    },

    btnFill() {
      if (this.fill) {
        return 'fill';
      }

      return '';
    }
  }
};
</script>

<style lang="scss" scopped>
button { 
  cursor: pointer;
}


.fill {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
