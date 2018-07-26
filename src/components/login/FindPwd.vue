<template>
  <div class="container">
    <div class="container-header">
      <div>
        <p class="title">비밀번호 찾기</p>
        <p class="explain">가입 당시 입력한 아이디, 휴대전화 번호를 통해 <br>비밀번호를 찾을 수 있습니다.</p>
      </div>
      <div class="line line__default"></div>
    </div>
    <div class="contents">
      <form>
        <div class="row">
          <input
            class="form-input"
            type="email"
            name="email"
            placeholder="아이디"
            v-validate="'required'" />
        </div>
        <div class="row form-group" data-grid="7:3">
          <input
            class="form-input"
            type="tel"
            name="phone"
            placeholder="휴대전화"
            v-validate="'required'" />
          <button
            type="button"
            class="btn btn-secondary"
            @click="phoneVerify">
            인증
          </button>
        </div>
        <div class="row form-group" data-grid="7:3">
          <input
            class="form-input"
            type="number"
            name="phone_auth_number"
            placeholder="인증번호" />
          <button
            type="button"
            class="btn btn-secondary"
            @click="authKeyConfirm">
            확인
          </button>
        </div>
        <p class="txt-count" v-show="authErr" v-html="authErrMessage"></p>
        <div class="button">
          <!-- TODO: Submit?? -->
          <button
            type="button"
            class="btn btn-primary"
            @click="clickNext">다음</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'findPwd',
  data() {
    return {
      authErr: false,
      authErrMessage: '',
    };
  },
  computed: mapGetters({
    phoneAuth: 'common/getPhoneAuthPwd',
    phoneAuthkey: 'common/getPhoneAuthKeyPwd',
  }),
  methods: {
    ...mapActions({
      actPhoneVerify: 'common/phonePasswordVerify',
      actPhoneCheckVerify: 'common/phonePasswordCheckVerify',
    }),
    async phoneVerify() {
      const email = document.querySelector('input[name=email]');
      const phone = document.querySelector('input[name=phone]');

      if (!this.$common.InputDataValidation(email, '이메일을 입력해주세요.', true, true)) return;

      await this.$validator.validate('phone', phone.value).then(async (result) => {
        let resultMsg = true;

        if (result) {
          if (this.$common.phoneValidation(phone.value)) {
            await this.actPhoneVerify({
              email: email.value,
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

      if (this.$store.getters['common/getPhoneAuthKeyPwd'] > 0) {
        this.startTimer();
        this.authErr = true;
      }
    },
    async authKeyConfirm() {
      const phoneAuthNumber = document.querySelector('input[name=phone_auth_number]');

      if (!this.$store.getters['common/getPhoneAuthKeyPwd']) {
        alert('먼저 휴대전화를 입력하고 인증버튼을 눌러주세요.');
        return false;
      }

      if (!this.$common.InputDataValidation(phoneAuthNumber, '인증번호를 입력해주세요.', true)) return false;

      await this.actPhoneCheckVerify({
        authNumber: phoneAuthNumber.value,
      });

      if (this.phoneAuth) {
        alert('인증되었습니다.');
        clearInterval(window.interval);
        this.authErrMessage = '';
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
    clickNext() {
      this.$router.push({ path: '/find/password/complete' });
    }
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
    .form-group {
    }
    .button {
      button {
        width: 100%;
      }
    }
    .txt-count {
      text-align: left;
      margin-bottom: 10px;
      font-size: 15px;
      letter-spacing: -0.9px;
      line-height: 23px;
      color: #797979;
      text-indent: 13px;
    }
  }
  @media (min-width: 768px) {
    .container {
      width: 390px;
      margin: 0 auto;
      padding: 72px 0 119px 0;
      .title {
        font-size: 32px;
        line-height: 40px;
        letter-spacing: -1.7px;
      }
      .explain {
        font-size: 16px;
        line-height: 23px;
        letter-spacing: -1px;
        margin-top: 5px;
      }
      .line {
        margin-top: 25px;
        margin-bottom: 30px;
      }
      .button {
        button {
          height: 60px;
        }
      }
    }
  }
</style>
