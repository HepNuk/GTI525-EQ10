<template>
  <div class="stats-view p-3">
    <div class="title">
      <h5>
        Statistique du compteur
      </h5>

      <span @click="$emit('close')">
        <fa icon="times" />
      </span>
    </div>

    <div class="input-section mb-3">
      <span class="ms-2 mb-2">
        Plage de dates
      </span>

      <div class="input-line from-inputs mb-1">
        <label for="de">De: </label>
        <MySelectionInput v-model="fromYear" :options="options.years" placeholder="Année"/>
        <MySelectionInput v-model="fromMonth" :options="options.months" placeholder="Mois"/>
        <MySelectionInput v-model="fromDay" :options="fromDays" placeholder="Jours"/>
      </div>

      <div class="input-line to-inputs px-2">
        <label for="a">A: </label>
        <MySelectionInput v-model="toYear" :options="options.years" placeholder="Année"/>
        <MySelectionInput v-model="toMonth" :options="options.months" placeholder="Mois"/>
        <MySelectionInput v-model="toDay" :options="toDays" placeholder="Jours"/>
      </div>
    </div>

    <MyButton
      hover-color="#555"
      fill
      @click="submit"
    >
      Afficher resultat
    </MyButton>
  </div>
</template>

<script>
import MySelectionInput from 'src/component/shared/MySelectionInput.vue';
import { years, months, days } from 'src/constants';

export default {
  components: {
    MySelectionInput
  },

  data() {
    return {
      fromYear: 0,
      fromMonth: 0,
      fromDay: 0,
      
      toYear: 0,
      toMonth: 0,
      toDay: 0,
    };
  },

  computed: {
    options() {
      return {
        years: years,
        months: months,
        days: days,
      };
    },

    fromDays() {
      if (this.fromMonth === 0) return [];
      let fromSlice = this.options.months[this.fromMonth].days;

      if (this.fromMonth === 'feb'
        && this.options.years[this.fromYear-1] !== 0
        && Number(this.options.years[this.fromYear-1]) % 4 === 0) {
        
        fromSlice = 29;
      }
      
      return days.slice(0, fromSlice);
    },

    toDays() {
      if (this.toMonth === 0) return [];
      let toSlice = this.options.months[this.toMonth].days;

      if (this.toMonth === 'feb'
        && this.options.years[this.toYear-1] !== 0
        && Number(this.options.years[this.toYear-1]) % 4 === 0) {
        
        toSlice = 29;
      }

      return days.slice(0, toSlice);
    },

    selectedValues() {
      return {
        fromYear: this.options.years[this.fromYear-1],
        fromMonth: this.fromMonth,
        fromDay: this.options.days[this.fromDay-1],
        
        toYear: this.options.years[this.toYear-1],
        toMonth: this.toMonth,
        toDay: this.options.days[this.toDay-1],
      };
    }
  },

  methods: {
    submit() {
      console.log(
        'fromYear: ', this.selectedValues.fromYear,
        '\nfromMonth: ', this.selectedValues.fromMonth,
        '\nfromDay: ', this.selectedValues.fromDay,
        '\ntoYear: ', this.selectedValues.toYear,
        '\ntoMonth: ', this.selectedValues.toMonth,
        '\ntoDay: ', this.selectedValues.toDay,
      );
    }
  }
};

</script>

<style lang="scss" scoped>
@import "src/assets/css/vars.scss";

.title {
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;

  h5 {
    font-weight: bold;
  }

  span {
    padding-right: 2px;
    padding-left: 2px;
    
    &:hover {
      cursor: pointer;
      background-color: $pale-grey;
    }
  }
}

.stats-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  flex-grow: 1;
}

.input-section {
  display: inline-flex;
  flex-direction: column;
}

.input-line {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.3rem;

  label {
    width: 35px;
    text-align: left;
  }
}
</style>