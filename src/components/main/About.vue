<template>
  <div class="container">
    <div class="bounceInLeft">
      <p class="txt-about1 fadeInUp">놀라운 편리함, 포기 할 수 없는 아름다움</p>
      <span class="txt-about2 fadeInupRotate">\</span>
      <p class="txt-about3 fadeInUp">데일리룩 구독 서비스 줄라이</p>
      <!--<p class="txt-main-point" data-color="white">About</p>-->
      <!--<p class="txt-about">-->
        <!--놀라운 편리함,<br v-if="$mq === 'sm'"/>-->
        <!--포기 할 수 없는 아름다움<br/>-->
        <!--데일리룩 구독 서비스 줄라이-->
      <!--</p>-->
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
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0,300%,0)
    }

    to {
      opacity: 1;
      transform: none
    }
  }
  @keyframes fadeInupRotate {
    0% {
      opacity: 0;
      transform: translate3d(0,300%,0) rotate(-15deg);
    }

    to {
      opacity: 1;
      transform: translate3d(0,0,0) rotate(-15deg)
    }
  }

  .fadeInUp {
    animation-name: fadeInUp;
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }
  .fadeInupRotate {
    animation-name: fadeInupRotate;
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }
  .container {
    background: {
      image: url('/static/img/main/img_about_medium.png');
      repeat: no-repeat;
      position: 50% 0;
      size: 100% 100%;
    }
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    .txt-about1 {
      font-size: 19px;
      letter-spacing: -1.2px;
      line-height: 25px;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    }
    .txt-about2 {
      font-size: 20px;
      line-height: 30px;
      letter-spacing: -1.2px;
      font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
      font-weight: 500;
      display: block;
      animation-delay: 500ms;
    }
    .txt-about3 {
      font-size: 15px;
      line-height: 25px;
      letter-spacing: -0.8px;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      animation-delay: 1000ms;
    }
  }

  @media (min-width: 767px) {
    .container {
      background: {
        image: url('/static/img/main/img_about_large.png');
        size: auto;
      }
      height: 500px;
      width: 1200px;
      margin: 0 auto;

      .txt-about1 {
        font-size: 36px;
        line-height: 1;
        letter-spacing: -1.4px;

      }
      .txt-about2 {
        margin-top: 20px;
        margin-bottom: 27px;
        font-size: 35px;
        line-height: 1;
      }
      .txt-about3 {
        font-size: 22px;
        line-height: 1;
        letter-spacing: -0.9px;
      }
    }

  }
</style>
