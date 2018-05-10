<template>
  <div id="videoArea" class="main-video mt30 mb15">
    <youtube
      video-id="oRPTT363lMw"
      @ready="ready"
      @stop="stop"
      @pause="pause"
      :player-vars="{autoplay: 1}">
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
    ready(player) {
      this.player = player;
      this.player.stopVideo();
    },
    stop() {
      this.player.stopVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
  },
  mounted() {
    const videoWidth = document.getElementById('videoArea').offsetWidth;
    if (videoWidth <= 486) {
      document.getElementById('youtube-player-1').style.width = `${videoWidth}px`;
      document.getElementById('youtube-player-1').style.height = '250px';
    } else if (videoWidth > 486 && videoWidth <= 1300) {
      document.getElementById('youtube-player-1').style.width = `${videoWidth}px`;
      document.getElementById('youtube-player-1').style.height = '600px';
    } else {
      document.getElementById('youtube-player-1').style.width = '1300px';
      document.getElementById('youtube-player-1').style.height = '600px';
    }
    document.getElementById('youtube-player-1').style.position = 'relative';
    document.getElementById('youtube-player-1').style.left = '50%';
    document.getElementById('youtube-player-1').style.transform = 'translate(-50%)';

    document.getElementsByClassName('ytp-gradient-top').style.zindex = 0;
  },
};
</script>

<style scoped>
.main-video {
  height: 500px;
}

.ytp-gradient-top {
  z-index: 0 !important;
}

@media screen and (max-width: 486px) {
  .main-video {
    height: 250px;
  }
}
</style>
