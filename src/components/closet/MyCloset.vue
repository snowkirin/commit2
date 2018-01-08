<template>
  <div >
    <ul class="ui secondary  menu">
      <li class="item " role="presentation" v-bind:class="[ isMyCloset ? 'active' : '' ]">
        <a href="#myCloset" @click="doMyCloset('MyCloset')">나의 옷장</a>
      </li>
      <li class="item " role="presentation" v-bind:class="[ isNowCloset ? 'active' : '' ]">
        <a href="#nowCloset" @click="doMyCloset('NowCloset')">현재의 옷장</a>
      </li>
      <li class="item " role="presentation" v-bind:class="[ isTomorrowCloset ? 'active' : '' ]">
        <a href="#tomorrowCloset" @click="doMyCloset('TomorrowCloset')">내일의 옷장</a>
      </li>
    </ul>
    </br>
    <div>
        <component v-bind:is="getClosetView"></component>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import MyCloset from '@/components/closet/MyCloset';
import NowCloset from '@/components/closet/NowCloset';
import TomorrowCloset from '@/components/closet/TomorrowCloset';

export default {
  name: 'closet',
  components: {
    MyCloset,
    NowCloset,
    TomorrowCloset,
  },
  computed: mapGetters([
    'getClosetView',
    'isMyCloset',
    'isNowCloset',
    'isTomorrowCloset',
  ]),
  methods: {
    ...mapActions([
      'setClosetView',
    ]),
    doMyCloset(targetView = 'MyCloset') {
      this.$store.dispatch('setClosetView', targetView);
    },
  },
};
</script>
<style  scoped>
  a {
    color: #000000;
  }
</style>
