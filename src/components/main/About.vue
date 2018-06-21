<template>
  <div class="about">
    <div>
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
    background-size: 100% 100%;
    padding: 20px 20px 17px 19px;
    display: flex;
    align-items: flex-end;
    color: #fff;
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
