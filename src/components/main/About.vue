<template>
  <div class="container">
    <div>
      <p class="txt-main-point" data-color="white">About</p>
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
  .container {
    background: {
      image: url('/static/img/main/img_about_medium.png');
      repeat: no-repeat;
      position: 50% 0;
      size: 100% 100%;
    }
    height: 250px;
    display: flex;
    align-items: flex-end;
    padding: 20px 20px 17px 19px;
    .txt-about {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: -.5px;
      color: #fff;
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
      border-top: 2px solid #333;
      padding: 0 0 33px 39px;
      .txt-main-point {
        margin-left: 2px;
        margin-bottom: 15px;
      }
      .txt-about {
        font-size: 26px;
        line-height: 36px;
        letter-spacing: -0.8px;
      }
    }

  }
</style>
