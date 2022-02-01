<template>
  <div>
    <MyButton
      v-bind="{
        type,
        notActiveType,
        fill,
        disabled
      }"
      :active="active || activeItem"
      @click="toggleCollapsed"
    >
      <slot />
    </MyButton>
    
    <div class="px-3 drop-down-menu" v-if="!collapsed">
      <MyButton
        v-for="(option, index) in dropDownOptions"
        :key="'dropdown-' + index"
        class="my-1"
        :type="option.type"
        :not-active-type="option.notActiveType"
        :fill="fill"
        :disabled="option.disabled"
        :active="option.active"
        @click="option.action"
      >
        {{ option.title }}
      </MyButton>
    </div>
  </div>
</template>

<script>
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
    }
  },

  methods: {
    toggleCollapsed() {
      const items = this.dropDownOptions.map((e) => e.active);

      if (!items.some((e) => e === true)) {
        this.nativeCollapsed = !this.collapsed;
      }
    },
  }
};
</script>

<style lang="scss" scopped>
.drop-down-menu {
  // border-style: solid;
}
</style>
