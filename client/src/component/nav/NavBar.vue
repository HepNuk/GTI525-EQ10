<template>
  <nav>
    <ul class="nav gap-1">
      <li 
        v-for="navItem in navItems"
        :key="navItem.value"
        class="nav-item d-grid"
      >
        <template v-if="navItem.dropDownOptions">
          <DropDownButton
            :drop-down-options="navItem.dropDownOptions"
            type="dark"
            not-active-type="pale-grey"
            border
            border-color="#333"
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
          type="dark"
          not-active-type="pale-grey"
          border
          border-color="#333"
          :hover="!navItem.active"
          :active="navItem.active"
          @click="navItem.action"
        >
          {{ navItem.title }}
        </MyButton>
      </li>
    </ul>
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
  margin-left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>