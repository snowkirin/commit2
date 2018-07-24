<template>
  <div class="container">
    <div class="container-header">
      <div>
        <p class="title">아이디 찾기</p>
        <p class="explain">가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.</p>
      </div>
      <div class="line line__default"></div>
    </div>
    <div class="contents">
      <form>
        <div class="row">
          <input
            class="form-input"
            type="text"
            name=""
            id=""
            placeholder="이름">
        </div>
        <div class="row">
          <input
            class="form-input"
            type="tel"
            name=""
            id=""
            placeholder="휴대전화">
        </div>
        <div class="row form-group" data-grid="7:3">
          <input
            class="form-input"
            type="number"
            name=""
            id=""
            placeholder="인증번호">
          <button
            class="btn btn-secondary"
            type="button">
            인증
          </button>
        </div>
        <div class="button">
          <!--TODO: submit?-->
          <button
            type="button"
            class="btn btn-primary"
          >로그인</button>
        </div>
      </form>
    </div>
  </div>
  <!--<div class="find-id">
    <p>Title</p>
    <div class="findId-form mt40">
      <input type="text" name="name" class="form-login-input mt10" placeholder="이름" v-validate="'required'" />
      <input type="text" name="phone" class="form-login-input mt10" placeholder="휴대전화" v-validate="'required'" />
      <div class="inputGroup">
        <input type="text" name="phone_auth_number" class="form-login-group mt10" placeholder="인증번호" style="width: 72%;"/>
        <div style="display: inline-table; width: 3%;"></div>
        <button  class="button-grey" style="width: 25%;" @click="phoneVerify">인증</button>
      </div>
      <div class="findId-wait mt10" v-show="authErr" v-html="authErrMessage">
      </div>
      <div class="mt10">
        <button class="button-login" @click="authKeyConfirm">
          다음
        </button>
      </div>
    </div>
  </div>-->
  <!--<div class="findId subContent side-margin-50">
    <div class="findId-title mt70">아이디찾기</div>
    <div class="explain mt10">
      가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.
    </div>
    <div class="findIdLine mt25"></div>
    <div class="findId-form mt40" style="width: 392px; margin: auto;">
      <input type="text" name="name" class="form-login-input mt10" placeholder="이름" v-validate="'required'" />
      <input type="text" name="phone" class="form-login-input mt10" placeholder="휴대전화" v-validate="'required'" />
      <div class="inputGroup">
        <input type="text" name="phone_auth_number" class="form-login-group mt10" placeholder="인증번호" style="width: 72%;"/>
        <div style="display: inline-table; width: 3%;"></div>
        <button  class="button-grey" style="width: 25%;" @click="phoneVerify">인증</button>
      </div>
      <div class="findId-wait mt10" v-show="authErr" v-html="authErrMessage">
      </div>
      <div class="mt10">
        <button class="button-login" @click="authKeyConfirm">
          다음
        </button>
      </div>
    </div>
  </div>-->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'findId',
  data() {
    return {
      authErr: false,
      authErrMessage: '',
    };
  },
  computed: mapGetters({
    phoneAuth: 'common/getPhoneAuth',
    phoneAuthkey: 'common/getPhoneAuthKey',
  }),
  methods: {
    ...mapActions({
      actPhoneVerify: 'common/phoneVerify',
      actPhoneCheckVerify: 'common/phoneCheckVerify',
    }),
    async phoneVerify() {
      const name = document.querySelector('input[name=name]');
      const phone = document.querySelector('input[name=phone]');

      if (!this.$common.InputDataValidation(name, '이름을 입력해주세요.', true)) return;

      await this.$validator.validate('phone', phone.value).then(async (result) => {
        let resultMsg = true;

        if (result) {
          if (this.$common.phoneValidation(phone.value)) {
            await this.actPhoneVerify({
              name: name.value,
              phone: phone.value.split('-').join(''),
            });

            return true;
          }

          alert('올바른 휴대폰번호를 입력해주세요.');
          resultMsg = false;
        }

        if (resultMsg) alert('휴대폰 번호를 입력해주세요.');
        phone.focus();
        return false;
      });

      if (this.$store.getters['common/getPhoneAuthKey'] > 0) {
        this.startTimer();
        this.authErr = true;
      }
    },
    async authKeyConfirm() {
      const phoneAuthNumber = document.querySelector('input[name=phone_auth_number]');

      if (!this.$store.getters['common/getPhoneAuthKey']) {
        alert('먼저 휴대전화를 입력하고 인증버튼을 눌러주세요.');
        return false;
      }

      if (!this.$common.InputDataValidation(phoneAuthNumber, '인증번호를 입력해주세요.', true)) return false;

      await this.actPhoneCheckVerify({
        authNumber: phoneAuthNumber.value,
      });

      if (this.phoneAuth) {
        alert('인증되었습니다.');
        this.$router.push({ path: '/find/id/complete' });
      } else alert('인증번호를 다시 확인하시고 진행해주세요.');

      return true;
    },
    startTimer() {
      const timer = Date.parse(new Date(new Date().getTime() + (3 * 60 * 1000))) / 1000;
      let minutes;
      let seconds;

      if (window.interval) clearInterval(window.interval);

      const interval = setInterval(() => {
        const currentTime = Date.parse(new Date()) / 1000;
        const printTimer = timer - currentTime;

        minutes = parseInt(printTimer / 60, 10);
        seconds = parseInt(printTimer % 60, 10);

        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        this.authErrMessage = `메시지를 확인하시고 인증번호를 입력해주세요.  <span style="color: #ec4b1a;">${minutes}:${seconds}</span>`;

        if (printTimer <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      window.interval = interval;
    },
  },
};
</script>

<style scoped lang="scss">
  .container {
    padding: 24px 20px 121px;
    text-align: center;
    .title {
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -1.4px;
    }
    .explain {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.8px;
      color: #797979;
      margin-top: 3px;
    }
    .line {
      margin-top: 14px;
      margin-bottom: 19px;
      border-width: 2px;
    }
    .row {
      margin-bottom: 10px;
    }
    .button  {
      button {
        width: 100%;
      }
    }
  }
</style>
