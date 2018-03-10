<template>
  <div class="styling subContent side-margin-50">
    <div class="styling-title">평소에 즐겨입는 스타일링을 선택해주세요.</div>
    <div class="explain mt10">
      당신의 이미지는 무엇입니까?
    </div>
    <div class="stylingLine mt25"></div>
    <div class="styling-form mt40" style="width: 100%; margin: auto;">
      <div class="styling-card divIB">
        <div class="styling-images">
          IMAGE
        </div>
        <div class="styling-text">
          실루엣
        </div>
        <div class="styling-btn">
          <div class="btn-times"></div>
        </div>
      </div>
      <div class="styling-card divIB">
        <div class="styling-images">
          IMAGE
        </div>
        <div class="styling-text">
          실루엣명이
        </div>
        <div class="styling-btn">
          <div class="btn-times"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'styling',
  components: {
  },
  methods: {
    cardHoverEvt(obj) {
      const target = obj;

      target.onmouseover = () => {
        target.querySelector('.styling-btn').style.cssText = 'background-color: #fb5143; border: solid 2px #fb5143;';
        target.style.border = 'solid 2px #fb5143';
        target.style.backgroundColor = '#ebebeb';
        target.querySelector('.btn-times').classList.add('on');
      };

      target.onmouseout = () => {
        target.querySelector('.styling-btn').style.cssText = 'background-color: #FFFFFF; border: solid 2px #dadada;';
        target.style.border = 'solid 2px #dadada';
        target.style.backgroundColor = '#FFFFFF';
        target.querySelector('.btn-times').classList.remove('on');
      };
    },
  },
  mounted() {
    const stylingCard = document.querySelectorAll('.styling-card');

    for (let i = 0; i < stylingCard.length; i += 1) {
      this.cardHoverEvt(stylingCard[i]);
    }
  },
};
</script>

<style scoped>
.styling {
  width: 1000px;
  text-align: center;
  margin: auto;
}

.styling-title {
  font-size: 36px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.26;
  letter-spacing: -0.4px;
  text-align: center;
  color: #212121;
  text-shadow: 0px 1px 0 rgba(0, 0, 0, 0.1);
}

.explain {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.11;
  letter-spacing: -0.2px;
  text-align: center;
  color: #212121;
}

.divIB {
  display: inline-block;
}

.stylingLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.styling-card {
  width: 494px;
  height: 245px;
  background-color: #FFFFFF;
  border: solid 2px #dadada;
  position: relative;
}

.styling-images {
  width: 100%;
  height: 100%;
}

.styling-text {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: #333333;
  padding-bottom: 15px;
  position: absolute;
  opacity: 1;
  top: 92%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.styling-btn {
  width: 49px;
  height: 49px;
  border: solid 2px #dadada;
  position: absolute;
  opacity: 1;
  top: 10%;
  left: 95%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

div.btn-times {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
}

div.btn-times:before, div.btn-times:after {
  content: '';
  position: absolute;
  width: 44px;
  height: 2px;
  background-color: #dadada;
  border-radius: 2px;
  top: 22px;
  box-shadow: 0 0 2px 0 #ccc;
}

div.btn-times:before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  left: 3px;
}

div.btn-times:after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: 3px;
}

.on:before, .on:after {
  background-color: #FFFFFF !important;
  box-shadow: unset !important;
}
</style>
