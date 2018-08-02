<template>
  <div>
    <zuly-header :closetCheck="checkCloset"></zuly-header>
    <router-view></router-view>
    <zuly-footer v-if="footerShow"></zuly-footer>
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
      checkCloset: false,
    };
  },
  components: {
    ZulyHeader,
    ZulyFooter,
  },
  watch: {
    $route() {
      this.checkPathJoin();
      this.checkPathCloset();
    },
  },
  methods: {
    checkPathCloset() {
      if (this.$route.path.indexOf('closet') !== -1) {
        this.checkCloset = true;
      } else {
        this.checkCloset = false;
      }
    },
    checkPathJoin() {
      if (this.$route.path.indexOf('join') !== -1) {
        this.footerShow = false;
      } else {
        this.footerShow = true;
      }
    },
  },
  created() {
    this.checkPathJoin();
    this.checkPathCloset();
  },
  mounted() {

  },
  destroyed() {
  },
};
</script>

<style lang="scss">
</style>
