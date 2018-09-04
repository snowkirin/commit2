<template>
  <div class="contents">
    <div class="contents-header">
      <h3>아이디 찾기</h3>
      <p>가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.</p>
    </div>
    <div class="content">
      <p>입력하신 정보와 일치하는 아이디는 아래와 같습니다.</p>
      <p>{{ UserEmail }}</p>
      <div class="button-wrap">
        <router-link to="/login" class="menu-title">
          <button class="button-login" type="button">로그인</button>
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

<style scoped lang="scss" src="@/assets/css/join-style.scss"></style>
<style scoped lang="scss">
</style>
