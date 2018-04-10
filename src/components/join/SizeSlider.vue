<template>
  <div class="sizeScroll mt35" :data-main="dataId">
    <span class="sizeText divIB">{{ sizeTitle }}</span>
    <i class="fa fa-exclamation-circle tooltip-group" @mouseover="toolTipEvt" @mouseleave="toolTipEvt"></i>
    <div class="tooltipLocation tooltip-group">
      <toolTip ref="tooltip" :tooltipText="customTooltip" :mobileSizeTip="false"></toolTip>
    </div>
    <span class="sizeDetailText" v-if="sizeTitle === '가슴'">(브래지어)</span>
    <span class="sizeDetailText hip-area" v-else-if="sizeTitle === '힙'">(팬티)</span>
    <div class="sizeBar divIB" :data-id="dataId">
      <vue-slider
        v-model="sliderValue"
        :interval="customInterval"
        :min="customMinimum"
        :max="customMaximum"
        :height="this.height"
        :style="sliderOption.paddingBottom"
        :bgStyle="sliderOption.bgStyle"
        :processStyle="sliderOption.processStyle"
        :dotSize="0"
      >
        <template slot="tooltip" slot-scope="{ value }">
          <div class="custom-tooltip" @mousedown="dragStart" @mousemove="dragMove" @mouseup="dragUp">
            <div class="custom-caret">
              <i class="fa fa-caret-down fa-lg"></i>
            </div>
            <div class="custom-text">
              <template v-if="sizeTitle === '허리'">
                {{ value }} inch
              </template>
              <template v-else>
                {{ value }} cm
              </template>
            </div>
          </div>
        </template>
      </vue-slider>
    </div>
    <div class="sizeInput divIB" :data-val="dataId">
      <template v-if="sizeTitle === '허리'">
        <input type="text" name="cusInput" value="0" maxlength="3" @keydown="$common.NumberValidateEvt" style="margin-left: 12px;" @keyup="sizeKeyEvt" />
        <span class="sizeDisplay">
          inch
        </span>
      </template>
      <template v-else>
        <input type="text" name="cusInput" value="0" maxlength="3" @keydown="$common.NumberValidateEvt" style="margin-left: 20px;" @keyup="sizeKeyEvt" />
        <span class="sizeDisplay" style="margin-left: 63px;">
          cm
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component';
import ToolTip from '@/components/join/common/ToolTip';

export default {
  name: 'sizeSlider',
  components: {
    vueSlider,
    ToolTip,
  },
  props: {
    dataId: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 2,
    },
    sizeTitle: {
      type: String,
      default: '',
    },
    customValue: {
      type: Number,
      default: 0,
    },
    customInterval: {
      type: Number,
      default: 1,
    },
    customMinimum: {
      type: Number,
      default: 140,
    },
    customMaximum: {
      type: Number,
      default: 200,
    },
    customTooltip: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dragPoint: false,
      sliderValue: 0,
      sliderOption: {
        height: 2,
        bgStyle: {
          backgroundColor: '#212121',
        },
        tooltipStyle: {
          backgroundColor: '#212121',
        },
        processStyle: {
          backgroundColor: '#212121',
        },
      },
    };
  },
  methods: {
    sizeKeyEvt(evt) {
      if (parseInt(evt.target.value, 10) >= this.customMinimum && parseInt(evt.target.value, 10) <= this.customMaximum) {
        this.sliderValue = evt.target.value;
      }
    },
    toolTipEvt() {
      this.$refs.tooltip.toolTipEvt();
    },
    dragStart() {
      this.dragPoint = true;
    },
    dragMove() {
      if (this.dragPoint) {
        document.querySelector(`div[data-id="${this.dataId}"] i`).style.color = '#fb5143';
        document.querySelector(`div[data-id="${this.dataId}"] .custom-text`).style.color = '#fb5143';
        document.querySelector(`div[data-id="${this.dataId}"] .custom-text`).style.display = 'block';
      }
    },
    dragUp() {
      this.dragPoint = false;
      document.querySelector(`div[data-id="${this.dataId}"] i`).style.color = '#212121';
      document.querySelector(`div[data-id="${this.dataId}"] .custom-text`).style.color = '#797979';
      document.querySelector(`div[data-id="${this.dataId}"] .custom-text`).style.display = 'none';

      document.querySelector(`div[data-val="${this.dataId}"] input[name=cusInput]`).value = this.sliderValue;
    },
    initSize() {
      if (this.customValue > 0) this.sliderValue = this.customValue;
      else this.sliderValue = this.customMinimum;
    },
  },
  watch: {
    customValue() {
      this.initSize();
    },
    sliderValue() {
      document.querySelector(`div[data-val="${this.dataId}"] input[name=cusInput]`).value = this.sliderValue;
    },
  },
  created() {
    this.initSize();
    window.addEventListener('mouseup', this.dragUp);
  },
  mounted() {
    const pieceWise = document.querySelector(`div[data-id="${this.dataId}"] .vue-slider-piecewise`);

    pieceWise.style.paddingBottom = '13px';
    pieceWise.style.cursor = 'pointer';

    document.querySelector(`div[data-val="${this.dataId}"] input[name=cusInput]`).value = this.sliderValue;

    const iconLocation = document.querySelector(`div[data-main="${this.dataId}"] i.fa-exclamation-circle`);
    const tooltipLocation = document.querySelector(`div[data-main="${this.dataId}"] .tooltipLocation`);

    if (this.sizeTitle === '키') {
      iconLocation.style.cssText = 'left: -16px;';
      tooltipLocation.style.cssText = 'left: -9%;';
    } else if (this.sizeTitle === '힙') {
      iconLocation.style.cssText = 'left: -16px;';
      tooltipLocation.style.cssText = 'left: -22%;';
    } else if (this.sizeTitle === '가슴') {
      tooltipLocation.style.cssText = 'left: -17%;';
    } else if (this.sizeTitle === '허리') {
      tooltipLocation.style.cssText = 'left: -8.8%;';
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
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.67;
  letter-spacing: -2px;
  color: #212121;
  width: 32px;
}

.sizeDetailText {
  position: absolute;
  top: 70%;
  left: 0%;
}

.sizeBar {
  width: 212px;
  margin-left: 52px;
  padding-bottom: 5px;
}

.sizeInput input {
  width: 38px;
  box-shadow: none;
  border: none;
  font-size: 17px;
  text-align: right;
  caret-color: black;
  font-weight: 500;
}

.sizeDisplay {
  position: absolute;
  margin-left: 55px;
  margin-top: -22px;
}

.custom-tooltip {
  positon: relative;
}

.custom-caret {
  position: absolute;
  top: -10px;
  left: -5px;
}

.custom-text {
  position: absolute;
  top: 12px;
  left: -10px;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: -0.4px;
  text-align: left;
  color: #797979;
  display: none;
}

input:focus{
  color: black;
  outline: none;
}

.fa-exclamation-circle {
  position: relative;
  bottom: 1px;
  left: 0;
  color: #aaaaaa;
  cursor: pointer;
}

.tooltipLocation {
  position: absolute;
  z-index: 5;
  left: 6%;
  top: 88%;
}

@media screen and (max-width: 486px) {
  .sizeBar {
    width: 70%;
    margin-left: 5px;
    padding-bottom: 5px;
  }

  .sizeText {
    display: block;
  }

  .sizeDetailText {
    left: 12%;
    top: 18%;
  }

  .hip-area {
    left: 6%;
  }

  .tooltip-group {
    display: none;
  }
}
</style>
