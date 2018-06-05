<template>
  <div class="about">
    <div>
      <p class="en-font txt-about-title">About</p>
      <p v-if="$mq === 'sm'" class="txt-about">
        놀라운 편리함,<br/>
        포기 할 수 없는 아름다움<br/>
        데일리룩 구독 서비스 줄라이
      </p>
      <p v-else class="txt-about">
        놀라운 편리함, 포기 할 수 없는 아름다움<br/>
        데일리룩 구독 서비스 줄라이
      </p>
      <!--<a href="#" class="tc-white">서비스 상세 소개</a>-->
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
    padding: 20px;
    display: flex;
    align-items: flex-end;
    color: #fff;
    .txt-about-title {
      font-size: 14px;
      font-weight: 800;
      line-height: 28px;
      text-transform: uppercase;
      letter-spacing: 0;
    }
    .txt-about {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: -.5px;
      text-shadow: 0px -1px 0 rgba(0, 0, 0, 0.1);
    }
  }
  @media (min-width: 768px){
    .about {
      height: 500px;
      background-image: url('/static/img/main/img_about_large.png');
      background-repeat: no-repeat;
      background-position: 50% 0;
      background-color: #fff;
    }
  }
  .mt70 {
    margin-top: 63px !important;
  }

  .about-description {
    padding-top: 287px !important;
  }

  .main-about-detail {
    width: 1200px;
    margin: auto;
  }

  .main-about-service {
    line-height: 2.56;
    letter-spacing: -0.2px;
    text-align: left;
    color: #ffffff;
  }

  .main-about-title {
    font-size: 26px;
    letter-spacing: -1.4px;
    text-align: left;
    color: #ffffff;
  }

  @media screen and (max-width: 486px) {
    .mt70 {
      margin-top: 35px !important;
    }

    .about-description {
      padding-top: 100px !important;
    }

    .main-about {
      display: table;
      background-image: url('/static/img/main/img_about_medium.png');
      height: 250px;
      background-size: cover;
      background-size: 100% 100%;
    }

    .main-about-detail {
      display: table-cell;
      vertical-align: middle;
    }

    .main-about-title {
      letter-spacing: -1.2px;
      font-size: 18px !important;
      line-height: 1.4;
    }

    .pd120 {
      padding-top: 0 !important;
    }
  }
</style>
