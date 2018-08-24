<template>
  <div class="slideArrow">
    <div class="slideArrow-left" @click="$parent.prevNavi">
      <div class="btn-times-left"></div>
      <div class="navi-font left-navi">
        2 / 3
      </div>
    </div>
    <div class="slideArrow-right" @click="$parent.nextNavi">
      <div class="btn-times-right"></div>
      <div class="navi-font right-navi">
        2 / 3
      </div>
    </div>
    <div class="slideDot">
      <div class="slidedot-dt"></div>
      <div class="slidedot-dt slidedot-dt-active"></div>
      <div class="slidedot-dt"></div>
      <div class="slidedot-dt"></div>
    </div>
    <div class="skip-area">
      여기까지 제출
    </div>
  </div>
</template>

<script>
export default {
  name: 'slideArrow',
  props: {
    arrowSize: {
      type: String,
      default: '150'
    },
    dotSize: {
      type: String,
      default: '295'
    },
    skipSize: {
      type: String,
      default: '283'
    },
    prevLocation: {
      type: String,
      default: ''
    }
  },
  mounted() {
    document.querySelector('.slideArrow-left').style.top = `${
      this.arrowSize
    }px`;
    document.querySelector('.slideArrow-right').style.top = `${
      this.arrowSize
    }px`;
    document.querySelector('.slideDot').style.top = `${this.dotSize}px`;
    document.querySelector('.skip-area').style.top = `${this.skipSize}px`;
  }
};
</script>

<style scoped>
.slideArrow {
  position: relative;
  height: 30px;
}

.slideArrow-left {
  display: inline-block;
  cursor: pointer;
  width: 29px;
  height: 55px;
  position: relative;
  left: -7.1%;
  top: 150px;
}

.slideArrow-right {
  display: inline-block;
  cursor: pointer;
  width: 29px;
  height: 55px;
  position: relative;
  left: 95.2%;
  top: 150px;
}

div.btn-times-left {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
}

div.btn-times-left:before,
div.btn-times-left:after {
  content: "";
  position: absolute;
  width: 30px;
  height: 1px;
  background-color: #ffffff;
  border-radius: 2px;
  top: 23px;
  box-shadow: 0 0 2px 0 #ccc;
}

div.btn-times-left:before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  left: 9px;
}

div.btn-times-left:after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: -10px;
  top: 2px;
}

div.btn-times-right {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
}

div.btn-times-right:before,
div.btn-times-right:after {
  content: "";
  position: absolute;
  width: 30px;
  height: 1px;
  background-color: #ffffff;
  border-radius: 2px;
  top: 23px;
  box-shadow: 0 0 2px 0 #ccc;
}

div.btn-times-right:before {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  left: 9px;
}

div.btn-times-right:after {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  right: -10px;
  top: 2px;
}

.navi-font {
  font-size: 16px;
  line-height: 1;
  letter-spacing: -1.5px;
  color: #ffffff;
  text-align: center;
}

.left-navi,
.right-navi {
  width: 50px;
}

.slideDot {
  display: flex;
  justify-content: center;
  position: relative;
  top: 295px;
}

.slidedot-dt {
  width: 10px;
  height: 10px;
  background-color: #dbdbdb;
  border-radius: 50%;
  margin-left: 10px;
}

.slidedot-dt-active {
  background-color: #333333;
}

.skip-area {
  display: inline-block;
  position: relative;
  top: 283px;
  left: 593px;
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #ffffff;
  text-decoration: underline;
}
</style>
