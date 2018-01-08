<template>
  <nav class="gnb-menu" v-bind:class="{ 'blind': !isGnb }">
    <div class="gnb-content">
      <div class="gnb-content-detail">
        Side Menu
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'gnb-menu',
  computed: mapGetters([
    'isGnb',
  ]),
};
</script>

<style scoped>
nav.gnb-menu {
  position: fixed;
  bottom: 0;
  top: 0;
  width: 84%;
  background-color: #021f23;
  z-index: 9999;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition: all ease-in-out 0.3s;
  transition: all ease-in-out 0.3s;  
}

nav.gnb-menu .open {
  transform: translate3d(0, 0, 0);
}

div.gnb-content {
  display: table;
  width: 100%;
  height: 100%;
}

div.gnb-content-detail {
  display: table-cell;
  color: white;
  vertical-align: middle;
  text-align: center;
}
</style>