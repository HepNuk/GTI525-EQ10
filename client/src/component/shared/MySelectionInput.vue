<template>
  <select v-model="newValue">
    <option
      v-if="placeholder"
      :value="0"
      disabled
      selected
    >
      {{ placeholder }}
    </option>

    <!-- options => [2022, 2021, ..] -->
    <template v-if="Array.isArray(options)">
      <option
        v-for="(option, i) in options"
        :key="i"
        :value="i + 1"
      >
        {{ option }}
      </option>
    </template>

    <template v-else>
      <option
        v-for="(option, key) in options"
        :key="key"
        :value="key"
      >
        {{ option.name }}
      </option>
    </template>
  </select>
</template>

<script>
import { computed } from 'vue';
export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },

    options: {
      type: [Array, Object],
      required: true,
    },
  },

  emits: ['update:modelValue'],
  setup(props, ctx) {
    const newValue = computed({
      get: () => props.modelValue,
      set: (v) => ctx.emit('update:modelValue', v),
    });

    return { newValue };
  },
};
</script>

<style lang="scss" scopped></style>
