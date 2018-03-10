<template>
  <div class="sizeScroll mt30">
    <span class="sizeText divIB">바지</span>
    <div class="sizeBar divIB">
      <vue-slider
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
      <input type="text" name="" value="175" />
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
  letter-spacing: -0.2px;
  color: #212121;
  width: 32px;
}

.sizeBar {
  width: 264px;
  margin-left: 30px;
  padding-bottom: 5px;
}

.sizeInput input {
  width: 50px;
  box-shadow: none;
  border: none;
  font-size: 17px;
  text-align: right;
}

.sizeDisplay {
  position: absolute;
  padding-left: 55px;
  margin-top: -18px;
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
}
</style>
