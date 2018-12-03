<template>
  <div class="wrapper">
    <CommonHeader />
    <div class="container">
      <LoginIndex />
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from '@/components/common/Header';
import LoginIndex from '@/components/login/Login';
import CommonFooter from '@/components/common/Footer';
export default {
  name: 'Login',
  components: {
    CommonHeader,
    LoginIndex,
    CommonFooter
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: {
    top: 25px;
    bottom: 70px;
  }
  /* Tablet ~ Desktop Style */
  @include tablet {
    padding: {
      top: 100px;
      bottom: 100px;
    }
  }
}
</style>
