<template>
  <div class="main-video mt30 mb15">
  </div>
</template>

<script>
export default {
  name: 'main-video',
};
</script>

<style scoped>
.main-video {
  height: 420px;
  background-image: url('/static/img/main/img_play_large.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 0;
}

@media screen and (max-width: 486px) {
  .main-video {
    background-image: url('/static/img/main/img_play_medium.png');
    height: 210px;
  }
}
</style>
