<template>
<div class="pageNotFound">
  <div>
    <div>Error</div>
    <div>404</div>
    <div>요청한 사이트가 존재하지 않습니다.</div>
    <router-link to="/">홈으로 가기</router-link>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'pageNotFound',
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
  methods: {
  },
  created() {
    if (this.$route.path === '/index.html') this.$router.push({ path: '/' });
  },
};
</script>

<style scoped lang="scss">
  @media (min-width: 1279px) {

  }
</style>
