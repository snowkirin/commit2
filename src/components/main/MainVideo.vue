<template>
  <div
    id="videoArea"
    class="container">
    <youtube
      style="text-align: center;"
      video-id="oRPTT363lMw"
      @ready="ready"
      @stop="stop"
      @pause="pause"
      :player-width="calcSize().width"
      :player-height="calcSize().height"
      :player-vars="{autoplay: 0}">
    </youtube>
  </div>
</template>

<script>
import Vue from 'vue';
import VueYouTubeEmbed from 'vue-youtube-embed';

Vue.use(VueYouTubeEmbed);

export default {
  name: 'main-video',
  methods: {
    ready(event) {
      this.player = event.player;
    },
    stop() {
      this.player.stopVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
    calcSize() {
      const size = {
        width: null,
        height: null,
      };
      if (this.$mq === 'sm') {
        size.width = '100%';
        size.height = 250;
      } else {
        size.width = 1200;
        size.height = 500;
      }
      return size;
    },
  },
  mounted() {
  },
};
</script>
<style scoped lang="scss">
</style>
