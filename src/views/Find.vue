<template>
  <div>
    <CommonHeader/>
    <router-view/>
    <CommonFooter/>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/Header';
import CommonFooter from '@/components/common/Footer';
export default {
  name: 'Find',
  components: {
    CommonHeader,
    CommonFooter
  }
};
</script>

<style scoped>
</style>
