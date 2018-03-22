<template>
  <div class="sizeScroll mt35">
    <span class="sizeText divIB">{{ sizeTitle }}</span>
    <span class="sizeDetailText" v-if="sizeTitle === '가슴'">(브래지어)</span>
    <span class="sizeDetailText" v-else-if="sizeTitle === '힙'">(팬티)</span>
    <div class="sizeBar divIB" :data-id="dataId">
      <vue-slider
        v-model="sliderOption.value"
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
              {{ value }}cm
            </div>
          </div>
        </template>
      </vue-slider>
    </div>
    <div class="sizeInput divIB">
      <template v-if="sizeTitle === '허리'">
        <input type="text" name="" v-model="sliderOption.value" maxlength="3" @keydown="$common.NumberValidateEvt" style="margin-left: 12px;" />
        <span class="sizeDisplay">
          inch
        </span>
      </template>
      <template v-else>
        <input type="text" name="" v-model="sliderOption.value" maxlength="3" @keydown="$common.NumberValidateEvt" style="margin-left: 20px;" />
        <span class="sizeDisplay" style="margin-left: 63px;">
          cm
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component';

export default {
  name: 'sizeSlider',
  components: {
    vueSlider,
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
  },
  data() {
    return {
      dragPoint: false,
      sliderOption: {
        value: 0,
        height: 2,
        style: {
          paddingBottom: '5px',
        },
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
    },
  },
  created() {
    this.sliderOption.value = this.customMinimum;

    window.addEventListener('mouseup', this.dragUp);
  },
  mounted() {
    const pieceWise = document.querySelector(`div[data-id="${this.dataId}"] .vue-slider-piecewise`);

    pieceWise.style.paddingBottom = '13px';
    pieceWise.style.cursor = 'pointer';
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
</style>
