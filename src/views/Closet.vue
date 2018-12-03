<template>
  <div class="wrapper">
    <CommonHeader types="closet" />
    <ClosetHeader />
    <ClosetMenu />
    <div class="container">
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
  padding: {
    top: 30px;
    bottom: 70px;
  }
  @include tablet {
    padding: {
      top: 40px;
      bottom: 130px;
    }
  }
}
</style>
