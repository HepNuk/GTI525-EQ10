<template>
  <div class="form">
    <label v-if="label" :for="id">
      {{ label }}
    </label>
    <input
      v-model="modelValueCopy"
      v-bind="{
        disabled,
        max,
        min,
        type,
        step,
      }"
      name="id"
      class="input-field"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: false,
      default: undefined,
    },

    id: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'text',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    min: {
      type: Number,
      default: undefined,
    },

    max: {
      type: Number,
      default: undefined,
    },

    step: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const modelValueCopy = computed({
      get: () => props.modelValue,
      set: (v) => emit('update:modelValue', v),
    });

    return { modelValueCopy };
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}
.input-field {
  margin-left: 10px;
  min-width: 75%;
}

input:invalid,
input:out-of-range {
  border: solid red 3px;
}
</style>
