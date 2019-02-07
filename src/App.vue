<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view />
  </div>
</template>
<script>
import { detect } from "detect-browser";
const browser = detect();

export default {
  name: "App",
  created() {}
};
</script>

<style lang="scss" src="./assets/css/common.scss"></style>
