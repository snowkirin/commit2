<template>
  <div class="contents">
    <div class="contents-header">
      <h2 class="txt-title">로그인</h2>
      <div class="login-error" style="display: none;">
        입력된 아이디는 가입되지 않은 계정입니다.
      </div>
    </div>
    <div class="content">
      <form class="form">
        <div class="row">
          <div
            class="text-field email"
            :class="{'text-field-error': errors.has('email') }"
          >
            <input
              class="form-input"
              type="text"
              name="email"
              autocomplete="username"
              placeholder="아이디"
              v-model="email"
              v-validate="'required|email'"
            />
          </div>
          <p
            v-show="errors.has('email')"
            class="txt-error"
          >
            {{ errors.first('email') }}
          </p>
        </div>
        <div class="row">
          <div
            class="text-field password"
            :class="{'text-field-error': errors.has('password')}"
          >
            <input
              class="form-input"
              type="password"
              name="password"
              placeholder="패스워드"
              autocomplete="current-password"
              v-model="password"
              v-validate="'required'"
              @keyup.enter="$refs.btnLogin.$el.click()"
            />
          </div>
          <p
            class="txt-error"
            v-show="errors.has('password')"
          >
            {{ errors.first('password') }}
          </p>
        </div>
        <div class="row">
          <div class="custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              name="sess_forever"
              id="sess_forever"
            >
            <label
              class="custom-control-label"
              for="sess_forever">
              아이디 (이메일주소) 저장
            </label>
          </div>
        </div>
        <FormButton ref="btnLogin" v-show="true" :api-data="submitLogin" @success="successLogin" button-type="">
          <span>로그인</span>
        </FormButton>
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
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Validator } from "vee-validate";
import Simplert from 'vue2-simplert'

const dict = {
  custom: {
    email: {
      required: "필수값입니다.",
      email: "이메일 형식이 아닙니다."
    }
  }
};
const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인', // 닫기 버튼 텍스트
};

Validator.localize("ko", dict);

export default {
  name: "login",
  components: {
    Simplert
  },
  computed: {
    ...mapGetters({
      isLogin: "login/isLogin",
      Authentication: "login/Authentication"
    })
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions({
      doLogin: "login/doLogin"
    }),
    submitLogin() {
      const formData = {
        email: this.email,
        password: this.password
      };
      return this.$validator.validateAll().then(result => {
        if (result) {
          return this.doLogin(formData).then(res => {
            if (!res.data.result) {
              _.assign(alertObject, {
                message: '아이디 혹은 비밀번호를 다시 확인해주세요.'
              });
              this.$refs.alert.openSimplert(alertObject);
            }
            return res;
          });
        }
      });
    },
    successLogin() {
      if (this.isLogin && this.Authentication.isAuthenticated) {
        this.$router.push({ path: "/closet/tomorrow" });
      }
    }
  },
  created: function() {
    if (this.isLogin) {
      const $this = this;
      _.assign(alertObject, {
        message: '잘못된 경로로 들어오셨습니다.',
        onClose: function(){
          this.$router.push({ path: '/'})
        }
      });
      this.$refs.alert.openSimplert(alertObject);
    }
  }
};
</script>

<style scoped lang="scss">
.contents {
  text-align: center;
  margin: 0 auto;
  padding: 24px 20px 121px;
  .txt-title {
    @include fontSize(24px);
  }
  .content {
    border-top: 2px solid #333;
    padding-top: 19px;
    margin-top: 15px;
    text-align: left;
    .form {
      padding-bottom: 16px;
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
    .row {
      margin-bottom: 10px;
    }
    .menu-login {
      text-align: center;
      ul {
        font-size: 0;
      }
      li {
        @include fontSize(14px);
        color: $color-secondary;
        display: inline-block;
        position: relative;
        a {
          padding-left: 16px;
          padding-right: 16px;
        }
        &::after {
          content: "";
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
        &:nth-child(1) {
        }
        &:nth-child(2) {
        }
        &:nth-child(3) {
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .contents {
    width: 390px;
    margin: 0 auto;
    padding: 72px 0 119px 0;
    .txt-title {
      @include fontSize(32px);
    }
    .content {
      padding-top: 30px;
      margin-top: 25px;
      .menu-login {
        li {
          @include fontSize(15px);
          a {
            padding-left: 26px;
            padding-right: 26px;
          }
          &:nth-child(1) {
          }
          &:nth-child(2) {
          }
          &:nth-child(3) {
          }
        }
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
