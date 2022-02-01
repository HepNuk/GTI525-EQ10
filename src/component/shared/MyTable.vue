<template>
  <table class="table table-striped">
    <tr class="table-header">
      <th v-for="(col, colIndex) in header" :key="`col-${colIndex}`">
        {{ col }}
      </th>
    </tr>
    <tr v-for="(row, rowIndex) in data" :key="`row-${rowIndex}`">
      <td v-for="(value, colIndex) in row" :key="`col-${colIndex}-row-${rowIndex}`">
        {{ value }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    header: {
      type: Array,
      required: true,
    },

    data: {
      type: Array,
      required: true,
    }
  }
};

</script>

<style lang="scss" scoped>
table{
  width: 100%;

  th {
    background: #ddd;
  }

  td, th { 
    text-align: center;
  }

  margin: 0;
}
</style>