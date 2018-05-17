<template>
  <div class="detail-feed mt30">
    <div class="detail-feed-title">마음에 들었던 의상의 포인트 장식을 선택해주세요.</div>
    <div class="mt30 greyLine"></div>
    <slideArrow
      arrowSize="201"
      dotSize="355"
      skipSize="343"
    ></slideArrow>
    <div class="detail-feed-slide">
      <div class="detail-feed-content">
        <div class="detail-feed-box" style="margin-right: 12px;"># 포인트장식</div>
        <div class="detail-feed-box"># 포인트장식</div>
        <div class="detail-feed-box mt10" style="margin-right: 12px;"># 포인트장식</div>
        <div class="detail-feed-box mt10"># 포인트장식</div>
        <div class="detail-feed-box mt10" style="margin-right: 12px;"># 포인트장식</div>
        <div class="detail-feed-box mt10"># 포인트장식</div>
        <div class="detail-feed-box mt10" style="margin-right: 12px;"># 포인트장식</div>
        <div class="detail-feed-box mt10"># 포인트장식</div>
        <div class="detail-feed-box mt10" style="margin-right: 12px;"># 포인트장식</div>
        <div class="detail-feed-box mt10"># 포인트장식</div>
      </div>
    </div>
  </div>
</template>

<script>
import SlideArrow from '@/components/closet/feedback/SlideArrow';

export default {
  name: 'detail',
  components: {
    SlideArrow,
  },
  methods: {
    prevNavi() {
      this.$parent.viewFeed = 'TopSize';
    },
    nextNavi() {
      this.$parent.viewFeed = 'TopSize';
    },
  },
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
  height: 383px;
  background-color: #f4f4f4;
}

.detail-feed-btn-all {
  display: flex;
  justify-content: space-between;
}

.greyLine {
  opacity: 0.4;
  background-color: #FFFFFF;
}

.detail-feed-content {
  height: 100%;
  box-sizing: border-box;
  padding: 67px 106px;
}

.detail-feed-box {
  display: inline-block;
  text-align: center;
  width: 230px;
  height: 40px;
  line-height: 40px;
  border: solid 1px #737373;
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #333333;
}
</style>
