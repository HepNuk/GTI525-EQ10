<template>
  <div class="sort">
    <p class="me-2">
      {{ title }}
    </p>

    <div class="sort-options">
      <div
        v-for="(option, key) in sortOptions"
        :key="`options-${key}`"
        class="sort-option"
      >
        <span class="px-1" @click="$emit('toggle-sort', key)">
          <span>
            {{ option }}
          </span>

          <fa
            v-if="sort.key === key && sort.direction === 'asc'"
            :style="iconStyle"
            :icon="['fa', 'chevron-down']"
          />
          <fa
            v-else-if="sort.key === key && sort.direction === 'desc'"
            :style="iconStyle"
            :icon="['fa', 'chevron-up']"
          />
          <div v-else style="width: 0.8em" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    title: {
      type: String,
      required: true,
    },

    sortOptions: {
      type: Object,
      required: true,
    },

    sort: {
      type: Object,
      required: true,
    },
  },

  computed: {
    iconStyle() {
      return {
        color: 'red',
      };
    },
  },
};
</script>

<style scoped lang="scss">
.sort {
  display: flex;
  flex-direction: row;
}
.sort-options {
  display: inline-flex;
  flex-direction: column;
}

.sort-option {
  display: inline-flex;
  flex-direction: row;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 2px;

  span {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    gap: 1rem;
  }

  span:hover {
    background: rgb(179, 179, 179);
    cursor: pointer;
  }
}
</style>
