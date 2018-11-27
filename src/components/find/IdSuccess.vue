<template>
  <div class="contents">
    <div class="contents-header">
      <h3>아이디 찾기</h3>
      <p>가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.</p>
    </div>
    <div class="content">
      <div>
        <div class="text-wrap">
          <p>입력하신 정보와 일치하는 아이디는 아래와 같습니다.</p>
          <p class="txt-email">{{ UserEmail }}</p>
        </div>
      </div>
      <div class="button-wrap">
        <router-link to="/login" class="menu-title">
          <button class="btn btn-primary h-56" type="button">로그인</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'success',
  computed: {
    ...mapGetters({
      isFindIdAuth: 'auth/isFindIdAuth',
      UserEmail: 'auth/UserEmail'
    })
  },
  methods: {
    ...mapActions({
      destroyFindIdAuth: 'auth/destroyFindIdAuth'
    })
  },
  created() {
    if (!this.isFindIdAuth) {
      alert('잘못된 접근입니다.');
      this.$router.push({ path: '/' });
    }
  },
  destroyed() {
    this.destroyFindIdAuth();
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/login-style.scss">
</style>
<style scoped lang="scss">
.text-wrap {
  @include fontSize(15px);
  text-align: center;
  .txt-email {
    @include fontSize(15px, en);
    margin-top: 10px;
    font-weight: 700;
  }
}
.button-wrap {
  margin-top: 30px;
}
</style>
