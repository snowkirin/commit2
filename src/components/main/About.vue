<template>
  <div class="main-about mt70">
    <div class="side-margin-50">
      <div class="main-point-text tc-white pd120">
        ABOUT
      </div>
      <div class="main-about-title">
        가벼운 옷장, 아름다운 일상<br/>
        놀라운 편리함 데일리룩 구독 서비스 ZULY
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
  background-size: 100% 100%;
}

.main-about-title {
  font-size: 32px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.26;
  letter-spacing: -2.4px;
  text-align: left;
  color: #ffffff;
  text-shadow: 0px -1px 0 rgba(0, 0, 0, 0.1);
}

.main-about-service {
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.56;
  letter-spacing: -1.2px;
  text-align: left;
  color: #ffffff;
}
</style>
