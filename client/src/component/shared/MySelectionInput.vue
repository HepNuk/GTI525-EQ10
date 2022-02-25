<template>
  <select v-model="newValue">
    <option :value="0" disabled selected>{{ placeholder }}</option>
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
      type: [Array, Object],
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
  },
};
</script>

<style lang="scss" scopped>

</style>
