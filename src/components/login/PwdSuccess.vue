<template>
  <div class="findId subContent side-margin-50">
    <div class="findId-title">비밀번호 찾기</div>
    <div class="explain mt10">
      새로운 비밀번호를 입력하시고 변경버튼을 눌러주세요.
    </div>
    <div class="findIdLine mt25"></div>
    <div class="findId-form mt40" style="width: 392px; margin: auto;">
      <div class="field" :class="{ error: errors.has('password') }">
        <input type="password" name="password" class="form-login-input mt12" placeholder="비밀번호 8자리 이상, 대문자/숫자/특수문자 포함" v-validate="{ required: true, regex: pwdRegex }" @keyup="pwdCheck(errors.has('password'))" />
        <span class="error" v-show="errors.has('password')">{{ pwdMsg }}</span>
      </div>
      <div class="field" :class="{ error: errors.has('password_confirm') }">
        <input type="password" name="password_confirm" class="form-login-input mt12" placeholder="비밀번호 확인" v-validate="'required|confirmed:password'" @change="pwdConfirm(errors.has('passwordConfirmation'))" />
        <span class="error" v-show="errors.has('password_confirm')">비밀번호가 일치하지 않습니다.</span>
      </div>
      <div class="mt30">
        <button class="button-login" @click="changePassword">비밀번호 변경</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'pwd-success',
  data() {
    return {
      pwdRegex: /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
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
        this.pwdMsg = '비밀번호가 안전하지 않습니다. (최소 8자리 이상, 대문자/숫자/특수문자 포함)';
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

<style scoped>
.findId {
  width: 820px;
  text-align: center;
  margin: auto;
}

.findId-title {
  font-size: 32px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.26;
  letter-spacing: -0.4px;
  text-align: center;
  color: #212121;
}

.findIdLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.findId-chk-area {
  height: 24px;
  display: table;
}

.checkboxText {
  text-align: left;
  display: table-cell;
  vertical-align: bottom;
}

.findIdMenu {
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: -0.2px;
  color: #212121;
}

.findIdMenuSide {
  width: 33%;
  display: table-cell;
}

.findIdMenuCenter {
  width: 34%;
  border-left: 1px solid #999999;
  border-right: 1px solid #999999;
  display: table-cell;
}

.findId-wait {
  text-align: left;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.1px;
  text-align: left;
  color: #212121;
}

.findId-wait span {
  color: #ec4b1a;
}

.inputGroup input {
  vertical-align: bottom;
}

.findId-form span {
  font-size: 18px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #ec4b1a;
}
</style>
