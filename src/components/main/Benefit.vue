<template>
  <div class="contents">
    <div class="contents-header">
      <p class="txt-main-point">BENEFIT</p>
    </div>
    <div class="content" v-if="MemberCount !== 0">
      <p class="txt-benefit">
        사지 말고 경험하세요.<br/>
        패션 구독 서비스<br/>
        <strong>첫 달 구독료 선착순 <span class="txt-discount">30%</span></strong>할인!
      </p>
      <router-link
        class="btn-event"
        v-if="Authentication.isAuthenticated"
        to="/join/size"
      >
        할인 가입 신청 (잔여 <span class="txt-count">{{MemberCount}}</span>명)
        <span class="icon-arrow">&rightarrow;</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "benefit",
  data() {
    return {
    };
  },
  computed: mapGetters({
    Authentication: "login/Authentication",
    MemberCount: "member/MemberCount"
  }),
  methods: {
    ...mapActions({
      setMemberCount: "member/setMemberCount"
    })
  },
  created() {
    if (this.MemberCount === null) {
      this.setMemberCount();
    }
  }
};
</script>

<style lang="scss" scoped>
.contents {
  padding: 19px 19px 35px;
  .txt-benefit {
    @include fontSize(24px);
    margin-left: -2px;
    user-select: none;
    .txt-discount {
      @include fontSize(26px, en);
    }
    strong {
      font-weight: 700;
    }
  }
  .btn-event {
    @include fontSize(17px);
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
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
    .icon-arrow {
      display: block;
      background: url(~@/assets/img/icons/arrow.png) no-repeat 0 0;
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
  .contents {
    padding: 63px 0 65px;
    margin-top: 3px;
    .content {
      position: relative;
    }
    .txt-benefit {
      @include fontSize(54px);
      margin-left: -3px;
      .txt-discount {
        @include fontSize(58px);
      }
    }
    .btn-event {
      @include fontSize(20px);
      position: absolute;
      left: auto;
      bottom: 72px;
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
</style>
