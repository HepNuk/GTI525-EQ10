<template>
  <div class="add-poi-view content-view">
    <div class="content-view-header p-3">
      <MapSelectModal
        :is-show="!!showModal"
        @close-modal="closeModal"
        @coord-selected="inputLatLng"
      />
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
          <fa
            class="open-map-button"
            icon="map-marker-alt"
            style="color: red"
            @click="openModal"
          />
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
            step="0.0001"
          />
          <MyInput
            id="latitude"
            v-model="enteredLatitude"
            label="Latitude: "
            type="number"
            :min="-90"
            :max="90"
            step="0.0001"
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
import { years, pointOfIntrestTypes } from 'src/constants';
import { ref, computed, watch } from 'vue';
import { createNewPointOfInterest } from 'src/utils/Services';
import MapSelectModal from 'src/component/shared/modals/MapSelectModal.vue';

export default {
  components: {
    MapSelectModal,
  },
  setup(_, ctx) {
    const yearOptions = years;
    const selectedYear = ref(1);
    const typeOptions = [
      pointOfIntrestTypes.fountain,
      pointOfIntrestTypes.atelier,
    ];
    const selectedType = ref(1);
    const enteredAdresse = ref('');
    const enteredArrondissement = ref('');
    const enteredLieu = ref('');
    const enteredLongitude = ref(undefined);
    const enteredLatitude = ref(undefined);
    const enteredRemarques = ref('');

    const showModal = ref(undefined);
    const openModal = () => {
      return (showModal.value = true);
    };
    const coordinatesArray = [45.5017, 73.5673];
    const closeModal = () => {
      showModal.value = false;
    };

    function resetValues() {
      enteredLieu.value = '';
      enteredAdresse.value = '';
      enteredArrondissement.value = '';
      selectedType.value = 1;
      selectedYear.value = 1;
      enteredLongitude.value = undefined;
      enteredLatitude.value = undefined;
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
        return pointOfIntrestTypes.fountain;
      if (typeOptions[selectedType.value - 1] === typeOptions[1])
        return pointOfIntrestTypes.atelier;

      return '';
    });

    function inputLatLng(value) {
      enteredLongitude.value = value.lng;
      enteredLatitude.value = value.lat;
    }

    const missingRequiredValue = computed(() => {
      const missingFields = [];

      if (type.value === pointOfIntrestTypes.fountain) {
        if (!enteredLieu.value) missingFields.push('nom du lieu');
        if (!enteredArrondissement.value) missingFields.push('adresse');
        if (!yearOptions[selectedYear.value - 1])
          missingFields.push('année d\'établiséement');
        if (!enteredLongitude.value) missingFields.push('longitude');
        if (!enteredLatitude.value) missingFields.push('latitude');
      } else if (type.value === pointOfIntrestTypes.atelier) {
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
        Nom_parc_lieu: enteredLieu.value,
        Intersection: enteredAdresse.value,
        Arrondissement: enteredArrondissement.value,
        Type: type.value,
        Date_instalation: yearOptions[selectedYear.value - 1],
        Longitude: enteredLongitude.value,
        Latitude: enteredLatitude.value,
        Remarque: enteredRemarques.value,
      };

      if (missingRequiredValue.value.length > 0) {
        const msg = `Il manque les champs suivants:\n - ${missingRequiredValue.value.join(
          '\n - '
        )}`;
        alert(msg);
      } else {
        createNewPointOfInterest(data).then((res) => {
          resetValues();
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
      openModal,
      showModal,
      coordinatesArray,
      missingRequiredValue,
      closeModal,
      inputLatLng,
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
.open-map-button {
  cursor: pointer;
}
</style>
