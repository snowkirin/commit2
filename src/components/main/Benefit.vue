<template>
  <div class="container">
    <div>
      <p class="txt-main-point">BENEFIT</p>
      <p class="txt-benefit">
        사지 말고 경험하세요.<br/>
        패션 구독 서비스<br/>
        <strong>첫 달 구독료 선착순 <span class="txt-discount">30%</span></strong>할인!
      </p>
    </div>
    <div class="event" v-if="count !== 0">
      <router-link
        class="btn-free-month"
        v-if="!Authentication.authenticated"
        to="/join/size">
        할인 가입 신청 (잔여 <span class="txt-count">{{count}}</span>명)
        <span class="icon-arrow">&rightarrow;</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Member from '@/library/api/member';

export default {
  name: 'benefit',
  data() {
    return {
      count: 0,
    }
  },
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
  methods: {

  },
  created() {
    const $this = this;
    Member.getMemberCount()
      .then((res) => {
        if (res.data.result) {
          $this.count = 100 - res.data.count;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped lang="scss">
  .container {
    padding: 19px 19px 35px;
    .txt-benefit {
      font-size: 24px;
      letter-spacing: -1.4px;
      line-height: 32px;
      margin-left: -2px;
      user-select: none;
      .txt-discount {
        font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
        font-size: 26px;
        letter-spacing: -0.4px;
      }
    }
    .event {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 100;
      .btn-free-month {
        font-size: 17px;
        letter-spacing: -.9px;
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        display: block;
        padding: 20px;
        background-color: #333;
        height: 60px;
        &:hover {
          background-color: #fb5143;
        }
      }
      .txt-count {
        font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
      }
      .icon-arrow {
        display: block;
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

  @media (min-width: 768px) {
    .container {
      padding: 63px 0 65px;
      width: 1200px;
      margin: 3px auto 0;
      position: relative;
      .txt-benefit {
        font-size: 54px;
        letter-spacing: -3.2px;
        line-height: 66px;
        margin-left: -3px;
        .txt-discount {
          font-size: 58px;
          letter-spacing: 0;
        }
      }
      .event {
        position: absolute;
        left:auto;
        bottom: 72px;
        .btn-free-month {
          font-size: 18px;
          letter-spacing: -1.2px;
          width: 320px;
          padding: 22px 20px;
          box-shadow: 0.5px 7px 7px 0 rgba(0, 0, 0, 0.18);
          height: auto;
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
