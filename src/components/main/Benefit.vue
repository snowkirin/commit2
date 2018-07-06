<template>
  <div class="container">
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
  .container {
    padding: 19px 19px 35px;
    .txt-benefit {
      font-size: 26px;
      letter-spacing: -1.4px;
      line-height: 34px;
      margin-left: -2px;
      user-select: none;          /* Likely future */
    }
    .event {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 100;
      .btn-free-month {
        font-size: 18px;
        letter-spacing: -.9px;
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        display: block;
        padding: 20px;
        background-color: #333;
        &:hover {
          background-color: #fb5143;
        }
      }
      .icon-arrow {
        display: block;
        /*width: 66px;*/
        /*height: 44px;*/
        background: url(/static/img/icons/arrow.png) no-repeat 0 0;
        background-size: cover;
        text-indent: -9999em;
        overflow: hidden;
        width: 26px;
        height: 18px;
        position: absolute;
        right: 20px;
        top: 20px;
      }
    }
  }

  @media (min-width: 767px) {
    .container {
      padding: 63px 0 65px;
      width: 1200px;
      margin: 3px auto 0;
      position: relative;
      .txt-benefit {
        font-size: 58px;
        letter-spacing: -3.2px;
        line-height: 68px;
        margin-left: -3px;
      }
      .event {
        position: absolute;
        left:auto;
        bottom: 72px;
        .btn-free-month {
          font-size: 22px;
          letter-spacing: -1.1px;
          width: 320px;
          padding: 24px 20px;
          box-shadow: 0.5px 7px 7px 0 rgba(0, 0, 0, 0.18);
          .icon-arrow {
            width: 33px;
            height: 22px;
            top: 24px;
          }
        }
      }
    }
  }
</style>
