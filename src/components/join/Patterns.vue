<template>
  <div class="patterns subContent mauto">
    <div class="content-title mt20">기피 패턴</div>
    <div class="explain mt20">
      받고 싶지 않은 품목을 모두 선택해주세요.
    </div>
    <div class="patternsLine mt25"></div>
    <div class="patterns-form w100 mt40 mauto" style="word-spacing: 0.4em;">
      <div class="patterns-card d-inlineblock">
        <div class="patterns-images">
          IMAGE
        </div>
        <div class="patterns-text">
          실루엣
        </div>
        <div class="patterns-btn">
          <div class="btn-times"></div>
        </div>
      </div>
      <div class="patterns-card d-inlineblock">
        <div class="patterns-images">
          IMAGE
        </div>
        <div class="patterns-text">
          실루엣명이
        </div>
        <div class="patterns-btn">
          <div class="btn-times"></div>
        </div>
      </div>
      <div class="patterns-card d-inlineblock">
        <div class="patterns-images">
          IMAGE
        </div>
        <div class="patterns-text">
          실루엣명이
        </div>
        <div class="patterns-btn">
          <div class="btn-times"></div>
        </div>
      </div>
      <div class="patterns-card d-inlineblock">
        <div class="patterns-images">
          IMAGE
        </div>
        <div class="patterns-text">
          실루엣명이
        </div>
        <div class="patterns-btn">
          <div class="btn-times"></div>
        </div>
      </div>
      <div class="patterns-card d-inlineblock">
        <div class="patterns-images">
          IMAGE
        </div>
        <div class="patterns-text">
          실루엣명이
        </div>
        <div class="patterns-btn">
          <div class="btn-times"></div>
        </div>
      </div>
      <div class="mt50">
        <div style="width: 392px; float: right;">
          <button class="button-login" @click="moveNext">
            다음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'patterns',
  components: {
  },
  methods: {
    cardHoverEvt(obj) {
      const target = obj;

      target.onmouseover = () => {
        target.querySelector('.patterns-btn').style.cssText = 'background-color: #fb5143; border: solid 2px #fb5143;';
        target.style.border = 'solid 2px #fb5143';
        target.style.backgroundColor = '#ebebeb';
        target.querySelector('.btn-times').classList.add('on');
      };

      target.onmouseout = () => {
        target.querySelector('.patterns-btn').style.cssText = 'background-color: #FFFFFF; border: solid 2px #dadada;';
        target.style.border = 'solid 2px #dadada';
        target.style.backgroundColor = '#FFFFFF';
        target.querySelector('.btn-times').classList.remove('on');
      };
    },
    moveNext() {
      this.$router.push({ path: 'styling' });
    },
  },
  mounted() {
    const patternsCard = document.querySelectorAll('.patterns-card');

    for (let i = 0; i < patternsCard.length; i += 1) {
      this.cardHoverEvt(patternsCard[i]);
    }
  },
};
</script>

<style scoped>
.patternsLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.patterns-card {
  width: 186px;
  height: 186px;
  background-color: #FFFFFF;
  border: solid 2px #dadada;
  position: relative;
  border-radius: 50%;
}

.patterns-images {
  padding: 15px;
  width: 160px;
  height: 180px;
}

.patterns-text {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: #333333;
  position: absolute;
  opacity: 1;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.patterns-btn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: solid 2px #dadada;
  background-color: #FFFFFF;
  position: absolute;
  opacity: 1;
  top: 10%;
  left: 87%;
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
  width: 30px;
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
  left: 8px;
}

div.btn-times:after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: 8px;
}

.on:before, .on:after {
  background-color: #FFFFFF !important;
  box-shadow: unset !important;
}
</style>
