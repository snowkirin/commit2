<template>
  <div class="closet mauto">
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
    ClosetMenu,
  },
};
</script>

<style scoped>
.closet {
  /*padding-bottom: 410px;*/
}
</style>
