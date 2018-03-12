<template>
  <div class="sizeScroll mt30">
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
      <input type="text" name="" v-model="sliderOption.value" maxlength="3" @keydown="validate" />
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
    validate(evt) {
      const allowKeyCode = [8, 37, 38, 39, 40, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
      const theEvent = evt || window.event;
      let key = theEvent.keyCode || theEvent.which;
      if (allowKeyCode.includes(key)) return true;
      key = String.fromCharCode(key);
      const regex = /[0-9]|\./;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }

      return false;
    },
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
}

input:focus{
  color: black;
  outline: none;
}
</style>
