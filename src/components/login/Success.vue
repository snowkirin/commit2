<template>
  <div class="findId subContent side-margin-50">
    <div class="findId-title">아이디 찾기</div>
    <div class="explain mt10">
      가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.
    </div>
    <div class="findIdLine mt25"></div>
    <div class="findId-form mt40" style="width: 392px; margin: auto;">
      입력하신 정보와 일치하는 아이디는<br/>
      아래와 같습니다.<br/><br/>
      <span>{{ userId }}</span>
      <div class="mt30">
        <router-link to="/login" class="menu-title">
          <button class="button-login">로그인</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'success',
  computed: mapGetters({
    phoneAuth: 'common/getPhoneAuth',
    userId: 'common/getUserId',
  }),
  created() {
    let rtn = false;

    if (this.userId) rtn = !rtn;

    if (!rtn) {
      alert('잘못된 접근입니다.');
      this.$router.push({ path: '/' });
    }
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
  font-size: 32px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.26;
  letter-spacing: -0.4px;
  text-align: center;
  color: #333333;
}

.findIdLine {
  height: 1px;
  opacity: 0.2;
  background-color: #333333;
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
  color: #333333;
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
  color: #333333;
}

.findId-wait span {
  color: #ec4b1a;
}

.inputGroup input {
  vertical-align: bottom;
}

.findId-form span {
  font-size: 18px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #ec4b1a;
}
</style>
