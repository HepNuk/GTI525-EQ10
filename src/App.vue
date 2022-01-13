<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
  
    <img alt="logo2" :src="imgLink">
  
    <HelloWorld 
      v-if="showHelloWorld"
      class="hello-world"
      msg="Welcome to Your Vue.js App"
      :newprop="1"
      @toggle="toggleNumber"
    />
  
    <button @click="toggleNumber">
      button
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import HelloWorld from './components/HelloWorld.vue'




export default defineComponent({
  components: {
    HelloWorld
  },

  props: {
    msg: {
      type: String,
      require: false,
      default: "defauly",
    }
  },

  data() {
    return {
      anothOject: undefined,

      newObject: {
        msg: "Msg in object",
        number: 0,
        imagelink: "https://media-exp1.licdn.com/dms/image/C4E0BAQEXDYY_gLJjNQ/company-logo_200_200/0/1554827387084?e=2159024400&v=beta&t=kcXVhOwvX0h0utaYzIhpAjCOYederH9z3X6sP7mtfuE"
      }
    };
  },

  computed: {
    showHelloWorld() {
      return this.newObject.number === 10 && this.hasAdminPermission && true || true
    },

    hasAdminPermission() {
      return true;
    },

    imgLink() {
      if (this.newObject.number === 10) return  "https://media-exp1.licdn.com/dms/image/C4E0BAQEXDYY_gLJjNQ/company-logo_200_200/0/1554827387084?e=2159024400&v=beta&t=kcXVhOwvX0h0utaYzIhpAjCOYederH9z3X6sP7mtfuE"
      
      return "";
    },
  },

  mounted() {
  },

  methods: {
    toggleNumber() {
      if (this.newObject.number === 10) {
        this.newObject.number = 0
      } else {
        this.newObject.number = 10
      }
    },
  },

})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
