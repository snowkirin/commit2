<template>
  <div class="main">
    <benefit></benefit>
    <about></about>
    <process></process>
    <faq></faq>
    <main-video></main-video>
  </div>
</template>

<script>
import Benefit from '@/components/main/Benefit';
import About from '@/components/main/About';
import Process from '@/components/main/Process';
import Faq from '@/components/main/Faq';
import MainVideo from '@/components/main/MainVideo';

export default {
  name: 'maix-index',
  components: {
    Benefit,
    About,
    Process,
    Faq,
    MainVideo,
  },
};
</script>

<style scoped>
div.main {
  padding-bottom: 410px;
}
</style>
