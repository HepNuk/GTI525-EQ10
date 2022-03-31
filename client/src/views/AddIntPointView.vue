<template>
  <div class="add-poi-view content-view">
    <div class="content-view-header p-3">
      <h2 class="title">
        Ajouter un point d'intérêts
      </h2>
    </div>
    <div class="add-poi-form">
      <form @submit.prevent="print">
        <MyInput
          id="nomLieu"
          v-model="enteredLieu"
          label="Nom du lieu:"
          type="text"
          required="true"
        />
        <MyInput
          id="adresse"
          v-model="enteredAdresse"
          label="Adresse: "
          type="text"
        />
        <MyInput
          id="arrondissement"
          v-model="enteredArrondissement"
          label="Arrondissement: "
          type="text"
          required="true"
        />
        <div class="input-select">
          <label class="input-type">
            Type:
          </label>
          <MySelectionInput v-model="selectedType" :options="typeOptions" />
        </div>
        <div class="input-select">
          <label class="input-year">
            Année d'établissement:
          </label>
          <MySelectionInput v-model="selectedYear" :options="yearOptions" />
        </div>
        <div class="geoCoordinates">
          <label>
            Coordonée géographiques:
          </label>
          <fa icon="map-marker-alt" style="color: red" />
          <label>
            ou
          </label>
          <MyInput
            id="longitude"
            v-model="enteredLongitude"
            label="Longitude: "
            type="text"
            required="true"
          />
          <MyInput
            id="latitude"
            v-model="enteredLatitude"
            label="Latitude: "
            type="text"
            required="true"
          />
        </div>
        <MyInput
          id="remarques"
          v-model="enteredRemarques"
          label="Remarques: "
          type="text"
          required="false"
        />
        <div class="btn-option">
          <MyButton
            hover-color="#555"
            fill
            @click="submitCancel"
          >
            Annuler
          </MyButton>
          <MyButton
            hover-color="#555"
            fill
            @click="submitSend"
          >
            Envoyer
          </MyButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { years } from 'src/constants';
import { ref, computed } from 'vue';

export default {
  emits: ['submitCancel', 'submitSend'],

  setup(_, ctx) {
    const yearOptions = years;
    const selectedYear = ref(1);
    const typeOptions = ['Fontaine à boire', 'Réparation vélos'];
    const selectedType = ref(1);
    const enteredAdresse = ref('');
    const enteredArrondissement = ref('');
    const enteredLieu = ref('');
    const enteredLongitude = ref('');
    const enteredLatitude = ref('');
    const enteredRemarques = ref('');

    function print() {
      console.log(
        'Lieu: ',
        enteredLieu.value,
        'Adresse: ',
        enteredAdresse.value,
        'Arrondissement: ',
        enteredArrondissement.value,
        'Type: ',
        typeOptions[selectedType.value],
        'Annee: ',
        years[selectedYear.value],
        'Longitude: ',
        enteredLongitude.value,
        'Latitude: ',
        enteredLatitude.value,
        'Remarques: ',
        enteredRemarques.value
      );
    }

    return {
      yearOptions,
      selectedYear,
      typeOptions,
      selectedType,
      enteredAdresse,
      enteredArrondissement,
      enteredLieu,
      enteredLatitude,
      enteredLongitude,
      enteredRemarques,
      print,
    };
  },
};
</script>

<style lang="scss" scoped>
.add-poi-form {
  margin: 10px;
}
.btn-option {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
}
.geoCoordinates {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.input-select .input-type {
  margin: 0px 225px 10px 0px;
}

.input-select .input-year {
  margin: 0px 97px 10px 0px;
}
</style>
