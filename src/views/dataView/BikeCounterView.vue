<template>
  <div class="bike-counter-view">
    <p class="title">
      Comptages de vélos
    </p>
    <p class="sort">
      I am SORT
    </p>
    <MyTable 
      class="table"
    />
  </div>
</template>

<script>
import MyTable from 'src/component/shared/MyTable.vue';
export default {
  components: {
    MyTable,
  },
};

</script>

<style lang="scss" scoped>
  .bike-counter-view{
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }
  .title{
    font-weight: bold;
    text-decoration: underline;
    margin: 0;
    grid-column: 1/3;
    grid-row: 1;
  }
  .table{
    grid-area: 2/1/4/4;
  }
</style>