<template>
  <div class="main">
    <benefit></benefit>
    <about></about>
    <process></process>
    <faq></faq>
    <main-video></main-video>
    <!--<event></event>-->
  </div>
</template>

<script>
import Benefit from '@/components/main/Benefit';
import About from '@/components/main/About';
import Process from '@/components/main/Process';
import Faq from '@/components/main/Faq';
import MainVideo from '@/components/main/MainVideo';
import Event from '@/components/main/Event';

export default {
  name: 'maix-index',
  components: {
    Benefit,
    About,
    Process,
    Faq,
    MainVideo,
    // Event,
  },
};
</script>

<style scoped lang="scss">
</style>
