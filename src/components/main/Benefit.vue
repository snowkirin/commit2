<template>
  <div class="benefit">
    <p class="main-point-text en-font">BENEFIT</p>
    <p class="title">
      쇼핑, 세탁, 보관 걱정 없는<br/>
      나만의 옷장<br/>
      지금 무료로 경험하세요.
    </p>
    <div v-show="!Authentication.authenticated" class="benefit-btn-area" style="width: 20%; position: relative;">
      <button class="button-main" style="bottom: 6px; right: 0; position: absolute; display: none; " @click="signup">
        <span style="font-size: 20px; padding-left: 20px; font-weight: 400;">한달 무료 신청</span>
        <div class="d-inlineblock arrowIcon"></div>
      </button>
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

<style scoped lang="scss">
  .benefit {
    padding: 15px 20px 45px;
    .title {
      letter-spacing: -1.4px;
      font-size: 26px;
      line-height: 34px;
    }
  }
.benefit-main {
  width: 1200px;
  margin: auto;
  margin-top: 30px;
}

.benefit-title {
  font-size: 58px;
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
  background: url(/static/img/icons/zuly_icon.png) no-repeat -43px -8px;
  background-size: 215px 215px;
  width: 27.5px;
  height: 23.5px;
  transform: translate(0%, 25%);
  margin-left: 31%;
}

.special-title {
  position: relative;
  bottom: 6px;
}

@media screen and (max-width: 486px) {
  .arrowIcon {
    margin-left: 39.8% !important;
  }
}
</style>
