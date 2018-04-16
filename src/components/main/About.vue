<template>
  <div class="main-about side-padding-50 mt70">
    <div class="main-about-detail">
      <div class="main-point-text tc-white pd120 en-font">
        ABOUT
      </div>
      <div class="main-about-title" v-if="outerWidth <= 486">
        놀라운 편리함,<br/>
        포기 할 수 없는 아름다움<br/>
        데일리룩 구독 서비스 <span class="en-font">ZULY</span>
      </div>
      <div class="main-about-title" v-else>
        놀라운 편리함, 포기 할 수 없는 아름다움<br/>
        데일리룩 구독 서비스 <span class="en-font">ZULY</span>
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

.main-about {
  height: 420px;
  background-image: url('/static/img/main/img_about_large.png');
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-color: #cfcbc7;
}

.main-about-detail {
  width: 1300px;
  margin: auto;
}

@media screen and (max-width: 486px) {
  .mt70 {
    margin-top: 35px !important;
  }

  .main-about {
    display: table;
    background-image: url('/static/img/main/img_about_medium.png');
    height: 210px;
    background-size: cover;
  }

  .main-about-detail {
    display: table-cell;
    vertical-align: middle;
  }

  .main-about-title {
    font-size: 20px !important;
  }

  .pd120 {
    padding-top: 0 !important;
  }
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
</style>
