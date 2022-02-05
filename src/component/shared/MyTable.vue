<template>
  <table class="table table-striped">
    <tr class="table-header">
      <template v-if="filteredHeader">
        <th v-for="(col, key) in filteredHeader" :key="`col-${key}`">
          {{ col }}
        </th>
      </template>
      <template v-else>      
        <th v-for="(col, colIndex) in header" :key="`col-${colIndex}`">
          {{ col }}
        </th>
      </template>
    </tr>
    
    <tr v-for="(row, rowIndex) in data" :key="`row-${rowIndex}`">
      <template v-if="filteredHeader">
        <td v-for="(value, key) in filteredHeader" :key="`col-${key}-row-${rowIndex}`">
          {{ row[key] }}
        </td>
      </template>
      <template v-else>
        <td v-for="(value, colIndex) in row" :key="`col-${colIndex}-row-${rowIndex}`">
          {{ value }}
        </td>
      </template>
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
    },

    filteredHeader: {
      type: Object,
      required: false,
      default: undefined
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