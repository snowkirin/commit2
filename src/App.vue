<template>
  <div id="app" class="wrap">
    <Header />
    <div class="container">
      <router-view />
    </div>
    <Footer/>
  </div>
</template>
<script>
import { detect } from "detect-browser";
const browser = detect();

import Header from "@/components/Common/Header.vue";
import Footer from '@/components/Common/Footer.vue';
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  created() {}
};
</script>
<style lang="scss" src="./assets/css/common.scss"></style>
<style lang="scss" scoped>
  .container {
    padding: 5%;
  }
</style>
