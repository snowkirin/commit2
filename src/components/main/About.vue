<template>
  <div class="about">
    <div>
      <p class="en-font txt-about-title">About</p>
      <!--<p v-if="$mq === 'sm'" class="txt-about">-->
      <p class="txt-about">
        놀라운 편리함,<br/>
        포기 할 수 없는 아름다움<br/>
        데일리룩 구독 서비스 줄라이
      </p>
    </div>
  </div>

</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      outerWidth: window.outerWidth,
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
  .about {
    background-image: url('/static/img/main/img_about_medium.png');
    /*height: 250px;*/
    height: 78.125vw;
    background-size: 100% 100%;
    /*padding: 20px;*/
    padding: 6.25vw;
    display: flex;
    align-items: flex-end;
    color: #fff;
    .txt-about-title {
      /*font-size: 14px;*/
      font-size: 4.375vw;
      font-weight: 800;
      /*line-height: 28px;*/
      line-height: 8.75vw;
      text-transform: uppercase;
      letter-spacing: 0;
    }
    .txt-about {
      /*font-size: 18px;*/
      font-size: 5.625vw;
      /*line-height: 24px;*/
      line-height: 7.5vw;
      letter-spacing: -.5px;
      text-shadow: 0px -1px 0 rgba(0, 0, 0, 0.1);
    }
  }
  @media (min-width: 768px){
    /*.about {*/
      /*height: 500px;*/
      /*background-image: url('/static/img/main/img_about_large.png');*/
      /*background-repeat: no-repeat;*/
      /*background-position: 50% 0;*/
      /*background-color: #fff;*/
    /*}*/
  }
</style>
