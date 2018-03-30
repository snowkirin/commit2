<template>
  <div class="size subContent mauto">
    <div class="content-title mt30">
      사이즈
      <styleMenu v-show="this.Authentication.authenticated"></styleMenu>
    </div>
    <div class="explain mt15">
      제공되는 스타일을 위해 필요한 정보입니다.
    </div>
    <div class="sizeLine mt25"></div>
    <div class="content-form mauto mt40">
      <sizeSlider
        ref="tall"
        :dataId="0"
        :customValue="loadSize('tall')"
        sizeTitle="키"
      ></sizeSlider>
      <sizeSlider
        ref="bust"
        :dataId="1"
        sizeTitle="가슴"
        :customValue="loadSize('bust')"
        :customInterval="5"
        :customMinimum="75"
        :customMaximum="95"
      ></sizeSlider>
      <sizeSlider
        ref="waist"
        :dataId="2"
        sizeTitle="허리"
        :customValue="loadSize('waist')"
        :customInterval="2"
        :customMinimum="24"
        :customMaximum="32"
      ></sizeSlider>
      <sizeSlider
        ref="hip"
        :dataId="3"
        sizeTitle="힙"
        :customValue="loadSize('hip')"
        :customInterval="5"
        :customMinimum="80"
        :customMaximum="100"
      ></sizeSlider>
      <styleButton></styleButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SizeSlider from '@/components/join/SizeSlider';
import StyleMenu from '@/components/join/common/StyleMenu';
import StyleButton from '@/components/join/common/StyleButton';

export default {
  name: 'size',
  components: {
    SizeSlider,
    StyleMenu,
    StyleButton,
  },
  computed: {
    ...mapGetters({
      Authentication: 'login/Authentication',
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
  },
  methods: {
    ...mapActions({
      setSizeData: 'signup/setSizeData',
      setMypageStyle: 'mypage/setMypageStyle',
    }),
    loadSize(type) {
      let rtn = 0;
      if (type === 'tall') rtn = (this.mypageStyleData.tall_size) ? this.mypageStyleData.tall_size : 0;
      else if (type === 'bust') rtn = (this.mypageStyleData.bust_size) ? this.mypageStyleData.bust_size : 0;
      else if (type === 'waist') rtn = (this.mypageStyleData.waist_size) ? this.mypageStyleData.waist_size : 0;
      else if (type === 'hip') rtn = (this.mypageStyleData.hip_size) ? this.mypageStyleData.hip_size : 0;

      return rtn;
    },
    stylingMenuOnoff() {
      const mnu = document.querySelector('.content-menu-box');

      if (mnu.style.display === 'none') mnu.style.display = 'block';
      else mnu.style.display = 'none';
    },
    saveSize() {
      this.setSizeData({
        bust: this.$refs.bust.sliderOption.value,
        waist: this.$refs.waist.sliderOption.value,
        heap: this.$refs.hip.sliderOption.value,
        tall: this.$refs.tall.sliderOption.value,
      });
    },
    moveNext() {
      this.saveSize();
      this.$router.push({ path: 'styling' });
    },
  },
  async created() {
    if (this.Authentication.authenticated) {
      if (!this.mypageStyleData.bust_size) await this.setMypageStyle();
    }
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
