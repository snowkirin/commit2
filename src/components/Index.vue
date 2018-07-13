<template>
  <div>
    <zuly-header></zuly-header>
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
    };
  },
  components: {
    ZulyHeader,
    ZulyFooter,
  },
  watch: {
  },
  methods: {
    toggleFooter() {
      if (this.$route.path.indexOf('join') !== -1) {
        this.footerShow = false;
      } else {
        this.footerShow = true;
      }
    },
  },
  created() {
    this.toggleFooter();
  },
  destroyed() {
  },
};
</script>

<style scoped lang="scss">
</style>
