<template>
  <div class="sizeScroll mt35">
    <span class="sizeText divIB">바지</span>
    <div class="sizeBar divIB">
      <vue-slider
        v-model="sliderOption.value"
        :value="sliderOption.value"
        :height="this.height"
        :style="sliderOption.paddingBottom"
        :bgStyle="sliderOption.bgStyle"
        :processStyle="sliderOption.processStyle"
        :dotSize="0">
        <template slot="tooltip" slot-scope="{ value }">
          <div class="custom-tooltip">
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
      <input type="text" name="" v-model="sliderOption.value" maxlength="3" @keydown="$common.NumberValidateEvt" />
      <span class="sizeDisplay">cm</span>
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
    height: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
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
  },
};
</script>

<style scoped>
.divIB {
  display: inline-block;
}
.sizeScroll {
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

.sizeBar {
  width: 262px;
  margin-left: 20px;
  padding-bottom: 5px;
}

.sizeInput input {
  width: 45px;
  box-shadow: none;
  border: none;
  font-size: 17px;
  text-align: right;
  caret-color: black;
  font-weight: 500;
}

.sizeDisplay {
  position: absolute;
  margin-left: 48px;
  margin-top: -17px;
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
  top: 15px;
  left: -6px;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  text-align: left;
  color: #797979;
}

input:focus{
  color: black;
  outline: none;
}
</style>
