<template>
  <div class="login subContent side-margin-50">
    <div class="login-title mt70">로그인</div>
    <div class="loginLine mt20"></div>
    <div class="login-error" style="display: none;">
      입력된 아이디는 가입되지 않은 계정입니다.
    </div>
    <div class="login-form mt40">
      <input type="text" name="email" class="form-login-input" placeholder="아이디 (이메일 주소)를 입력하세요." />
      <input type="password" name="password" class="form-login-input mt10" placeholder="비밀번호" @keydown="$common.submitEvt($event, login)" />
      <div class="login-chk-area mt10" @click="checkboxEvt">
        <label class="container">
          <input type="checkbox" name="sess_forever" value="Y">
          <span class="checkmark"></span>
        </label>
        <div class="checkboxText">
          아이디(이메일주소) 저장
        </div>
      </div>
      <div class="mt20">
        <button class="button-login" @click="login">
          로그인
        </button>
      </div>
      <div class="login-menu w100 mt40" style="display: table;">
        <ul class="loginMenu">
          <li class="loginMenu">
            <router-link to="/join/size" class="no-deco-a">회원가입</router-link>
          </li>
          <li class="loginMenu loginMenuLine">
            <router-link to="/find/id" class="no-deco-a">아이디찾기</router-link>
          </li>
          <li class="loginMenu loginMenuLine">
            <router-link to="/find/password" class="no-deco-a">비밀번호찾기</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'login',
  computed: mapGetters({
    isLogin: 'login/isLogin',
  }),
  methods: {
    ...mapActions({
      doLogin: 'login/doLogin',
    }),
    checkboxEvt() {
      const sess = document.querySelector('input[name=sess_forever]');
      sess.checked = !sess.checked;
    },
    async login() {
      const email = document.querySelector('input[name=email]');
      const password = document.querySelector('input[name=password]');

      if (!this.$common.InputDataValidation(email, '이메일을 입력해주세요.', true, true)) return;
      if (!this.$common.InputDataValidation(password, '패스워드를 입력해주세요.', true)) return;

      await this.doLogin({
        email: email.value,
        password: password.value,
      });

      if (!this.isLogin) email.focus();
      else this.redirectCloset();
    },
    redirectCloset() {
      if (this.$store.state.login.Authentication.authenticated) this.$router.push({ path: '/closet' });
    },
  },
  created() {
    this.redirectCloset();
  },
};
</script>

<style scoped>
.login {
  width: 392px;
  text-align: center;
  margin: auto;
}

.login-title {
  font-weight: 400;
  line-height: 1.26;
  text-align: center;
  text-shadow: 0px 1px 0 rgba(0, 0, 0, 0.1);
}

.loginLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.login-chk-area {
  height: 24px;
  display: table;
  cursor: pointer;
}

.checkboxText {
  text-align: left;
  display: table-cell;
  vertical-align: bottom;
}

.login-menu {
  table-layout: fixed;
}

.loginMenu {
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: -0.2px;
  color: #212121;
}

ul.loginMenu {
  display: flex;
  text-align: center;
  padding: 0;
}

li.loginMenu {
  display: inline-block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
}

.loginMenuLine::before {
  content: "";
  position: absolute;
  left: 0;
  display: inline-block;
  width: 1px;
  height: 20px;
  background: #212121;
  top: 7px;
}

.login-error {
  text-align: left;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.1px;
  text-align: left;
  color: #ec4b1a;
}

@media screen and (max-width: 486px) {
  .loginMenu {
    font-size: 14px;
  }
}
</style>
