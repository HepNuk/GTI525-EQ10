<template>
  <div class="my-radio-choices mx-2" :class="direction">
    <div
      v-for="({ value, label }, index) in options"
      :key="value"
      class="radio-choice d-flex"
      style="flex-direction: row; justify-content: space-between; width: 100%"
    >
      <input
        :id="value + index"
        :checked="modelValue === value"
        :value="value"
        :name="value + index"
        :disabled="disabled"
        type="radio"
        @change="$emit('update:modelValue', $event.target.value)"
      />

      <label
        :for="value + index"
        style="margin-right: auto"
        class="ms-3"
        :class="modelValue === value ? 'selected' : ''"
      >
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: 0,
    },

    options: {
      type: Array,
      default: () => [],
    },

    direction: {
      type: String,
      default: 'vertical',
      validate: (v) => ['horizontal', 'vertical'].includes(v),
    },

    disabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scopped>
.radio-choice {
  cursor: pointer;

  input,
  label {
    cursor: pointer;
  }

  .selected {
    text-decoration: underline;
  }
}
.my-radio-choices {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 0;
}
</style>
