<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "join",
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin'
    })
  },
  created() {
    // if (this.isLogin) {
    //   alert('잘못된 경로로 들어오셨습니다. 메인으로 이동합니다.');
    //   this.$router.push({
    //     path: '/'
    //   })
    // }
  }
};
</script>

<style scoped>
</style>
