<template>
  <div class="benefit">
    <div>
      <p class="txt-main-point">BENEFIT</p>
      <p class="txt-benefit">
        쇼핑, 세탁, 보관 걱정 없는<br/>
        나만의 옷장<br/>
        지금 무료로 경험하세요.
      </p>
    </div>
    <div class="event">
      <router-link
        class="btn-free-month"
        v-if="!Authentication.authenticated"
        to="/join/size">
        정기 구독 신청
        <span class="icon-arrow">&rightarrow;</span>
      </router-link>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex';
export default {
  name: 'benefit',
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
  methods: {
  },
};
</script>

<style scoped lang="scss">
  .benefit {
    padding: 19px 19px 35px;
  }
  .txt-benefit {
    letter-spacing: -1.4px;
    font-size: 26px;
    line-height: 34px;
    margin-left: -2px;
  }

  .event {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    .btn-free-month {
      cursor: pointer;
      color: #fff;
      text-decoration: none;
      font-size: 18px;
      letter-spacing: -.9px;
      display: block;
      padding: 20px;
      background-color: #333;
      &:hover {
        background-color: #fb5143;
      }
    }
    .icon-arrow {
      width: 26px;
      height: 18px;
      display: inline-block;
      text-indent: -9999em;
      overflow: hidden;
      background: url(/static/img/icons/zuly_icon.png) no-repeat -43px -8px;
      background-size: 215px 215px;
      position: absolute;
      right: 20px;
    }
  }

  @media (min-width: 767px) {
    .benefit {
      padding: 63px 0 65px;
      width: 1200px;
      margin: 0 auto;
      position: relative;
    }
    .txt-benefit {
      font-size: 58px;
      line-height: 68px;
      letter-spacing: -3.2px;
      margin-left: -3px;
      margin-top: 3px;
    }
    .event {
      position: absolute;
      left:auto;
      right: 0;
      bottom: 72px;
      .btn-free-month {
        font-size: 22px;
        letter-spacing: -1.1px;
        display: block;
        width: 320px;
        padding: 24px 20px;
        &:hover {
          background-color: #fb5143;
        }
      }
      .icon-arrow {
        width: 26px;
        height: 18px;
        display: inline-block;
        text-indent: -9999em;
        overflow: hidden;
        background: url(/static/img/icons/zuly_icon.png) no-repeat -43px -8px;
        background-size: 215px 215px;
        position: absolute;
        right: 20px;
      }
    }
  }
</style>
