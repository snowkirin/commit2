<template>
  <div class="wrapper">
    <CommonHeader />
    <div class="container"><router-view /></div>
    <CommonFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import CommonHeader from '@/components/common/Header';
import CommonFooter from '@/components/common/Footer';
export default {
  name: 'Join',
  components: {
    CommonHeader,
    CommonFooter
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'login/isAuthenticated'
    })
  }
};
</script>

<style scoped lang="scss">
.container {
  padding-bottom: 70px;
  @media (min-width: 768px) {
    padding-bottom: 100px;
  }
  @media (min-width: 1080px) {
    padding-bottom: 130px;
  }
}
</style>
