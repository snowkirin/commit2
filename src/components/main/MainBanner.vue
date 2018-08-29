<template>
  <div
    class="banner"
    v-if="isShow"
  >
    <div class="center-align">
      <p>지금 가입하시면 <span class="txt-free">첫달 무료 ♥</span></p>
    </div>
    <a href="#" class="btn-close" @click="clickBannerHide">
      <CloseIconSVG/>
    </a>
  </div>
</template>

<script>
  export default {
    name: "MainBanner",
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      clickBannerHide(event) {
        event.preventDefault();
        this.isShow = false;
      }
    }
  }
</script>

<style scoped lang="scss">

</style>