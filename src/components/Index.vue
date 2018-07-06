<template>
  <div>
    <zuly-header v-show="headerShow"></zuly-header>
    <router-view></router-view>
    <zuly-footer v-show="footerShow"></zuly-footer>
  </div>
</template>

<script>
import ZulyHeader from '@/components/common/Header';
import ZulyFooter from '@/components/common/Footer';

export default {
  name: 'index',
  data() {
    return {
      headerShow: true,
      footerShow: true,
    };
  },
  components: {
    ZulyHeader,
    ZulyFooter,
  },
  watch: {
    // $route() {
    //   this.mobileVisible();
    // },
    $route() {
      this.footerVisible();
    },
  },
  methods: {
    footerVisible() {
      if (this.$mq === 'sm') {
        if (this.$route.path.indexOf('join') !== -1) {
          this.footerShow = false;
        }
      }
    },
    // mobileVisible() {
    //   if (window.outerWidth <= 486) {
    //     if (this.$route.meta.mobile) {
    //       this.headerShow = false;
    //       this.footerShow = false;
    //     } else {
    //       this.headerShow = true;
    //       this.footerShow = true;
    //     }
    //   } else {
    //     this.headerShow = true;
    //     this.footerShow = true;
    //   }
    // },
  },
  created() {
    this.footerVisible();
    // this.mobileVisible();
    // window.addEventListener('resize', this.mobileVisible);
  },
  destroyed() {
    // window.removeEventListener('resize', this.mobileVisible);
  },
};
</script>

<style scoped lang="scss">
</style>
