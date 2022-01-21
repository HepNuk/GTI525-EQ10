<template>
    <div class="middle-component">
      <div class="data-view">
        <p>
          LEFT PART
        </p>
      </div>
      <div class="menu-view">
        <p>
          RIGHT PART
        </p>
      </div>
    </div>
</template>

<script>
export default {
}

</script>

<style lang="scss" scoped>
    .middle-component{
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      width: 100%;
      border: 5px solid black;
      padding: 5px;
      margin: 5px;
    }

    .data-view, .menu-view{
      width: 100%;
      border: 2px solid black;
      padding: 5px;
      margin: 5px;
    }
</style>