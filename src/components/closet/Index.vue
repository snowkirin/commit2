<template>
  <div class="container">
    <closet-header></closet-header>
    <closet-menu></closet-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import ClosetHeader from '@/components/closet/Header';
import ClosetMenu from '@/components/closet/Menu';

export default {
  name: 'index',
  components: {
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
    @media (min-width: 1280px) {
      padding-bottom: 130px;
    }
  }
</style>
