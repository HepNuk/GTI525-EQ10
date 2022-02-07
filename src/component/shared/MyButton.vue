<template>
  <button
    ref="btn"
    class="btn"
    :class="[btnType, btnFill]"
    :style="[btnBorder, btnHover]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>
const types = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
  'link',
  'pale-grey'
];

export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'dark',
      validator: (value) => types.includes(value)
    },

    notActiveType: {
      type: String,
      required: false,
      default: 'secondary',
      validator: (value) => types.includes(value)
    },

    borderColor: {
      type: String,
      required: false,
      default: '#000',
      validator: (value) => (/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/.test(value))
    },

    border: {
      type: Boolean,
      required: false,
      default: false,
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

    hover: {
      type: Boolean,
      required: false,
      default: true,
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
    },

    btnBorder() {
      return (this.border ? {
        borderWidth: '2px',
        borderColor: this.borderColor 
      } : {});
    },

    btnHover() {
      return (this.hover ? {
        '--color-hover': '#EEE',
      }: {});
    },
  }
};
</script>

<style lang="scss" scopped>
@import "src/assets/css/vars.scss";

button { 
  cursor: pointer;
}

button:hover {
  background-color: var(--color-hover);
}

.btn-pale-grey {
  background-color: $pale-grey;
}

.fill {
  display: block;
  width: 100%;
  text-align: center;
}

// .btn-border {
//   border-width: 2px;
//   border-color: #000;
// }
</style>
