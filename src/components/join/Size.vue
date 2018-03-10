<template>
  <div class="size subContent side-margin-50">
    <div class="size-title">사이즈</div>
    <div class="explain mt10">
      다음 질문들은 스타일리스트가 체형을 정확히 파악하여 연출하는데 도움이 됩니다.
    </div>
    <div class="sizeLine mt25"></div>
    <div class="size-form mt40" style="width: 392px; margin: auto;">
      <sizeSlider></sizeSlider>
      <sizeSlider></sizeSlider>
      <sizeSlider></sizeSlider>
      <sizeSlider></sizeSlider>
      <div class="mt50">
        <button class="button-login">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SizeSlider from '@/components/join/SizeSlider';

export default {
  name: 'size',
  components: {
    SizeSlider,
  },
};
</script>

<style scoped>
.size {
  width: 820px;
  text-align: center;
  margin: auto;
}

.size-title {
  font-size: 36px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.26;
  letter-spacing: -0.4px;
  text-align: center;
  color: #212121;
  text-shadow: 0px 1px 0 rgba(0, 0, 0, 0.1);
}

.explain {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.11;
  letter-spacing: -0.2px;
  text-align: center;
  color: #212121;
}

.divIB {
  display: inline-block;
}

.sizeLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}
</style>
