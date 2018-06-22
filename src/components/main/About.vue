<template>
  <div class="about">
    <div class="about-inner">
      <p class="txt-main-point" data-color="white">About</p>
      <!--<p v-if="$mq === 'lg'" class="txt-about">
        놀라운 편리함, 포기 할 수 없는 아름다움<br/>
        데일리룩 구독 서비스 줄라이
      </p>-->
      <p class="txt-about">
        놀라운 편리함,<br v-if="$mq === 'sm'"/>
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
    height: 250px;
    background-repeat: no-repeat;
    background-position: 50% 0;
    display: flex;
    align-items: flex-end;
    color: #fff;
    background-color: #fff;
    // 임시
    background-size: cover;
  }
  .about-inner {
    padding: 20px 20px 17px 19px;
  }
  .txt-about {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -.5px;
    text-shadow: 0px -1px 0 rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1279px){
    .about {
      height: 500px;
      background-image: url('/static/img/main/img_about_large.png');
      background-size: auto;
    }
    .about-inner {
      width: 1280px;
      margin: 0 auto;
      padding: 35px 41px 35px 39px;
    }
    .txt-main-point {
      margin-left: 2px;
      margin-bottom: 10px;
    }
    .txt-about {
      font-size: 26px;
      line-height: 36px;
      letter-spacing: -0.8px;
    }
  }
</style>
