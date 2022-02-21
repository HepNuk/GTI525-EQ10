<template>
  <header>
    <img class="logo" :src="logoImg" alt="" >
    <div class="message">
      <h1 class="mt-1">
        Bienvenue sur Mobi-Urbaine
      </h1>
    </div>
  </header>
</template>

<script>
import logoImg from '~/assets/img/logo.png';

export default {
  setup() {
    return {
      logoImg
    };
  },
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
  font-size: 4.5vw;
  
  @media screen and (min-width: 1200px) {
    font-size: 50px;
  }
}

</style>
