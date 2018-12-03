<template>
  <div class="contents">
    <div class="contents-header"><h3 class="txt-title">로그인</h3></div>
    <div class="content">
      <form class="form">
        <div class="row">
          <div
            class="text-field email"
            :class="{ 'text-field-error': errors.has('email') }"
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
              @keyup.enter="$refs.btnLogin.click();"
            />
          </div>
          <p v-show="errors.has('email')" class="txt-error">
            {{ errors.first('email') }}
          </p>
        </div>
        <div class="row">
          <div
            class="text-field password"
            :class="{ 'text-field-error': errors.has('password') }"
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
              @keyup.enter="$refs.btnLogin.click();"
            />
          </div>
          <p class="txt-error" v-show="errors.has('password')">
            {{ errors.first('password') }}
          </p>
        </div>
        <div class="row">
          <div class="custom-checkbox">
            <input
              class="custom-control-input"
              type="checkbox"
              id="sess_forever"
              v-model="isChecked"
            />
            <label class="custom-control-label" for="sess_forever">
              아이디 (이메일주소) 저장
            </label>
          </div>
        </div>
        <div class="button-wrap">
          <button
            type="button"
            class="btn btn-primary h-56"
            ref="btnLogin"
            @click="clickLogin"
          >
            로그인
          </button>
        </div>
      </form>
      <div class="menu-login">
        <ul>
          <li><router-link to="/join"> 회원가입 </router-link></li>
          <li><router-link to="/find/id-inquiry"> 아이디찾기 </router-link></li>
          <li>
            <router-link to="/find/pw-inquiry"> 비밀번호찾기 </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  computed: {
    ...mapGetters({
      isAuthenticated: 'login/isAuthenticated'
    })
  },
  data() {
    return {
      email: '',
      password: '',
      isChecked: false
    };
  },
  methods: {
    ...mapActions({
      LOGIN: 'login/LOGIN'
    }),
    successLogin() {
      if (this.isAuthenticated) {
        if (this.isChecked) {
          this.$localStorage.set('email', this.email);
        } else {
          this.$localStorage.remove('email');
        }
        this.$router.push({ path: '/closet/tomorrow' });
      }
    },
    clickLogin(e) {
      const formData = {
        email: this.email,
        password: this.password
      };

      if (_.isEmpty(formData.email)) {
        this.$dialog.alert('이메일을 입력해주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
        return;
      }
      if (_.isEmpty(formData.password)) {
        this.$dialog.alert('비밀번호를 다시 확인해 주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
        return;
      }

      this.$validator.validateAll().then(async result => {
        if (result) {
          e.target.disabled = true;
          try {
            const resultData = await this.LOGIN(formData);
            if (resultData.result) {
              e.target.disabled = false;
              this.successLogin();
            } else {
              this.$dialog.alert('이메일 혹은 비밀번호를 다시 확인해주세요.', {
                okText: '확인',
                customClass: 'zuly-alert',
                backdropClose: true
              });
              e.target.disabled = false;
            }
          } catch {
            this.$dialog.alert('이메일 혹은 비밀번호를 다시 확인해주세요.', {
              okText: '확인',
              customClass: 'zuly-alert',
              backdropClose: true
            });
            e.target.disabled = false;
          }
        }
      });
    }
  },
  created() {
    const emailStorage = this.$localStorage.get('email');
    if (!_.isNull(emailStorage)) {
      this.isChecked = true;
      this.email = emailStorage;
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$dialog
        .alert('잘못된 경로로 들어오셨습니다.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        })
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch(() => {
          this.$router.push({ path: '/' });
        });
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
    width: 33.3333333333%;
    /* Tablet ~ Desktop Style */
    @include tablet {
      @include fontSize(15px);
    }
    a {
      display: block;
      width: 100%;
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
</style>
