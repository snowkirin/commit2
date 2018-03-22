<template>
  <div class="size subContent mauto">
    <div class="content-title mt20">사이즈</div>
    <div class="explain mt20">
      다음 질문들은 스타일리스트가 체형을 정확히 파악하여 연출하는데 도움이 됩니다.
    </div>
    <div class="sizeLine mt25"></div>
    <div class="content-form mauto mt40">
      <sizeSlider
        ref="tall"
        :dataId="0"
        sizeTitle="키"
      ></sizeSlider>
      <sizeSlider
        ref="bust"
        :dataId="1"
        sizeTitle="가슴"
        :customInterval="2.5"
        :customMinimum="80"
        :customMaximum="90"
      ></sizeSlider>
      <sizeSlider
        ref="waist"
        :dataId="2"
        sizeTitle="허리"
        :customInterval="2"
        :customMinimum="24"
        :customMaximum="32"
      ></sizeSlider>
      <sizeSlider
        ref="heap"
        :dataId="3"
        sizeTitle="힙"
        :customInterval="5"
        :customMinimum="80"
        :customMaximum="100"
      ></sizeSlider>
      <div class="mt50">
        <button class="button-login" @click="moveNext">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SizeSlider from '@/components/join/SizeSlider';

export default {
  name: 'size',
  components: {
    SizeSlider,
  },
  methods: {
    ...mapActions({
      setSizeData: 'signup/setSizeData',
    }),
    saveSize() {
      this.setSizeData({
        bust: this.$refs.bust.sliderOption.value,
        waist: this.$refs.waist.sliderOption.value,
        heap: this.$refs.heap.sliderOption.value,
        tall: this.$refs.tall.sliderOption.value,
      });
    },
    moveNext() {
      this.saveSize();
      this.$router.push({ path: 'colors' });
    },
  },
};
</script>

<style scoped>
.size {
  text-align: center;
}

.sizeLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}
</style>
