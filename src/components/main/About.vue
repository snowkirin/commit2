<template>
  <div class="main-about side-padding-50 mt70">
    <div class="main-about-detail">
      <div class="main-point-text tc-white about-description en-font">
        ABOUT
      </div>
      <div class="main-about-title" v-if="outerWidth <= 486">
        놀라운 편리함,<br/>
        포기 할 수 없는 아름다움<br/>
        데일리룩 구독 서비스 줄라이
      </div>
      <div class="main-about-title" v-else>
        놀라운 편리함, 포기 할 수 없는 아름다움<br/>
        데일리룩 구독 서비스 줄라이
      </div>
      <div class="main-about-service pd5 hide-area">
        <a href="#" class="tc-white">서비스 상세 소개</a>
      </div>
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

<style scoped>
.mt70 {
  margin-top: 63px !important;
}

.about-description {
  padding-top: 287px !important;
}

.main-about {
  height: 500px;
  background-image: url('/static/img/main/img_about_large.png');
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-color: #2d2727;
}

.main-about-detail {
  width: 1300px;
  margin: auto;
}

.main-about-service {
  line-height: 2.56;
  letter-spacing: -0.2px;
  text-align: left;
  color: #ffffff;
}

.main-about-title {
  letter-spacing: -2.2px;
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
