<template>
  <div>
    <zuly-header :closetCheck="checkCloset"></zuly-header>
    <router-view></router-view>
    <zuly-footer v-if="footerShow"></zuly-footer>
  </div>
</template>
<script>
  console.log(process.env);
  import ZulyHeader from '@/components/common/Header.vue';
  import ZulyFooter from '@/components/common/Footer.vue';

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
        this.checkCloset = this.$route.path.indexOf('closet') !== -1;
      },
      checkPathJoin() {
        this.footerShow = this.$route.path.indexOf('join') === -1;
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

<style scoped lang="scss">
</style>