<template>
  <div>
    <zuly-header></zuly-header>
    <router-view></router-view>
    <zuly-footer></zuly-footer>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
import ZulyHeader from '@/components/common/Header.vue';
import ZulyFooter from '@/components/common/Footer.vue';

export default {
  name: 'index',
  data() {
    return {
    };
  },
  components: {
    ZulyHeader,
    ZulyFooter
  },
  watch: {
    $route() {
      this.routeCheck();
    }
  },
  computed: {
  },
  methods: {
    ...mapActions({
      checkCurrentRoute: 'common/checkCurrentRoute'
    }),
    routeCheck() {
      const routeName = this.$route.name;
      if (routeName.indexOf('Zuly') !== -1) {
        // console.log('메인화면');
        this.checkCurrentRoute('main');
      } else if (routeName.indexOf('Login') !== -1) {
        // console.log('로그인 화면');
        this.checkCurrentRoute('login');
      } else if (routeName.indexOf('Closet') !== -1) {
        // console.log('옷장화면');
        this.checkCurrentRoute('closet');
      } else if (routeName.indexOf('Join') !== -1) {
        // console.log('회원가입 화면');
        this.checkCurrentRoute('join');
      } else {
        // console.log('기타 화면');
        this.checkCurrentRoute('etc');
      }
    },
  },
  created() {
    this.routeCheck();
  },
  mounted() {},
  destroyed() {}
};
</script>

<style scoped lang="scss">
</style>
