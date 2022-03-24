<template>
  <div class="add-poi-view content-view">
    <div class="content-view-header p-3">
      <h2 class="title">
        Ajouter un point d'intérêts
      </h2>
    </div>
    <div class="add-poi-form">
      <form action="">
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
        <!-- <MySelectionInput :options="options" placeholder="Fontaine à boire" /> -->
        <MyInput
          id="coordinates"
          label="Coordonnée géographiques: "
          type="text"
        />
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

  setup(_, ctx) {},
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
</style>
