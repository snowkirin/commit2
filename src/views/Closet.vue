<template>
  <div>
    <CommonHeader />
    <div class="container">
      <ClosetHeader />
      <ClosetMenu />
      <router-view></router-view>
    </div>

    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from '@/components/common/Header';
import ClosetHeader from '@/components/closet/Common/Header';
import ClosetMenu from '@/components/closet/Common/Menu';
import CommonFooter from '@/components/common/Footer';
export default {
  name: 'Closet',
  components: {
    CommonHeader,
    CommonFooter,
    ClosetHeader,
    ClosetMenu
  }
};
</script>

<style scoped lang="scss">
  .container {
    padding-bottom: 70px;
    @media(min-width: 768px) {
      padding-bottom: 100px;
    }
    @media (min-width: 1080px) {
      padding-bottom: 130px;
    }
  }
</style>
