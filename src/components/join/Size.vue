<template>
  <div class="size subContent side-margin-50">
    <div class="content-title mt20">사이즈</div>
    <div class="explain mt20">
      다음 질문들은 스타일리스트가 체형을 정확히 파악하여 연출하는데 도움이 됩니다.
    </div>
    <div class="sizeLine mt25"></div>
    <div class="size-form mt40" style="width: 392px; margin: auto;">
      <sizeSlider></sizeSlider>
      <sizeSlider></sizeSlider>
      <sizeSlider></sizeSlider>
      <sizeSlider></sizeSlider>
      <div class="mt50">
        <button class="button-login" @click="moveNext">
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
  methods: {
    moveNext() {
      this.$router.push({ path: 'clothes' });
    },
  },
};
</script>

<style scoped>
.size {
  width: 820px;
  text-align: center;
  margin: auto;
}

.sizeLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}
</style>
