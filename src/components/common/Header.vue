<template>
  <header>
    <div class="navbar-custom-header">
      <div class="navbar-main center">
        <span id="zuly" class="navbar-main-title">Zuly</span>
      </div>
      <div class="navbar-links">
        <button class="navbar-toggle collapsed" type="button" @click="setGnb">
          <span class="sr-only">네비게이션 끄기/켜기</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="navbar-alarm">
        <span class="glyphicon glyphicon-bell"></span>
      </div>
    </div>
    <gnb-menu></gnb-menu>
    <div class="gnb-guard" v-bind:class="{ 'blind': !isGnb }" @click="setCloseGnb"></div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GnbMenu from '@/components/common/GnbMenu';

export default {
  name: 'zuly-header',
  components: {
    GnbMenu,
  },
  computed: mapGetters([
    'isGnb',
  ]),
  methods: {
    ...mapActions([
      'setGnb',
      'setCloseGnb',
    ]),
    setGnb() {
      this.$store.dispatch('setGnb');
    },
    setCloseGnb() {
      this.$store.dispatch('setCloseGnb');
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 50px;
}

div.navbar-custom-header {
  background-color: #FFFFFF;
  padding: 0;
  display: flex;
  max-width: none;
  height: 50px;
  position: relative;
  margin: 0 auto;
  border-bottom: 1px solid;
}

span.navbar-main-title {
  font-weight: bold;
  font-size: 28px;
  text-align: center;
}

div.navbar-main {
  position: absolute;
  height: auto;
  top: 15%;
  left: 42%;
}

div.navbar-alarm {
  position: absolute;
  font-size: 29px;
  top: 22%;
  left: 90%;
}

div.gnb-guard {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 110;
}

.navbar-toggle .icon-bar + .icon-bar {
  margin-top: 6px;
}

.icon-bar {
  background-color: #000000;
}
</style>
