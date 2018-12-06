<template>
  <div class="closet-header">
    <p class="user-info" v-if="loginFaq">환영합니다.</p>
    <p class="user-info" v-else>{{ User.displayName }}님 옷장</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'closet-header',
  data() {
    return {
      loginFaq: false
    };
  },
  computed: mapGetters({
    User: 'login/User',
    FaqLoginCheck: 'common/FaqLoginCheck',
    isAuthenticated: 'login/isAuthenticated'
  }),
  methods: {},
  mounted() {
    this.loginFaq = this.$route.path === '/closet/faq' && !this.isAuthenticated;
  }
};
</script>

<style scoped lang="scss">
.closet-header {
  padding: 25px 18px 15px;
}
.user-info {
  @include fontSize(24px);
  font-family: 'Open Sans', 'NotoSans', '맑은 고딕', 'Malgun Gothic', sans-serif;
  font-weight: 100;
}
@media (min-width: 768px) {
  .closet-header {
    width: 708px;
    margin: 0 auto;
    padding: {
      top: 19px;
      bottom: 13px;
      left: 0;
      right: 0;
    }
    font-weight: 300;
  }
  .user-info {
    @include fontSize(28px);
  }
}
@media (min-width: 1080px) {
  .closet-header {
    width: 1080px;
    padding: {
      top: 30px;
      bottom: 15px;
    }
  }
  .user-info {
    @include fontSize(30px);
  }
}
</style>
