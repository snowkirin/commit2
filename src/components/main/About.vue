<template>
  <div class="main-about side-padding-50 mt70">
    <div class="main-about-detail">
      <div class="main-point-text tc-white pd120 en-font">
        ABOUT
      </div>
      <div class="main-about-title">
        놀라운 편리함, 포기 할 수 없는 아름다움<br/>
        데일리룩 구독 서비스 <span class="en-font">ZULY</span>
      </div>
      <div class="main-about-service pd5">
        <a href="#" class="tc-white">서비스 상세 소개</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
};
</script>

<style scoped>
.main-about {
  height: 420px;
  background-image: url('/static/img/main/img_about.png');
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-color: #cfcbc7;
}

.main-about-detail {
  width: 1300px;
  margin: auto;
}

.main-about-title {
  font-size: 36px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: -1.3px;
  text-align: left;
  color: #ffffff;
}

.main-about-service {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.56;
  letter-spacing: -0.2px;
  text-align: left;
  color: #ffffff;
}
</style>
