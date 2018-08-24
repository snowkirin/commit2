<template>
  <div class="detail-feed mt30">
    <div class="detail-feed-title">
      소중한 피드백을 반영하여<br/>
      내일의 옷장에서 제안해 드리겠습니다.<br/><br/>
      감사합니다.<br/>
    </div>
    <button class="button-survey mt30">확인</button>
  </div>
</template>

<script>
export default {
  name: 'finish',
  components: {},
  methods: {},
  mounted() {
    document.querySelector('.feedback-area').style.cssText =
      'position: relative; top: 15%;';
  }
};
</script>

<style scoped>
.detail-feed-title {
  font-size: 27px;
  line-height: 1.6;
  letter-spacing: -1.7px;
  text-align: center;
  color: #ffffff;
}

.button-survey {
  display: block;
  margin: auto;
  width: 30%;
  height: 40px;
}
</style>
