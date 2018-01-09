<template>
  <div class="ui container">
    <h3 class="ui header">회원가입</h3>
      <div class="ui center aligned grid">
        <form class="ui mini form ">
          <div class="sixteen wide field">
              <input type="text" name="name" placeholder="이름">
          </div>
          <div class="sixteen wide field">
              <input type="email" name="email"placeholder="lavie@onionground.kr">
          </div>
          <div class="ui error message">
            <div class="header">Action Forbidden</div>
            <p>유효한 이메일 주소가 아닙니다. 다시 작성해주세요.</p>
          </div>
          <div class="two fields">
            <div class="eight wide field">
              <input type="text" name="password" placeholder="비밀번호">
            </div>
            <div class="eight wide field">
              <input type="password" name="passwordCheck" placeholder="비밀번호확인">
            </div>
          </div>
          <div class="fields">
            <div class="eight wide field">
              <input type="text" name="number" placeholder="번호를 입력해 주세요.">
            </div>
            <button class="ui small button">번호인증</button>
          </div>
          <div class="fields">
            <div class="eight wide field">
              <input type="text" name="address" placeholder="주소를 입력해 주세요.">
            </div>
            <button class="ui small button">우편번호</button>
          </div>
          <div class="sixteen wide field">
              <input type="text" name="addressDetail" placeholder="상세주소를 입력해주세요.">
          </div>
          <button class="ui submit small button lastBtn" type="submit">다음</button>
        </form>
      </div>
  </div>
</template>
<script>
export default {
  name: 'join',
  components: {

  },
};
</script>
<style scoped>
.header {
  padding : 20px;
}
.lastBtn {
  margin : 10px;
}
</style>
