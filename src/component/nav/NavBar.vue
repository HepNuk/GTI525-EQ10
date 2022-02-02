<template>
  <nav class="nav nav-pills gap-1">
    <li 
      v-for="navItem in navItems"
      :key="navItem.value"
      class="nav-item d-grid"
    >
      <!-- For later use -->
      <template v-if="navItem.dropDownOptions">
        <DropDownButton
          :drop-down-options="navItem.dropDownOptions"
          :active="false"
          fill
          @change-view="$emit('change-view', $event)"
        >
          {{ navItem.title }}
        </DropDownButton>
      </template>

      <MyButton
        v-else
        fill
        :active="navItem.active"
        @click="navItem.action"
      >
        {{ navItem.title }}
      </MyButton>
    </li>
  </nav>
</template>

<script>
import DropDownButton from 'src/component/shared/DropDownButton.vue';

export default {
  components: {
    DropDownButton,
  },

  props: {
    navItems: {
      type: Array,
      required: true,
    }
  },
};

</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>