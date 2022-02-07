<template>
  <div class="stats-view">
    <p class="title">
      Statistique du compteur
    </p>
    <form action="" class="form">
    <p>
      Plage de dates
    </p>
        <label for="de">De: </label>
        <input type="text" id="de" name="annee" placeholder="[Annee]">
        <input type="text" id="de" name="mois" placeholder="[Mois]">
        <input type="text" id="de" name="jour" placeholder="[Jour]"><br><br>
        <label for="a">A: </label>
        <input type="text" id="a" name="annee" placeholder="[Annee]">
        <input type="text" id="a" name="mois" placeholder="[Mois]">
        <input type="text" id="a" name="heure" placeholder="[Heure]">
    </form>

    <MyButton
      fill
      class="submitButton"
    >
      "Afficher resultat"
    </MyButton>
  </div>
</template>

<script>
export default {
};

</script>

<style lang="scss" scoped>
.stats-view{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 650px;
  height: 250px;
  text-align: center;
  border: 5px solid black;
}
.title{
  font-weight: bold;
  text-decoration: underline;
  padding-left: 50px;
  padding-right: 50px;
}
.form{
  text-align: left;
  padding: 5px;
  margin: 10px;
}
</style>