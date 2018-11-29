<template>
  <div class="wrapper">
    <CommonHeader />
    <div class="container">
      <router-view />
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from '@/components/common/Header';
import CommonFooter from '@/components/common/Footer';
export default {
  name: 'Join',
  components: {
    CommonHeader,
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
      top: 70px;
      bottom: 100px;
    }
  }
}
</style>
