<template>
  <div class="findId subContent side-margin-50">
    <div class="findId-title">아이디찾기</div>
    <div class="mt10">
      가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.
    </div>
    <div class="findIdLine mt25"></div>
    <div class="findId-form mt40" style="width: 392px; margin: auto;">
      <input type="text" name="" class="form-login-input" placeholder="이름" />
      <input type="text" name="" class="form-login-input mt10" placeholder="휴대전화" />
      <div class="inputGroup">
        <input type="text" name="" class="form-login-group mt10" placeholder="인증번호" style="width: 75%;"/>
        <button class="button-login" style="width: 25%;">인증</button>
      </div>
      <div class="findId-wait mt10">
        인증번호를 입력해주세요.
        <span>인증 유효시간 2:39</span>
      </div>
      <div class="mt10">
        <button class="button-login">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'findId',
  components: {
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
  font-size: 36px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.26;
  letter-spacing: -0.4px;
  text-align: center;
  color: #212121;
  text-shadow: 0px 1px 0 rgba(0, 0, 0, 0.1);
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
</style>
