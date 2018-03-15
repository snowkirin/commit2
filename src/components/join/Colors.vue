<template>
  <div class="colors subContent mauto">
    <div class="content-title mt20">색상 선택</div>
    <div class="explain mt20">
      다음 질문들은 스타일리스트가 체형을 정확히 파악하여 연출하는데 도움이 됩니다.
    </div>
    <div class="colorsLine mt25"></div>
    <div class="colors-form d-flex mt30 w100">
      <div class="colors-area">
        <div class="colors-title-detail">선호 색상</div>
        <div class="colors-card-list mt20">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
        </div>
        <div class="colors-card-list mt12">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
        </div>
        <div class="colors-card-list mt12">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
        </div>
        <div class="colors-card-list mt12">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
        </div>
        <div class="colors-card-list mt12">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">선택없음</span></div>
        </div>
      </div>
      <div style="width: 3%; position: relative;">
        <div class="line"></div>
      </div>
      <div class="colors-area">
        <div class="colors-title-detail">기피 색상</div>
        <div class="colors-card-list mt20">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
        </div>
        <div class="colors-card-list mt12">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
        </div>
        <div class="colors-card-list mt12">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
        </div>
        <div class="colors-card-list mt12">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
        </div>
        <div class="colors-card-list mt12">
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">블랙</span></div>
          <div class="colors-block"></div>
          <div class="colors-card"><span class="colors-card-text">선택없음</span></div>
        </div>
      </div>
    </div>

    <div class="mt30">
      <div style="width: 392px; float: right;">
        <button class="button-login" @click="moveNext">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'colors',
  components: {
  },
  methods: {
    moveNext() {
      this.$router.push({ path: 'clothes' });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.line {
  width: 1px;
  height: 98%;
  background-color: #dadada;
  margin: auto;
}

.colors {
  text-align: center;
}

.colorsLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.colors-area {
  width: 48.5%;
}

.colors-title-detail {
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #212121;
}

.colors-card-list {
}

.colors-card {
  width: 118px;
  height: 56px;
  display: inline-block;
  vertical-align: middle;
  background-color: #FFFFFF;
  border: solid 2px #dadada;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.5px;
  color: #333333;
}

.colors-card-text {
  position: relative;
  top: 25%;
}

.mt12 {
  margin-top: 12px;
}

.colors-block {
  display: inline-block;
  width: 1.1%;
}
</style>
