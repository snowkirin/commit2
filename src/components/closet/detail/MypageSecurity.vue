<template>
  <div class="mypage mt44">
    <div class="main-point-text closet-title">나의 정보관리</div>
    <div class="closet-title-text mt20">
      안전하게 보호하기 위해 비밀번호를<br/>
      다시 한번 확인 합니다.
    </div>
    <div class="security-input">
      <div class="inputGroup">
        <input type="password" name="password" class="form-login-group mt12" placeholder="비밀번호" style="width: 33%;" v-validate="'required'" />
        <div style="display: inline-table; width: 1%;"></div>
        <button class="button-login" style="width: 10%;" @click="passwordCheck">확인</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mypageSecurity',
  methods: {
    passwordCheck() {
      const pwd = document.querySelector('input[name=password]');

      if (!this.$common.InputDataValidation(pwd, '비밀번호를 입력해주세요.', true)) return false;

      return true;
    },
  },
};
</script>

<style scoped>
.mypage {
}

.closet-title-text {
  font-size: 36px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -3.8px;
  text-align: left;
}

.security-input {
  margin-top: 30px;
}
</style>
