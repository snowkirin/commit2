<template>
  <div class="wrapper">
    <CommonHeader />
    <LoginIndex />
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

<style scoped></style>
