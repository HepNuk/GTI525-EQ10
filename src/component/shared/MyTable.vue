<template>
  <div :class="limitHeightClass">
    <div class="table-scroll">
      <table class="table table-sm table-striped">
        <thead class="table-dark">
          <tr>
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
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  </div>
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
    },

    limitHeight: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  computed: {
    limitHeightClass() {
      return this.limitHeight ? 'limit-height' : '';
    }
  }
};

</script>

<style lang="scss" scoped>
table {

  td, th { 
    text-align: center;
  }

  margin: 0;
}

.table-scroll {
  overflow-x: auto;
}

.limit-height {
  position: relative;

  .table-scroll {
    max-height: 540px;
    overflow: auto;
  }

  table {
    width: 100%;

    thead {
      position: sticky;
      top:0;
    }
  }
}
</style>