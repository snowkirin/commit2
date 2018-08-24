<template>
  <div class="detail-feed mt30">
    <div class="detail-feed-title">상의 부위별 사이즈 중 아쉬운 부분이 있다면 선택해 주세요.</div>
    <div class="mt30 greyLine"></div>
    <div class="detail-feed-btn-all mt30">
      <button class="button-survey">아주 컸어요</button>
      <button class="button-survey">약간 컸어요</button>
      <button class="button-survey">약간 작았어요</button>
      <button class="button-survey">딱 맞았어요</button>
    </div>
    <slideArrow></slideArrow>
    <div class="detail-feed-slide"></div>
  </div>
</template>

<script>
import SlideArrow from '@/components/closet/feedback/SlideArrow';

export default {
  name: 'topSize',
  components: {
    SlideArrow
  },
  methods: {
    prevNavi() {
      this.$parent.viewFeed = 'Deco';
    },
    nextNavi() {
      this.$parent.viewFeed = 'Deco';
    }
  }
};
</script>

<style scoped>
.detail-feed-title {
  font-size: 27px;
  line-height: 1;
  letter-spacing: -1.7px;
  text-align: center;
  color: #ffffff;
}

.button-survey {
  width: 23.5%;
  height: 40px;
}

.detail-feed-slide {
  height: 322px;
  background-color: #f4f4f4;
}

.detail-feed-btn-all {
  display: flex;
  justify-content: space-between;
}

.greyLine {
  opacity: 0.4;
  background-color: #ffffff;
}
</style>
