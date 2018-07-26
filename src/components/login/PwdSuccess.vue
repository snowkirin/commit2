<template>
  <div class="container">
    <div>
      <p class="title">비밀번호 찾기</p>
      <p class="explain">새로운 비밀번호를 입력하시고 변경버튼을 눌러주세요.</p>
    </div>
    <div class="line line__default"></div>
    <div class="contents">
      <div class="content">
        <div class="row">
          <div>
            <input
              type="password"
              name="password"
              class="form-input"
              placeholder="비밀번호 8자리 이상의 영문,숫자,특수문자 포함"
              v-validate="{ required: true, regex: pwdRegex }"
              @keyup="pwdCheck(errors.has('password'))" />
          </div>
          <p class="txt-error" v-show="errors.has('password')">{{ pwdMsg }}</p>
        </div>
        <div class="row">
          <div>
            <input
              type="password"
              name="password_confirm"
              class="form-input"
              placeholder="비밀번호 확인"
              v-validate="'required|confirmed:password'"
              @change="pwdConfirm(errors.has('passwordConfirmation'))" />
          </div>
          <p class="txt-error" v-show="errors.has('password_confirm')">비밀번호가 일치하지 않습니다.</p>
        </div>
      </div>
    </div>
    <div class="button">
      <button class="btn btn-primary" @click="changePassword">비밀번호 변경</button>
    </div>
  </div>
  <!--<div class="findId subContent side-margin-50">-->
    <!--<div class="findId-title">비밀번호 찾기</div>-->
    <!--<div class="explain mt10">-->
      <!--새로운 비밀번호를 입력하시고 변경버튼을 눌러주세요.-->
    <!--</div>-->
    <!--<div class="findIdLine mt25"></div>-->
    <!--<div class="findId-form mt40" style="width: 392px; margin: auto;">-->
      <!--<div class="field" :class="{ error: errors.has('password') }">-->
        <!--<input type="password" name="password" class="form-login-input mt12" placeholder="비밀번호 8자리 이상의 영문,숫자,특수문자 포함" v-validate="{ required: true, regex: pwdRegex }" @keyup="pwdCheck(errors.has('password'))" />-->
        <!--<span class="error" v-show="errors.has('password')">{{ pwdMsg }}</span>-->
      <!--</div>-->
      <!--<div class="field" :class="{ error: errors.has('password_confirm') }">-->
        <!--<input type="password" name="password_confirm" class="form-login-input mt12" placeholder="비밀번호 확인" v-validate="'required|confirmed:password'" @change="pwdConfirm(errors.has('passwordConfirmation'))" />-->
        <!--<span class="error" v-show="errors.has('password_confirm')">비밀번호가 일치하지 않습니다.</span>-->
      <!--</div>-->
      <!--<div class="mt30">-->
        <!--<button class="button-login" @click="changePassword">비밀번호 변경</button>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'pwd-success',
  data() {
    return {
      pwdRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
      pwdMsg: '비밀번호를 입력해주세요.',
      isPwd: false,
      isPwdConfirm: false,
    };
  },
  computed: mapGetters({
    phoneAuth: 'common/getPhoneAuth',
    userId: 'common/getUserId',
  }),
  methods: {
    ...mapActions({
      vuexChangePassword: 'common/changePassword',
    }),
    pwdCheck(isBoolean) {
      const pwd = document.querySelector('input[name=password]');

      let checkBoolean = isBoolean;
      if (pwd.value === '') {
        if (!checkBoolean) checkBoolean = !checkBoolean;
        this.pwdMsg = '비밀번호를 입력해주세요.';
      } else {
        this.pwdMsg = '비밀번호가 안전하지 않습니다. (최소 8자리 이상의 영문,숫자,특수문자 포함)';
      }

      if (checkBoolean) this.isPwd = false;
      else this.isPwd = true;
    },
    pwdConfirm(isBoolean) {
      if (isBoolean) this.isPwdConfirm = false;
      else this.isPwdConfirm = true;
    },
    changePassword() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          await this.vuexChangePassword({
            password: document.querySelector('input[name=password]').value,
          });

          if (this.$store.getters['common/getPhonePwdComplete']) {
            alert('비밀번호 변경이 완료되었습니다.');
            this.$router.push({ path: '/login' });
          }
        }
      });
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
    .txt-error {
      text-align: left;
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
