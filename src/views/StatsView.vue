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
        <MySelectionInput v-model="fromHour" :options="options.hours" placeholder="Heure"/>
      </div>

      <div class="input-line to-inputs px-2">
        <label for="a">A: </label>
        <MySelectionInput v-model="toYear" :options="options.years" placeholder="Année"/>
        <MySelectionInput v-model="toMonth" :options="options.months" placeholder="Mois"/>
        <MySelectionInput v-model="toHour" :options="options.hours" placeholder="Heure"/>
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
import { years, months, hours } from 'src/constants';

export default {
  components: {
    MySelectionInput
  },

  data() {
    return {
      fromYear: 0,
      fromMonth: 0,
      fromHour: 0,
      
      toYear: 0,
      toMonth: 0,
      toHour: 0,
    };
  },

  computed: {
    options() {
      return {
        years: years,
        months: months,
        hours: hours,
      };
    },
  },

  methods: {
    submit() {
      console.log(
        'fromYear: ', this.options.years[this.fromYear-1],
        '\nfromMonth: ', this.options.months[this.fromMonth-1],
        '\nfromHour: ', this.options.hours[this.fromHour-1],
        '\ntoYear: ', this.options.years[this.toYear-1],
        '\ntoMonth: ', this.options.months[this.toMonth-1],
        '\ntoHour: ', this.options.hours[this.toHour-1]
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