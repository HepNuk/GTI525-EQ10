<template>
  <div class="add-poi-view content-view">
    <div class="content-view-header p-3">
      <h2 class="title">
        Ajouter un point d'intérêts
      </h2>
    </div>
    <div class="add-poi-form">
      <form action="" @submit.prevent="print">
        <MyInput
          id="nomLieu"
          label="Nom du lieu:"
          type="text"
          required="true"
        />
        <MyInput
          id="adresse"
          label="Adresse: "
          type="text"
        />
        <MyInput
          id="arrondissement"
          label="Arrondissement: "
          type="text"
          required="true"
        />
        <div class="input-select">
          <label>
            Type:
          </label>
          <MySelectionInput
            v-model="selectedType"
            :options="typeOptions"
            placeholder="Fontaine à boire"
          />
        </div>
        <div class="input-select">
          <label>
            Année d'établissement:
          </label>
          <MySelectionInput
            v-model="selectedYear"
            :options="yearOptions"
            placeholder="2022"
          />
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
            label="Longitude: "
            type="text"
            required="true"
          />
          <MyInput
            id="latitude"
            label="Latitude: "
            type="text"
            required="true"
          />
        </div>

        <MyInput
          id="remarques"
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
import MyInput from 'src/component/shared/MyInput.vue';
import { years } from 'src/constants';
import { ref, computed } from 'vue';

export default {
  components: {
    MyInput,
  },
  emits: ['submitCancel', 'submitSend'],

  setup(_, ctx) {
    const yearOptions = years;
    const selectedYear = ref(0);
    const typeOptions = ['Fontaine à boire', 'Réparation vélos'];
    const selectedType = ref(0);

    return {
      yearOptions,
      selectedYear,
      typeOptions,
      selectedType,
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
</style>
