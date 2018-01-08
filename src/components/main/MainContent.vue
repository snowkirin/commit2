<template>
  <div class="main-contents">
    <main-image></main-image>
    <main-story></main-story>
  </div>
</template>

<script>
import MainImage from '@/components/main/MainImage';
import MainStory from '@/components/main/MainStory';

export default {
  name: 'main-content',
  components: {
    MainImage,
    MainStory,
  },
};
</script>

<style scoped>
div.main-contents {
  max-width: 100%;
  max-height: 100%;
}
</style>
