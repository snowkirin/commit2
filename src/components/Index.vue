<template>
  <div class="main">
    <zuly-header></zuly-header>
    <router-view></router-view>
    <zuly-footer></zuly-footer>
  </div>
</template>

<script>
import ZulyHeader from '@/components/common/Header';
import ZulyFooter from '@/components/common/Footer';

export default {
  name: 'index',
  components: {
    ZulyHeader,
    ZulyFooter,
  },
};
</script>

<style scoped>
</style>
