<template>
  <div class="size subContent mauto">
    <div class="content-title mt70">
      사이즈
      <styleMenu v-show="this.Authentication.authenticated"></styleMenu>
    </div>
    <div class="explain mt8">
      제공되는 스타일을 위해 필요한 정보입니다.
    </div>
    <div class="sizeLine mt25"></div>
    <div class="size-tt-text mauto mt40">
      치수 측정 <i class="fa fa-exclamation-circle" @click="toolTipEvt"></i>
    </div>
    <div class="tooltipLocation tooltip-group">
      <toolTip ref="mtooltip" :mobileSizeTip="true"></toolTip>
    </div>
    <div class="content-form mauto mt40">
      <sizeSlider
        ref="tall"
        :dataId="0"
        :customValue="loadSize('tall')"
        sizeTitle="키"
        customTooltip="최근에 측정된 키를 입력해주세요."
      ></sizeSlider>
      <sizeSlider
        ref="bust"
        :dataId="1"
        sizeTitle="가슴"
        :customValue="loadSize('bust')"
        :customInterval="5"
        :customMinimum="75"
        :customMaximum="95"
        customTooltip="평상시 착용 하시는 브래지어 사이즈에서 앞에 있는 숫자를 입력해 주세요. 예를 들어 지금 착용하신 브래지어에 80A 이라고 라벨에 적혀 있다면, 80 이라고 입력 해주세요."
      ></sizeSlider>
      <sizeSlider
        ref="waist"
        :dataId="2"
        sizeTitle="허리"
        :customValue="loadSize('waist')"
        :customInterval="2"
        :customMinimum="24"
        :customMaximum="32"
        customTooltip="즐겨 입으시는 바지의 인치를 입력 해주세요."
      ></sizeSlider>
      <sizeSlider
        ref="hip"
        :dataId="3"
        sizeTitle="힙"
        :customValue="loadSize('hip')"
        :customInterval="5"
        :customMinimum="80"
        :customMaximum="100"
        customTooltip="평상시 착용 하시는 팬티의 사이즈 숫자를 입력해 주세요. 예를 들어 지금 착용하신 팬티에 90 이라고 라벨에 적혀 있다면, 90이라고 입력 해주세요."
      ></sizeSlider>
      <styleButton currentLocation="size" currentNumber="1"></styleButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SizeSlider from '@/components/join/SizeSlider';
import StyleMenu from '@/components/join/common/StyleMenu';
import StyleButton from '@/components/join/common/StyleButton';
import ToolTip from '@/components/join/common/ToolTip';

export default {
  name: 'size',
  data() {
    return {
      clickCount: 0,
    };
  },
  components: {
    SizeSlider,
    StyleMenu,
    StyleButton,
    ToolTip,
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
      setMypageCache: 'mypage/setMypageCache',
    }),
    toolTipEvt() {
      this.$refs.mtooltip.toolTipEvt();
    },
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
    async saveSize() {
      const saveData = {
        bust: this.$refs.bust.sliderValue,
        waist: this.$refs.waist.sliderValue,
        hip: this.$refs.hip.sliderValue,
        tall: this.$refs.tall.sliderValue,
      };

      await this.setSizeData(saveData);
      this.$localStorage.set('S1', JSON.stringify(saveData));
    },
    moveNext() {
      this.saveSize();
      this.$router.push({ path: 'styling' });
    },
  },
  async created() {
    let localStorage = this.$localStorage.get('S1');

    if (this.Authentication.authenticated) {
      if (!this.mypageStyleData.bust_size) await this.setMypageStyle();
    } else if (localStorage) {
      localStorage = JSON.parse(localStorage);
      this.setMypageCache({
        tall_size: localStorage.tall,
        bust_size: localStorage.bust,
        waist_size: localStorage.waist,
        hip_size: localStorage.hip,
      });
    }
  },
};
</script>

<style scoped>
.size {
  position: relative;
  text-align: center;
}

.sizeLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.size-tt-text {
  width: 392px;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #212121;
}

.fa-exclamation-circle {
  display: none;
}

.tooltipLocation {
  position: absolute;
  z-index: 5;
  left: -1%;
  top: 24%;
}

@media screen and (max-width: 486px) {
  .size-tt-text {
    width: 100%;
  }

  .fa-exclamation-circle {
    display: inline-block;
    color: #aaaaaa;
    cursor: pointer;
  }
}
</style>
