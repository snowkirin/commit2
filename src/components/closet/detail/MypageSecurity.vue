<template>
  <div class="mypage-sercurity">
    <p class="txt-main-title">
      안전하게 보호하기 위해 비밀번호를
      다시 한번 확인 합니다.
    </p>
    <div class="line line__default"></div>
    <div>
      <div class="form-group" data-grid="7:3">
        <input
          class="form-input"
          id="pwdInput"
          type="password"
          name="password"
          placeholder="비밀번호"
          v-validate="'required'"
          @keydown="$common.submitEvt($event, passwordCheck)"
        />
        <button
          type="button"
          class="btn btn-primary"
          @click="passwordCheck"
        >확인</button>
      </div>
    </div>
  </div>
  <!--<div class="mypage mt40">-->
    <!--<div class="main-point-text closet-title">나의 정보관리</div>-->
    <!--<div class="closet-title-text mt15">-->
      <!--안전하게 보호하기 위해 비밀번호를<br/>-->
      <!--다시 한번 확인 합니다.-->
    <!--</div>-->
    <!--<div class="security-input">-->
      <!--<div class="inputGroup">-->
        <!--<input id="pwdInput" type="password" name="password" class="form-login-group mt12" placeholder="비밀번호" style="width: 33%;" v-validate="'required'" @keydown="$common.submitEvt($event, passwordCheck)"/>-->
        <!--<div id="pwdIntv" style="display: inline-table; width: 1%;"></div>-->
        <!--<button id="pwdBtn" class="button-login" style="width: 10%;" @click="passwordCheck">확인</button>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'mypageSecurity',
  computed: {
    ...mapGetters({
      mypageAuth: 'mypage/getMypageAuth',
    }),
  },
  methods: {
    ...mapActions({
      mypageSecurity: 'mypage/mypageSecurity',
    }),
    async passwordCheck() {
      const pwd = document.getElementById('pwdInput');
      if (!this.$common.InputDataValidation(pwd, '비밀번호를 입력해주세요.', true)) return;
      await this.mypageSecurity({ password: pwd.value });

      if (this.mypageAuth) this.$router.push({ path: '/closet/mypage' });
    },
  },
};
</script>

<style scoped lang="scss">
  .mypage-sercurity {
    padding: 25px 20px 20px 20px;
    .line {
      margin: {
        top: 10px;
        bottom: 15px;
      }
    }
  }

  @media (min-width: 767px) {
    .mypage-sercurity {
      padding: 32px 0 20px 0;
      width: 1200px;
      margin: 0 auto;
      .line {
        border-width: 2px;
      }
    }
  }
</style>
