<template>
  <div class="contents">
    <div class="contents-header">
      <h3 class="txt-title">로그인</h3>
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
              data-vv-as="이메일"
              v-validate="'email'"
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
              data-vv-as="패스워드"
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
        <div class="button-wrap">
          <FormButton ref="btnLogin" v-show="true" :api-data="submitLogin" @success="successLogin">
            <span>로그인</span>
          </FormButton>
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
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Simplert from 'vue2-simplert';

const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인' // 닫기 버튼 텍스트
};

export default {
  name: 'login',
  components: {
    Simplert
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin',
      Authentication: 'login/Authentication'
    })
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions({
      doLogin: 'login/doLogin'
    }),
    submitLogin() {
      const formData = {
        email: this.email,
        password: this.password
      };
      if (_.isEmpty(formData.email)) {
        _.assign(alertObject, {
          message: '이메일을 입력해주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }
      if (_.isEmpty(formData.password)) {
        _.assign(alertObject, {
          message: '비밀번호를 다시 확인해주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }
      return this.$validator.validateAll().then(result => {
        if (result) {
          return this.doLogin(formData).then(res => {
            if (!res.data.result) {
              _.assign(alertObject, {
                message: '이메일 혹은 비밀번호를 다시 확인해주세요.'
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
        this.$router.push({ path: '/closet/tomorrow' });
      }
    }
  },
  mounted() {
    if (this.isLogin) {
      _.assign(alertObject, {
        message: '잘못된 경로로 들어오셨습니다.',
        onClose: function() {
          this.$router.push({ path: '/' });
        }
      });
      this.$refs.alert.openSimplert(alertObject);
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/login-style.scss"></style>
<style scoped lang="scss">

.menu-login {
  text-align: center;
  margin-top: 30px;
  ul {
    font-size: 0;
  }
  li {
    @include fontSize(14px);
    color: $color-secondary;
    display: inline-block;
    position: relative;
    a {
      padding: 0 16px;
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
  }
}
@media (min-width: 768px) {
  .menu-login {
    li {
      @include fontSize(15px);
      a {
        padding: 0 26px;
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
</style>
