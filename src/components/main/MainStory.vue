<template>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StoryAbout from '@/components/main/story/StoryAbout';
import StoryProcess from '@/components/main/story/StoryProcess';

export default {
  name: 'main-story',
  components: {
    StoryAbout,
    StoryProcess,
  },
  computed: mapGetters([
    'getStoryView',
    'isAbout',
    'isProcess',
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

.nav>li>a {
  padding: 2px 15px;
  border-radius: 60px;
}

a {
  color: #000000;
}
</style>
