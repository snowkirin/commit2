<template>
  <div class="closet-header">
    <div class="closet-stylist-info f16">
      <span v-if="Authentication.userStylist">
        담당 스타일리스트 {{ Authentication.userStylist }}님
      </span>
    </div>
    <div class="closet-my-info">{{ Authentication.userName }}님 옷장</div>
    <div class="closet-noti-info">
      <div class="closet-line"></div>
      <div class="closet-noti-card">
        <div class="f16 noti-text">미확인 공지사항</div>
        <div class="f16 noti-count">
          <span>2</span> 건
        </div>
      </div>
      <div class="closet-line"></div>
      <div class="closet-noti-card">
        <div class="f16 noti-text">사용 가능 쿠폰</div>
        <div class="f16 noti-count">
          <span>2</span> 개
        </div>
      </div>
      <div class="closet-line"></div>
      <div class="closet-noti-card">
        <div class="f16 noti-text" style="width: 56%; display: inline-block;">내일의 옷장 선택</div>
        <div class="f16 noti-text-icon">변경가능</div>
        <div class="f16 noti-count">
          <span>D-5</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'closet-header',
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
};
</script>

<style scoped>
.closet-header {
  height: 265px;
  background-color: #7984a1;
}

.f16 {
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #ffffff;
}

.closet-stylist-info {
  padding: 28px 0 0 30px;
  height: 23px;
}

.closet-my-info {
  padding: 20px 0 0 30px;
  line-height: 0.9;
  font-size: 55px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -3px;
  text-align: left;
  color: #ffffff;
}

.closet-line {
  width: 2px;
  height: 100%;
  background-color: #FFFFFF;
  opacity: 0.5;
  display: inline-block;
}

.closet-noti-info {
  width: 62.5%;
  margin-top: 22px;
  margin-right: 10px;
  height: 95px;
  float: right;
}

.closet-noti-card {
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 31.8%;
  height: 100%;
}

.noti-text {
  font-weight: 600;
  padding-left: 16px;
}

.noti-count {
  position: absolute;
  bottom: 0;
  right: 14px;
}

.noti-count span {
  font-size: 48px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -1.2px;
  text-align: left;
  color: #ffffff;
}

.noti-text-icon {
  border-radius: 10px;
  display: inline-block;
  font-size: 14px;
  border: 1px solid #FFFFFF;
  width: 28%;
  text-align:center;
}
</style>
