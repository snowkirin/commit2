<template>
  <div class="main">
    <benefit></benefit>
    <about></about>
    <process></process>
    <faq></faq>
    <new-arrivals></new-arrivals>
    <main-video></main-video>
  </div>
</template>

<script>
import Benefit from '@/components/main/Benefit';
import About from '@/components/main/About';
import Process from '@/components/main/Process';
import Faq from '@/components/main/Faq';
import MainVideo from '@/components/main/MainVideo';
import NewArrivals from '@/components/main/NewArrivals';

export default {
  name: 'maix-index',
  components: {
    Benefit,
    About,
    Process,
    Faq,
    MainVideo,
    NewArrivals,
  },
};
</script>

<style scoped lang="scss">
</style>
