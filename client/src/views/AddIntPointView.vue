<template>
  <div class="add-poi-view content-view">
    <div class="content-view-header p-3">
      <h2 class="title">
        Ajouter un point d'intérêts
      </h2>
    </div>
    <div class="add-poi-form">
      <form @submit.prevent>
        <MyInput
          id="nomLieu"
          v-model="enteredLieu"
          label="Nom du lieu:"
          type="text"
        />

        <MyInput
          id="adresse"
          v-model="enteredAdresse"
          :disabled="type === 'Fontaine à boire'"
          label="Adresse: "
          type="text"
        />

        <MyInput
          id="arrondissement"
          v-model="enteredArrondissement"
          label="Arrondissement: "
          type="text"
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

        <div class="geo-coordinates">
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
            type="number"
            :min="-90"
            :max="90"
          />
          <MyInput
            id="latitude"
            v-model="enteredLatitude"
            label="Latitude: "
            type="number"
            :min="-90"
            :max="90"
          />
        </div>

        <MyInput
          id="remarques"
          v-model="enteredRemarques"
          label="Remarques: "
          type="text"
        />
      </form>
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
    </div>
  </div>
</template>

<script>
import { years } from 'src/constants';
import { ref, computed, watch } from 'vue';
import { createNewPointOfInterest } from 'src/utils/Services';

export default {
  setup(_, ctx) {
    const yearOptions = years;
    const selectedYear = ref(1);
    const typeOptions = ['Fontaine à boire', 'Atelier de réparation vélo'];
    const selectedType = ref(1);
    const enteredAdresse = ref('');
    const enteredArrondissement = ref('');
    const enteredLieu = ref('');
    const enteredLongitude = ref(0);
    const enteredLatitude = ref(0);
    const enteredRemarques = ref('');

    function resetValues() {
      enteredLieu.value = '';
      enteredAdresse.value = '';
      enteredArrondissement.value = '';
      selectedType.value = 1;
      selectedYear.value = 1;
      enteredLongitude.value = 0;
      enteredLatitude.value = 0;
      enteredRemarques.value = '';
    }

    watch(enteredLongitude, () => {
      if (enteredLongitude.value > 90) {
        enteredLongitude.value = 90;
      } else if (enteredLongitude.value < -90) {
        enteredLongitude.value = -90;
      }
    });

    watch(enteredLatitude, () => {
      if (enteredLatitude.value > 90) {
        enteredLatitude.value = 90;
      } else if (enteredLatitude.value < -90) {
        enteredLatitude.value = -90;
      }
    });

    const type = computed(() => {
      if (typeOptions[selectedType.value - 1] === typeOptions[0])
        return 'Fontaine à boire';
      if (typeOptions[selectedType.value - 1] === typeOptions[1])
        return 'Atelier de réparation vélo';

      return '';
    });

    const missingRequiredValue = computed(() => {
      const missingFields = [];

      if (type.value === 'Fontaine à boire') {
        if (!enteredLieu.value) missingFields.push('nom du lieu');
        if (!enteredArrondissement.value) missingFields.push('adresse');
        if (!yearOptions[selectedYear.value - 1])
          missingFields.push('année d\'établiséement');
        if (!enteredLongitude.value) missingFields.push('longitude');
        if (!enteredLatitude.value) missingFields.push('latitude');
      } else if (type.value === 'Atelier de réparation vélo') {
        if (!enteredLieu.value) missingFields.push('nom du lieu');
        if (!enteredAdresse.value) missingFields.push('adresse');
        if (!enteredArrondissement.value) missingFields.push('arrondissement');
        if (!enteredLongitude.value) missingFields.push('longitude');
        if (!enteredLatitude.value) missingFields.push('latitude');
      }

      return missingFields;
    });

    function submitCancel() {
      resetValues();
    }

    function submitSend() {
      const data = {
        nom_lieu: enteredLieu.value,
        adreesse: enteredAdresse.value,
        arrondissement: enteredArrondissement.value,
        type: type.value,
        annee_instalation: yearOptions[selectedYear.value - 1],
        longitude: enteredLongitude.value,
        latitude: enteredLatitude.value,
        remarques: enteredRemarques.value,
      };

      if (missingRequiredValue.value.length > 0) {
        const msg = `Il manque les champs suivants:\n - ${missingRequiredValue.value.join(
          '\n - '
        )}`;
        alert(msg);
      } else {
        createNewPointOfInterest(data).then((res) => {
          resetValues();
          console.log(res);
        });
      }
    }

    return {
      type,
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
      submitSend,
      submitCancel,
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
.geo-coordinates {
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
