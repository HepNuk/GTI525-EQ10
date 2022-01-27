<template>
  <header>
    <img class="logo" src="https://images.everydayhealth.com/images/diet-nutrition/34da4c4e-82c3-47d7-953d-121945eada1e00-giveitup-unhealthyfood.jpg?sfvrsn=a31d8d32_0" alt="" >
    <div class="message">
      <h1 class="mt-1">
        Bienvenue sur Mobi-Urbaine
      </h1>
    </div>
  </header>
</template>

<script>
export default {
};

</script>

<style lang="scss" scoped>
header{
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  border: 5px solid black;
  padding: 5px;
  margin: 5px;
}

.logo, .message{
  max-height: 5rem;
  border: 2px solid black;
  padding: 5px;
  margin: 5px;
}

.message{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  max-height: 5rem;
  flex-grow: 1;
}

h1 {
  font-family: "Gill Sans", sans-serif;
  font-size: 3.8vw;
}

</style>
