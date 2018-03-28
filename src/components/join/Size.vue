<template>
  <div class="size subContent mauto">
    <div class="content-title mt30">사이즈</div>
    <div class="explain mt15">
      제공되는 스타일을 위해 필요한 정보입니다.
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
      this.$router.push({ path: 'styling' });
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
