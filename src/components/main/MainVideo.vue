<template>
  <div id="videoArea" class="video">
    <youtube
      style="text-align: center;"
      v-if="$common.getServerMode()!=='production'"
      video-id="oRPTT363lMw"
      @ready="ready"
      @stop="stop"
      @pause="pause"
      :player-width="calcSize().width"
      :player-height="calcSize().height"
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
      // this.player.stopVideo();
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
      } else if (this.$mq === 'md') {
        size.width = 768;
        size.height = 300;
      } else if (this.$mq === 'lg') {
        size.width = 1200;
        size.height = 600;
      }
      return size;
    },
  },
  mounted() {
    // if (this.$common.getServerMode() !== 'production') {
    //   const videoWidth = document.getElementById('videoArea').offsetWidth;
    //   if (videoWidth <= 486) {
    //     document.getElementById('youtube-player-1').style.width = `${videoWidth}px`;
    //     document.getElementById('youtube-player-1').style.height = '250px';
    //   } else if (videoWidth > 486 && videoWidth <= 1300) {
    //     document.getElementById('youtube-player-1').style.width = `${videoWidth}px`;
    //     document.getElementById('youtube-player-1').style.height = '600px';
    //   } else {
    //     document.getElementById('youtube-player-1').style.width = '1200px';
    //     document.getElementById('youtube-player-1').style.height = '600px';
    //   }
    //   document.getElementById('youtube-player-1').style.position = 'relative';
    //   document.getElementById('youtube-player-1').style.left = '50%';
    //   document.getElementById('youtube-player-1').style.transform = 'translate(-50%)';
    //
    //   document.getElementById('videoArea').classList.add('main-video');
    // } else {
    //   document.getElementById('videoArea').classList.add('main-image');
    // }
  },
};
</script>

<style scoped lang="scss">
/*.main-video {
  height: 600px;
}

.main-image {
  height: 420px;
  background-image: url('/static/img/main/img_play_large.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 0;
}

@media screen and (max-width: 486px) {
  .main-video {
    height: 250px;
  }

  .main-image {
    background-image: url('/static/img/main/img_play_medium.png');
    height: 210px;
  }
}*/
</style>
