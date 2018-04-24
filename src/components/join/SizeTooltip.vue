<template>
  <div class="sizeScroll mt35" :data-main="dataId">
    <span class="sizeText divIB">{{ sizeTitle }}
      <span v-if="sizeTitle === '가슴'" class="description">(브래지어)</span>
      <span v-if="sizeTitle === '힙'" class="description">(팬티)</span>
    </span>
    <i class="fa fa-exclamation-circle tooltip-group" @mouseover="toolTipEvt" @mouseleave="toolTipEvt"></i>
    <div class="tooltipLocation tooltip-group">
      <toolTip ref="tooltip" :tooltipText="customTooltip" :mobileSizeTip="false"></toolTip>
    </div>
    <div v-if="sizeTitle !== '키'" class="size-each-group">
      <div class="size-each" v-for="(data, i) in dataSet" :key="i" v-bind:class="{ 'size-each-active': value === dataSet[i] }" @click="selectData(dataSet[i])">{{dataSet[i]}} {{sizeUnit}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import vueSlider from 'vue-slider-component';
import ToolTip from '@/components/join/common/ToolTip';

export default {
  name: 'sizeTooltip',
  components: {
    vueSlider,
    ToolTip,
  },
  props: {
    dataId: {
      type: Number,
      default: 0,
    },
    dataSet: {
      type: Array,
    },
    initData: {
      type: Object,
    },
    sizeUnit: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 2,
    },
    sizeTitle: {
      type: String,
      default: '',
    },
    customTooltip: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: 0,
    };
  },
  computed: {
    ...mapGetters({
      Authentication: 'login/Authentication',
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
  },
  watch: {
    initData(value) {
      if (this.sizeTitle === '가슴' && value.bust !== 0) {
        this.selectData(value.bust);
      } else if (this.sizeTitle === '허리' && value.waist !== 0) {
        this.selectData(value.waist);
      } else if (this.sizeTitle === '힙' && value.hip !== 0) {
        this.selectData(value.hip);
      }
    },
  },
  methods: {
    ...mapActions({
      setSizeData: 'signup/setSizeData',
      setMypageStyle: 'mypage/setMypageStyle',
      setMypageCache: 'mypage/setMypageCache',
    }),
    toolTipEvt() {
      this.$refs.tooltip.toolTipEvt();
    },
    selectData(data) {
      this.value = data;
      if (data !== null || data !== undefined) {
        if (this.sizeTitle === '가슴') this.$emit('update:bustError', false);
        else if (this.sizeTitle === '허리') this.$emit('update:waistError', false);
        else if (this.sizeTitle === '힙') this.$emit('update:hipError', false);
      }
    },
  },
  created() {
    window.addEventListener('mouseup', this.dragUp);
  },
  mounted() {
    const iconLocation = document.querySelector(`div[data-main="${this.dataId}"] i.fa-exclamation-circle`);
    const tooltipLocation = document.querySelector(`div[data-main="${this.dataId}"] .tooltipLocation`);

    if (this.sizeTitle === '키') {
      iconLocation.style.cssText = 'left: -16px;';
      tooltipLocation.style.cssText = 'left: -10%;';
    } else if (this.sizeTitle === '힙') {
      iconLocation.style.cssText = 'left: -16px;';
      tooltipLocation.style.cssText = 'left: -9%;';
    } else if (this.sizeTitle === '가슴') {
      tooltipLocation.style.cssText = 'left: 5%;';
    } else if (this.sizeTitle === '허리') {
      tooltipLocation.style.cssText = 'left: -10%;';
    }
  },
  destroyed() {
    window.removeEventListener('mouseup', this.dragUp);
  },
};
</script>

<style scoped>
.divIB {
  display: inline-block;
}
.sizeScroll {
  position: relative;
  text-align: left;
}

.sizeText {
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.67;
  letter-spacing: -1px;
  color: #212121;
}

input:focus{
  color: black;
  outline: none;
}

.fa-exclamation-circle {
  bottom: 1px;
  left: 0;
  color: #aaaaaa;
  cursor: pointer;
}

.tooltipLocation {
  position: absolute;
  z-index: 5;
  left: 6%;
}

.description {
  color:#797979;
  font-weight:normal;
}

@media screen and (max-width: 486px) {
  .sizeText {
    display: block;
  }

  .tooltip-group {
    display: none;
  }
}
</style>
