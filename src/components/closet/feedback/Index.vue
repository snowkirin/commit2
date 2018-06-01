<template>
  <div class="feedBack mt30">
    <div class="feedback-area mauto">
      <div class="feedback-title">FEEDBACK</div>
      <component v-bind:is="viewFeed"></component>
    </div>
  </div>
</template>

<script>
import TopSize from '@/components/closet/feedback/TopSize';
import Deco from '@/components/closet/feedback/Deco';
import Detail from '@/components/closet/feedback/Detail';
import Finish from '@/components/closet/feedback/Finish';

export default {
  name: 'feedBack',
  components: {
    TopSize,
    Deco,
    Detail,
    Finish,
  },
  data() {
    return {
      viewFeed: 'TopSize',
    };
  },
};
</script>

<style scoped>
.feedBack {
  display: none;
  height: 640px;
  background-color: #a8a8a8;
}

.feedback-area {
  width: 694px;
}

.feedback-title {
  padding-top: 50px;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  text-align: center;
  color: #ffffff;
}
</style>
