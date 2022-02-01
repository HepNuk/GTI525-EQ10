<template>
  <div>
    <h1>
      This is POINT OF INTEREST view 
    </h1>
    <div class="ms-2">
      <strong>
        {{ view }}
      </strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    view: {
      type: String,
      required: true,
    }
  }
};

</script>

<style lang="scss" scoped>

</style>