<template>
  <nav class="nav nav-pills gap-1">
    <li 
      v-for="navItem in navItems"
      :key="navItem.value"
      class="nav-item d-grid"
    >
      <!-- For later use -->
      <!-- <template v-if="navItem.dropDown">
        <MyButton 
          :active="navItem.active"
          @click="$emit('change-view', navItem.value)"
        >
          {{ navItem.title }}
        </MyButton>

        <li style="display: flex; flex-direction: column;" v-if="navItem.active">
          <MyButton>
            Test 1
          </MyButton>

          <MyButton>
            Test 2
          </MyButton>
        </li>
      </template> -->

      <MyButton 
        fill
        :active="navItem.active"
        @click="$emit('change-view', navItem.value)"
      >
        {{ navItem.title }}
      </MyButton>
    </li>
  </nav>
</template>

<script>
export default {
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