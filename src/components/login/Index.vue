<template>
  <div class="login">
    <p class="title">
      로그인
    </p>
    <div class="line line__default"></div>
    <div class="login-error" style="display: none;">
      입력된 아이디는 가입되지 않은 계정입니다.
    </div>
    <form name="loginForm">
      <div class="email">
        <input
          class="form-input"
          type="email"
          name="email"
          :value="(this.$cookies.isKey('email_session')) ? this.$cookies.get('email_session') : ''"
          placeholder="아이디" />
        <!--<input type="text" name="email" class="form-login-input" placeholder="아이디 (이메일 주소)를 입력하세요." />-->
      </div>
      <div class="password">
        <input
          class="form-input"
          type="password"
          name="password"
          placeholder="패스워드"
          @keydown="$common.submitEvt($event, login)"
        />
      </div>

      <div class="custom-checkbox">
        <input
          class="custom-control-input"
          type="checkbox"
          name="sess_forever"
          id="sess_forever"
          :checked="(this.$cookies.isKey('email_session'))? true : false">
        <label
          class="custom-control-label"
          for="sess_forever">
          아이디 (이메일주소) 저장
        </label>
      </div>

      <!--<div
        class="login-chk-area"
        @click="checkboxEvt">
        <label class="container">
          <input type="checkbox" name="sess_forever" value="Y">
          <span class="checkmark"></span>
        </label>
        <p class="checkboxText">
          아이디(이메일주소) 저장
        </p>
      </div>-->
      <div class="btn-login">
        <button
          class="btn btn-primary"
          type="button"
          @click="login">
          로그인
        </button>
      </div>
    </form>
    <div class="menu">
      <ul>
        <li>
          <router-link to="/join/size" class="no-deco-a">회원가입</router-link>
        </li>
        <li>
          <router-link to="/find/id" class="no-deco-a">아이디찾기</router-link>
        </li>
        <li>
          <router-link to="/find/password" class="no-deco-a">비밀번호찾기</router-link>
        </li>
      </ul>
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
      if (!this.isLogin) {
        email.focus();
      } else {
        const loginForm = document.loginForm;
        if (loginForm.sess_forever.checked) {
          this.$cookies.set('email_session', loginForm.email.value, -1);
        }
        this.redirectCloset();
      }
      // if (!this.isLogin) email.focus();
      // else this.redirectCloset();
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

<style scoped lang="scss">
  .login {
    text-align: center;
    margin: 0 auto;
    padding: 0 21px;
  }
  .title {
    font-size: 26px;
    line-height: 36px;
    letter-spacing: -1.4px;
  }
  /* Login Line Style */
  .line {
    margin-top: 14px;
    margin-bottom: 19px;
  }
  /* Login Form 관련 스타일 */

  .email {
    margin-bottom: 10px;
  }
  .login-chk-area {
    text-align: left;
    margin-bottom: 19px;
    .checkboxText {
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.6px;
    }
  }
  .btn-login {
    button {
      width: 100%;
    }
  }
  .custom-checkbox {
    margin: {
      top: 14px;
      bottom: 19px;
    }
  }
  .menu {
    margin-top: 26px;
    ul {
      list-style: none;
      padding: 0;
      font-size: 0;
      text-align: left;
    }
    li {
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.8px;
      color: #797979;
      &:nth-child(1){
        margin-right: 31px;
      }
      &:nth-child(2){
        margin-right: 33px;
      }
    }
  }
  @media (min-width: 1279px) {
    .login {
      width: 390px;
      margin: 0 auto;
      padding: 0 0 160px 0;
    }
    .menu {
      ul {
        text-align: center;
      }
    }
  }
</style>
