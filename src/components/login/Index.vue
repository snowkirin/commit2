<template>
  <div class="container">
    <section>
      <h2 class="txt-title">로그인</h2>
      <div class="login-error" style="display: none;">
        입력된 아이디는 가입되지 않은 계정입니다.
      </div>
      <div class="contents">
        <form class="form">
          <div class="form-row email">
            <input
              class="form-input"
              type="email"
              name="email"
              :value="(this.$cookies.isKey('email_session')) ? this.$cookies.get('email_session') : ''"
              autocomplete="username"
              placeholder="아이디" />
            <!--<input type="text" name="email" class="form-login-input" placeholder="아이디 (이메일 주소)를 입력하세요." />-->
          </div>
          <div class="form-row password">
            <input
              class="form-input"
              type="password"
              name="password"
              placeholder="패스워드"
              autocomplete="current-password"
              @keydown="$common.submitEvt($event, login)"
            />
          </div>
          <div class="form-row">
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
          </div>
          <div class="btn-login">
            <button
              class="btn btn-primary"
              type="button"
              @click="login">
              로그인
            </button>
          </div>
        </form>
        <div class="menu-login">
          <ul>
            <li>
              <router-link
                to="/join/size">
                회원가입
              </router-link>
            </li>
            <li>
              <router-link
                to="/find/id">
                아이디찾기
              </router-link>
            </li>
            <li>
              <router-link
                to="/find/password">
                비밀번호찾기
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
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
      const sess = document.getElementById('sess_forever');
      sess.checked = !sess.checked;
    },
    async login() {
      const email = document.querySelector('input[name=email]');
      const password = document.querySelector('input[name=password]');
      const sess = document.getElementById('sess_forever');

      if (!this.$common.InputDataValidation(email, '이메일을 입력해주세요.', true, true)) return;
      if (!this.$common.InputDataValidation(password, '패스워드를 입력해주세요.', true)) return;

      await this.doLogin({
        email: email.value,
        password: password.value,
      });
      if (!this.isLogin) {
        email.focus();
      } else {
        if (sess.checked) {
          this.$cookies.set('email_session', email.value, -1);
        }
        this.redirectCloset();
      }
      if (!this.isLogin) email.focus();
      else this.redirectCloset();
    },
    redirectCloset() {
      if (this.$store.state.login.Authentication.authenticated) this.$router.push({ path: '/closet/tomorrow' });
    },
  },
  created() {
    this.redirectCloset();
  },
};
</script>

<style scoped lang="scss">
  .container {
    text-align: center;
    margin: 0 auto;
    padding: 24px 20px 121px;
    .txt-title {
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -1.4px;
      font-weight: 400;
    }
    .contents {
      border-top: 2px solid #333;
      padding-top: 19px;
      margin-top: 15px;
      .form {
        margin-bottom: 26px;
        .form-row {
          &:nth-child(1) {
            margin-bottom: 10px;
          }
          &:nth-child(2) {
            margin-bottom: 15px;
          }
          &:nth-child(3) {
            margin-bottom: 19px;
          }
        }
        .btn-login {
          button {
            width: 100%;
          }
        }
      }
      .menu-login {
        ul {
          font-size: 0;
        }
        li {
          display: inline-block;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.8px;
          color: #797979;
          position: relative;
          a {
            padding-left: 16px;
            padding-right: 16px;
          }
          &::after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            height: 14px;
            top: 5px;
            border-right: 1px solid #dadada;
          }
          &:last-child {
            &::after {
              display: none;
            }
          }
          &:nth-child(1){
          }
          &:nth-child(2){
          }
          &:nth-child(3){
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    .container {
      width: 390px;
      margin: 0 auto;
      padding: 72px 0 119px 0;
      .txt-title {
        font-size: 32px;
        line-height: 40px;
        letter-spacing: -1.7px;
      }
      .contents {
        padding-top: 30px;
        margin-top: 25px;
        .menu-login {
          li {
            font-size: 15px;
            line-height: 23px;
            letter-spacing: -0.6px;
            a {
              padding-left: 26px;
              padding-right: 26px;
            }
            &:nth-child(1){
            }
            &:nth-child(2){
            }
            &:nth-child(3){
            }
          }
        }
      }
    }

    .custom-checkbox {
      margin-top: 9px;
      .custom-control-label {
        font-size: 15px;
        &::after {
          content: '';
          position: absolute;
          display: none;
          left: -21px;
          top: 5px;
          width: 7px;
          height: 14px;
          border: solid black;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }
    }
    .btn-login {
      .btn {
        height: 60px;
      }
    }
  }
</style>
