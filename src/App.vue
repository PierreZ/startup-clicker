<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script src="../node_modules/big-integer/BigInteger.min.js"></script>
<script src="../node_modules/numeral/min/numeral.min.js"></script>

<script>
export default {
  name: 'app'
}
window.bigInt = require("big-integer");
window.numeral = require('numeral');
</script>
<style src="../node_modules/spectre.css/dist/spectre.min.css"></style>
<style src="../node_modules/spectre.css/dist/spectre-icons.min.css"></style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
