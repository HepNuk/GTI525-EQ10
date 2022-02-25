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
        <MySelectionInput v-model="fromDay" :options="fromDaysArray" placeholder="Jours"/>
      </div>

      <div class="input-line to-inputs px-2">
        <label for="a">A: </label>
        <MySelectionInput v-model="toYear" :options="options.years" placeholder="Année"/>
        <MySelectionInput v-model="toMonth" :options="options.months" placeholder="Mois"/>
        <MySelectionInput v-model="toDay" :options="toDaysArray" placeholder="Jours"/>
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

import { ref, computed } from 'vue';

export default {
  emits: ['close', 'submit'],

  components: {
    MySelectionInput
  },

  setup(_, ctx) {
    const fromYear = ref(0);
    const fromMonth = ref(0);
    const fromDay = ref(0);
    const toYear = ref(0);
    const toMonth = ref(0);
    const toDay = ref(0);

    const options = computed(() => {
      return {
        years: years,
        months: months,
        days: days,
      };
    });

    const fromDaysArray = computed(() => {
      if (fromMonth.value === 0) return [];
      let fromSlice = options.value.months[fromMonth.value].days;

      if (fromMonth.value === 'feb'
        && options.value.years[fromYear.value-1] !== 0
        && Number(options.value.years[fromYear.value-1]) % 4 === 0) {
        
        fromSlice = 29;
      }
      
      return days.slice(0, fromSlice);
    });

    const toDaysArray = computed(() => {
      if (fromMonth.value === 0) return [];
      let fromSlice = options.value.months[fromMonth.value].days;

      if (fromMonth.value === 'feb'
        && options.value.years[fromYear.value-1] !== 0
        && Number(options.value.years[fromYear.value-1]) % 4 === 0) {
        
        fromSlice = 29;
      }
      
      return days.slice(0, fromSlice);
    });

    const submit = () => ctx.emit('submit', {
      fromYear: options.value.years[fromYear.value-1],
      fromMonth: fromMonth.value === 0 ? undefined : fromMonth.value,
      fromDay: options.value.days[fromDay.value-1],
      
      toYear: options.value.years[toYear.value-1],
      toMonth: toMonth.value === 0 ? undefined : toMonth.value,
      toDay: options.value.days[toDay.value-1],
    });

    return {
      fromYear,
      fromMonth,
      fromDay,
      toYear,
      toMonth,
      toDay,
      options,
      fromDaysArray,
      toDaysArray,

      submit,
    };
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