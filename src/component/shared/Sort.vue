<template>
  <div>

    <p>Trier par: </p>

    <section>
      <label>ID</label>
      <MyButton
          @click="sortByType('id')"
      />
      <br>

      <label>Nom</label>
      <MyButton
          @click="sortByType('name')"
      />
      <br>

      <label>Statut</label>
      <MyButton
          @click="sortByType('status')"
      />
      <br>

      <label>Année Implanté</label>
      <MyButton
          @click="sortByType('year')"
      />
      <br>
    </section>
  </div>
</template>

<script>
import MyButton from "./MyButton";
import MyTable from "./MyTable";

export default {
  components: {MyTable, MyButton},

  props: {
    data: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {
      current_button: 'id',
      current_sort: '',
      dataArray: this.data,
    };
  },

  methods: {
    sortByType(id) {
      if (id === 'id') {
        this.updateCurrentValue(id)
      } else if (id === 'name') {
        this.updateCurrentValue(id)
      } else if (id === 'status') {
        this.updateCurrentValue(id)
      } else {
        this.updateCurrentValue(id)
      }
      this.sortArray(id)
    },

    sortArray(id) {
      this.dataArray.sort((a, b) => {
            if (id === 'id') {
              a = a.ID
              b = b.ID
            } else if (id === 'name') {
              a = a.Nom
              b = b.Nom
            } else if (id === 'status') {
              a = a.Statut
              b = b.Statut
            } else {
              a = a.Annee_implante
              b = b.Annee_implante
            }

            if (this.current_sort === 'asc') {
              if (a < b) {
                return -1
              }
              if (a > b) {
                return 1
              }
              return 0
            } else {
              if (a > b) {
                return -1
              }
              if (a < b) {
                return 1
              }
              return 0
            }
          }
      )
    },

    updateCurrentValue(value) {
      if (this.current_button === value) {
        if (this.current_sort === 'asc') {
          this.current_sort = 'desc'
        } else {
          this.current_sort = 'asc'
        }
      } else {
        this.current_button = value
        this.current_sort = 'asc'
      }
    }
  }
}


</script>

<style lang="scss" scoped>
div {
  display: flex;
}

p {
  padding-right: 25px;
}

label {
  width: 125px;
  text-align: left;
  padding-right: 10px;
}

</style>