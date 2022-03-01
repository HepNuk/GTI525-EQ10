<template>
  <div>
    <MyButton
      v-bind="{
        type,
        notActiveType,
        fill,
        disabled,
        border,
        borderColor
      }"
      :active="active || activeItem"
      :hover="!(active || activeItem)"
      @click="toggleCollapsed"
    >
      <slot />
    </MyButton>
    
    <div v-if="!collapsed" class="px-3 drop-down-menu">
      <MyButton
        v-for="(option, index) in dropDownOptions"
        :key="'dropdown-' + index"
        class="my-1"
        :type="type"
        :not-active-type="notActiveType"
        :border="border"
        :border-color="borderColor"
        :fill="fill"
        :disabled="option.disabled"
        :active="option.active"
        :hover="!option.active"
        @click="option.action"
      >
        {{ option.title }}
      </MyButton>
    </div>
  </div>
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
  'pale-grey',
];


export default {
  props: {
    dropDownOptions: {
      type: Array,
      required: false,
      default: () => [],
    },

    type: {
      type: String,
      required: false,
      default: 'primary',
      validator: (value) => types.includes(value),
    },

    notActiveType: {
      type: String,
      required: false,
      default: 'secondary',
      validator: (value) => types.includes(value),
    },

    border: {
      type: Boolean,
      required: false,
      default: false,
    },

    borderColor: {
      type: String,
      required: false,
      default: '#000',
      validator: (value) => (/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/.test(value)),
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
    },
  },

  data() {
    return {
      nativeCollapsed: true,
    };
  },

  computed: {
    collapsed() {
      if (this.activeItem) {
        return false;
      }
      return this.nativeCollapsed;
    },

    activeItem() {
      const items = this.dropDownOptions.map((e) => e.active);
      if (items.some((e) => e === true)) {
        return true;
      }

      return false;
    },
  },

  methods: {
    toggleCollapsed() {
      const items = this.dropDownOptions.map((e) => e.active);

      if (!items.some((e) => e === true)) {
        this.nativeCollapsed = !this.collapsed;
      }
    },
  },
};
</script>

<style lang="scss" scopped>
</style>
