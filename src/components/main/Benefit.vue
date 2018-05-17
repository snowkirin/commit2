<template>
  <div class="benefit-main side-padding-50">
    <div class="main-point-text en-font">
      BENEFIT
    </div>
    <div class="benefit-title d-flex">
      <div class="benefit-main-title" style="width: 80%;">
        쇼핑, 세탁, 보관 걱정 없는<br/>
        나만의 옷장<br/>
        지금 무료로 경험하세요.
      </div>
      <div v-show="!Authentication.authenticated" class="benefit-btn-area" style="width: 20%; position: relative;">
        <button class="button-main" style="bottom: 6px; right: 0; position: absolute;" @click="signup">
          <span style="font-size: 24px; padding-left: 20px; font-weight: 400;">한달 무료 신청</span>
          <div class="d-inlineblock arrowIcon"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'benefit',
  methods: {
    signup() {
      this.$router.push({ path: '/join/size' });
    },
  },
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
  mounted() {
    const subscribeBtn = document.querySelector('.button-main');

    subscribeBtn.onmouseover = () => {
      subscribeBtn.style.backgroundColor = '#fb5143';
    };

    subscribeBtn.onmouseout = () => {
      subscribeBtn.style.backgroundColor = '#333333';
    };
  },
};
</script>

<style scoped>
.benefit-main {
  width: 1300px;
  margin: auto;
  margin-top: 30px;
}

.benefit-title {
  font-size: 64px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.28;
  letter-spacing: -5.6px;
  color: #333333;
}

.benefit-title span {
  font-weight: 600;
}

.arrowIcon {
  position: relative;
  top: 1px;
  background: url('/static/img/icons/zuly_icon.png') no-repeat -43px -8px;
  background-size: 250px 250px;
  width: 37.5px;
  height: 23.5px;
  margin-left: 26%;
}

.special-title {
  position: relative;
  bottom: 6px;
}

@media screen and (max-width: 486px) {
  .arrowIcon {
    margin-left: 35.8% !important;
  }
}
</style>
