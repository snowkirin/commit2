<template>
  <div class="signup subContent side-margin-50">
    <div class="content-title mt20">정기구독/회원가입</div>
    <div class="signupLine mt25"></div>
    <div class="signup-form mt40" style="width: 820px; margin: auto;">
      <div class="signup-area mt40 d-inlinetable" style="margin-right: 32px;">
        <div class="signup-title-detail">사용자 계정</div>
        <input type="text" name="" class="form-login-input mt20" placeholder="이름" />
        <input type="text" name="" class="form-login-input mt12" placeholder="휴대전화" />
        <input type="text" name="" class="form-login-input mt12" placeholder="이름" />
        <input type="text" name="" class="form-login-input mt12" placeholder="휴대전화" />
      </div>
      <div class="signup-area mt40 d-inlinetable">
        <div class="signup-title-detail">연락처 정보</div>
        <input type="text" name="" class="form-login-input mt20" placeholder="이름" />
        <input type="text" name="" class="form-login-input mt12" placeholder="휴대전화" />
        <div class="inputGroup">
          <input type="text" name="" class="form-login-group mt12" placeholder="우편번호" style="width: 75%;"/>
          <button class="button-login" style="width: 25%;">주소찾기</button>
        </div>
        <input type="text" name="" class="form-login-input mt12" placeholder="휴대전화" />
        <input type="text" name="" class="form-login-input mt12" placeholder="이름" />
        <div class="signup-chk-area mt15">
          <label class="container">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
          <div class="checkboxText">
            *개인정보의 수집 및 이용에 대한 동의
          </div>
        </div>
        <div class="signup-chk-area mt12">
          <label class="container">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
          <div class="checkboxText">
            *이용약관
          </div>
        </div>
      </div>
      <div class="mt30">
        <div style="width: 392px; float: right;">
          <button class="button-login" @click="moveNext">
            다음
          </button>
        </div>
      </div>
    </div>

    <custom-modal dataId="test"></custom-modal>
  </div>
</template>

<script>
import CustomModal from '@/components/common/CustomModal';

export default {
  name: 'signUp',
  components: {
    CustomModal,
  },
  methods: {
    moveNext() {
      this.$router.push({ path: 'styling' });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.signup {
  width: 820px;
  text-align: center;
  margin: auto;
}

.signupLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.signup-area {
  width: 392px;
}

.signup-title-detail {
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #212121;
}

.signup-chk-area {
  height: 24px;
  display: table;
}

.checkboxText {
  text-align: left;
  display: table-cell;
  vertical-align: bottom;
}

.mt12 {
  margin-top: 12px;
}
</style>
