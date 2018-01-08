<template>
  <div class="ui grid">
    <div class="two column row ">
      <div class="column">
        <img v-bind:src="images.image1">
      </div>
      <div class="column">
        <h4>1.스타일초이스</h4>
        <p>
          스타일 진단을 통한 취향분석을 기반으로 스타일리스트가 제안한 2가지 룩 중 마음에 드는 의상을 선택합니다.
        </p>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;# 선택하지 않은 경우 첫 번째 의상이 자동으로 발송됩니다.
    </div>
    <div class="two column row">
      <div class="column">
          <img v-bind:src="images.image2">
      </div>
      <div class="column">
        <h4>2.정기 구독 </h4>
        <p>
          2주 단위로 화, 목요일 중 배송 받고 싶은 날짜를 선택 하여 스타일링 된 옷을 받게됩니다.
        </p>
      </div>
    </div>
    <div class="two column row">
      <div class="column">
          <img v-bind:src="images.image3">
      </div>
      <div class="column">
        <h4>3. 구매 or 반납</h4>
        <p>
          2주동안 입어본 의상을 반납 or 구매합니다.
        </p>
      </div>
    </div>
    <div class="two column row">
      <div class="column">
        <img v-bind:src="images.image4">
      </div>
      <div class="column">
        <h4>4. 피드백 작성</h4>
        <p>
          의상에 대한 의견을 작성해주세요 다음 스타일링에 반영이 되어집니다.
        </p>
      </div>
    </div>
    <div class="wrapper">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/grL6UtBeiiU" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'story-process',
  components: {
  },
  computed: mapGetters([
    'images',
  ]),
  methods: {
    ...mapActions([
    ]),
  },
  created() {
    this.$store.dispatch('setMainProcessImageList');
  },
};
</script>

<style>

iframe{
  max-width: 100% !important;
}

.verticalCenter{
  vertical-align: middle;
}
</style>
