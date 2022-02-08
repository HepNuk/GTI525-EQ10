<template>
  <select v-model="newValue">
    <option :value="0" disabled selected>{{ placeholder }}</option>
    <option 
      v-for="(option, index) in options"
      :key="index"
      :value="index + 1"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '-',
    },

    options: {
      type: Array,
      required: true,
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      newValue: this.modelValue,
    };
  },

  watch: {
    newValue: {
      handler(to) {
        this.$emit('update:modelValue', to);
      }
    }
  }
};
</script>

<style lang="scss" scopped>

</style>
