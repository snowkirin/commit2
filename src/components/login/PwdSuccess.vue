<template>
  <div class="contents">
    <div class="contents-header">
      <h3>비밀번호 찾기</h3>
      <p>새로운 비밀번호를 입력하시고 변경버튼을 눌러주세요.</p>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div
            class="text-field"
            :class="{'text-field-error': errors.has('password')}"
          >
            <input
              type="password"
              name="password"
              v-model="password"
              ref="password"
              placeholder="비밀번호 8자리 이상의 영문,숫자,특수문자 포함"
              v-validate="{
              required: true,
              regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/
              }"
              data-vv-as="비밀번호"
            />
          </div>
          <p
            class="txt-error"
            v-if="errors.has('password')">
            {{errors.first('password')}}
          </p>
        </div>
        <div class="row">
          <div
            class="text-field"
            :class="{'text-field-error': errors.has('password_confirm')}"
          >
            <input
              type="password"
              name="password_confirm"
              placeholder="비밀번호 확인"
              v-validate="'required|confirmed:password'"
              data-vv-as="비밀번호 확인"
            />
          </div>
          <p class="txt-error" v-if="errors.has('password_confirm')">{{errors.first('password_confirm')}}</p>
        </div>
        <div class="button-wrap">
          <button
            type="button"
            class="btn btn-primary h-56"
            @click="clickChangePassword"
          >
            비밀번호 변경
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'pwd-success',
  data() {
    return {
      password: ''
    };
  },
  computed: {
    ...mapGetters({
      FindPwdAuth: 'auth/FindPwdAuth'
    })
  },
  methods: {
    ...mapActions({
      postPasswordComplete: 'auth/postPasswordComplete'
    }),
    clickChangePassword() {
      const formData = {
        authId: this.FindPwdAuth,
        password: this.password
      };

      if (_.isEmpty(formData.password)) {
        alert('비밀번호를 입력해 주세요');
      }
      this.$validator.validateAll().then(result => {
        if (result) {
          this.postPasswordComplete(formData).then(res => {
            console.log(res);
            alert('비밀번호 변경이 완료되었습니다.');
            this.$router.push({ path: '/login' });
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/login-style.scss">
</style>
<style scoped lang="scss"></style>
