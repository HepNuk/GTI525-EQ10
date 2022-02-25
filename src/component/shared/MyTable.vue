<template>
  <div class="table-container mb-0" :class="limitHeightClass">
    <div class="table-scroll pt-1">
      <table class="table table-sm table-striped">
        <thead class="table-dark">
          <tr>
            <template v-if="filteredHeader">
              <th 
                v-for="(col, key) in filteredHeader" 
                :key="`col-${key}`" 
                :style="columnSettings ? columnSettings[key] : ''"
              >
                {{ col }}
              </th>
            </template>
            <template v-else>      
              <th v-for="(col, colIndex) in header" :key="`col-${colIndex}`">
                {{ col }}
              </th>
            </template>

            <th v-if="actionButtons" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in paginatedData" :key="`row-${rowIndex}`">
            <template v-if="filteredHeader">
              <td 
                v-for="(value, key) in filteredHeader"
                :key="`col-${key}-row-${rowIndex}`"
                :style="columnSettings ? columnSettings[key] : ''"
              >
                {{ row[key] }}
              </td>
            </template>
            <template v-else>
              <td v-for="(value, colIndex) in row" :key="`col-${colIndex}-row-${rowIndex}`">
                {{ value }}
              </td>
            </template>

            <td class="table-action-buttons" v-if="actionButtons">
              <div :key="'action-' + index" v-for="(action, index) in actionButtons">
                <template v-if="action.type === 'icon'">
                  <span @click="action.click(row)">
                    <fa 
                      :icon="action.icon"
                      color="red"
                    />
                    {{ action.text ? action.text : '' }}
                  </span>
                </template>

                <template v-else-if="action.type === 'text'">
                  <span 
                    class="text-action-button"
                    @click="action.click(row)" 
                  >
                    {{ action.text }}
                  </span>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="paginate" class="table-page mt-2">
        <MyButton
          type="light"
          hover-color="#999"
          hover
          :disabled="page <= 1"
          @click="page = page - 1"
        >
          <fa icon="chevron-left" />
        </MyButton>

        <input v-model="page" type="number" :min="1" :max="maxPage" placeholder="page"/> 
        <span>/ {{ maxPage }}</span>

        <MyButton
          type="light"
          hover-color="#999"
          hover
          :disabled="page >= maxPage"
          @click="page = page + 1"
        >
          <fa icon="chevron-right" />
        </MyButton>
      </div>
    </div>

    <hr v-if="showBottomSeparator" class="my-2">
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
    },

    actionButtons: {
      type: Array,
      required: false,
      default: () => undefined,
    },

    paginate: {
      type: Number,
      required: false,
      default: undefined,
    },

    columnSettings: {
      type: Object,
      required: false,
      default: () => {}
    },

    showBottomSeparator: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  data() {
    return {
      page: 1,
    };
  },

  computed: {
    limitHeightClass() {
      return this.limitHeight ? 'limit-height' : '';
    },

    paginatedData() {
      if (!this.paginate) {
        return this.data;
      }

      const startIndex = (this.page - 1) * this.paginate;
      const endIndex = (this.paginate > this.data.length) ? this.data.length : (this.page * this.paginate);

      return this.data.slice(startIndex, endIndex);
    },

    maxPage() {
      return Math.ceil(this.data.length / this.paginate);
    }
  },
};

</script>

<style lang="scss" scoped>
table {
  td, th { 
    text-align: center;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .table-action-buttons {
    display: flex;
    padding-right: 1em;

    flex-direction: row;
    justify-content: space-evenly;
    cursor: pointer;

    .text-action-button {
      color: black;
      
      &:hover {
        text-decoration: underline;
      }
    }

    span:hover {
        text-decoration: underline;
    }
  }
}

.table-scroll {
  overflow-x: auto;
}

.table-page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number]{
    border: 1px solid #cacaca;
    font-size: 14px;
    line-height: 25px;
    padding: 0 4px;
    width: 35px;
    margin-right: 0px;
    text-align: center;
    max-height: 25px;

    -moz-appearance: textfield;
  }
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