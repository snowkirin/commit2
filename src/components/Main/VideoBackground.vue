<template>
  <div class="video-wrapper">
    <vue-plyr ref="plyr" :crossorigin="true" :options="options" class="video">
      <video src="@/assets/files/video-1080p.mp4"></video>
    </vue-plyr>
  </div>
</template>

<script>
export default {
  name: "VideoBackground",
  data() {
    return {
      options: {
        autoplay: true,
        loop: {
          active: true
        }
      }
    };
  }
};
</script>

<style scoped lang="scss">
.video-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  .video {
    position: absolute;
    width: 100%;
    height: 100%;
    /deep/ .plyr--video {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
