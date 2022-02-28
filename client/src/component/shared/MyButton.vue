<template>
  <button
    ref="btn"
    class="btn"
    :class="[btnType, btnFill, btnHover]"
    :style="[btnBorder, btnHoverColor]"
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
      validator: (value) =>
        /#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/.test(value)
    },

    border: {
      type: Boolean,
      required: false,
      default: false
    },

    fill: {
      type: Boolean,
      required: false,
      default: false
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    hoverColor: {
      type: String,
      required: false,
      default: '#EEE',
      validator: (value) =>
        /#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/.test(value)
    },

    hover: {
      type: Boolean,
      required: false,
      default: true
    },

    active: {
      type: Boolean,
      required: false,
      default: true
    },

    routerLink: {
      type: String,
      required: false,
      default: null
    }
  },

  computed: {
    btnType() {
      return 'btn-' + (this.active ? this.type : this.notActiveType);
    },

    btnFill() {
      return this.fill ? 'fill' : '';
    },

    btnBorder() {
      return this.border
        ? {
            borderWidth: '2px',
            borderColor: this.borderColor
          }
        : { borderWidth: '0px' };
    },

    btnHoverColor() {
      return this.hover
        ? {
            '--color-hover': this.hoverColor
          }
        : {};
    },

    btnHover() {
      return this.hover ? 'button-hover' : '';
    }
  }
};
</script>

<style lang="scss" scopped>
@import 'src/assets/css/vars.scss';

button {
  cursor: pointer;
  border-radius: 0px !important;
}

.btn-pale-grey {
  background-color: $pale-grey;
}

.fill {
  display: block;
  width: 100%;
  text-align: center;
}

.button-hover:hover {
  background-color: var(--color-hover) !important;
}
</style>
