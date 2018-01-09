<template>
<<<<<<< HEAD
<div class="ui centered grids container">
  <h3 >Zuly Story</h3>
    <ul class="ui secondary menu centered grid">
      <li class="item" role="presentation" v-bind:class="[ isAbout ? 'active' : '' ]">
        <a href="#about" @click="doStoryView('About')">About</a>
      </li>
      <li class="item" role="presentation" v-bind:class="[ isProcess ? 'active' : '' ]">
        <a href="#process" @click="doStoryView('Process')">Process</a>
      </li>
    </ul>
  </br>
  <div class="zuly-story-content">
    <component v-bind:is="getStoryView"></component>
  </div>
</div>
=======
  <div class="zuly-main-story">
    <h3>Zuly Story</h3>
    <ul class="nav nav-pills custom-story-nav">
      <li role="presentation" v-bind:class="[ isAbout ? 'active' : '' ]">
        <a href="#about" @click="doStoryView('About')">About</a>
      </li>
      <li role="presentation" v-bind:class="[ isProcess ? 'active' : '' ]">
        <a href="#process" @click="doStoryView('Process')">Process</a>
      </li>
      <li role="presentation" v-bind:class="[ isPrice ? 'active' : '' ]">
        <a href="#price" @click="doStoryView('Price')">Price</a>
      </li>      
    </ul>
    <div class="zuly-story-content">
      <br/><br/><br/><br/>
      <component v-bind:is="getStoryView"></component>
    </div>
  </div>
>>>>>>> first commit
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StoryAbout from '@/components/main/story/StoryAbout';
<<<<<<< HEAD
=======
import StoryPrice from '@/components/main/story/StoryPrice';
>>>>>>> first commit
import StoryProcess from '@/components/main/story/StoryProcess';

export default {
  name: 'main-story',
  components: {
    StoryAbout,
    StoryProcess,
<<<<<<< HEAD
=======
    StoryPrice,
>>>>>>> first commit
  },
  computed: mapGetters([
    'getStoryView',
    'isAbout',
    'isProcess',
<<<<<<< HEAD
=======
    'isPrice',
>>>>>>> first commit
  ]),
  methods: {
    ...mapActions([
      'setStoryView',
    ]),
    doStoryView(targetView = 'About') {
      this.$store.dispatch('setStoryView', targetView);
    },
  },
};
</script>

<style scoped>
div.zuly-main-story {
  display: table;
  width: 100%;
}

ul.custom-story-nav {
  display: table;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

<<<<<<< HEAD
.nav>li>a {
=======
.nav > li > a {
>>>>>>> first commit
  padding: 2px 15px;
  border-radius: 60px;
}

a {
  color: #000000;
}
<<<<<<< HEAD
</style>
=======

.nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {
  background-color: rgb(173, 68, 133);
}
</style>
>>>>>>> first commit
