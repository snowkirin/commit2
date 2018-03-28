<template>
  <div class="styling subContent mauto">
    <div class="content-title mt20">선호 스타일</div>
    <div class="explain mt20">
      ZULY는 베이직 스타일을 기본으로 합니다.
    </div>
    <div class="stylingLine mt25"></div>
    <div class="styling-form mt40" style="width: 100%;">
      <div class="zuly-style-circle mauto">
        <div class="zuly-circle-text">
          ZULY<br/>
          <span>베이직</span>
        </div>
        <div class="zuly-detail-circle circle-natural" @click="selectStyle($const.STYLE_NATURAL)">
          <div class="zuly-detail-circle-text">
            <span class="subject">네츄럴</span>
            <br/><span class="description">(편안하고 활동적인)</span>
          </div>
        </div>
        <div class="zuly-detail-circle circle-unique" @click="selectStyle($const.STYLE_UNIQUE)">
          <div class="zuly-detail-circle-text">
            <span class="subject">유니크</span>
            <br/><span class="description">(개성있고<br/>유행에 민감한)</span>
          </div>
        </div>
        <div class="zuly-detail-circle circle-classic" @click="selectStyle($const.STYLE_CLASSIC)">
          <div class="zuly-detail-circle-text">
            <span class="subject">클래식</span>
            <br/><span class="description">(지적이고<br/>덜유행타는)</span>
          </div>
        </div>
        <div class="zuly-detail-circle circle-modern" @click="selectStyle($const.STYLE_MODERN)">
          <div class="zuly-detail-circle-text">
            <span class="subject">모던</span>
            <br/><span class="description">(단정하고 시크한)</span>
          </div>
        </div>
        <div class="zuly-detail-circle circle-feminine" @click="selectStyle($const.STYLE_FEMININE)">
          <div class="zuly-detail-circle-text">
            <span class="subject">페미닌</span>
            <br/><span class="description">(여성스럽고<br/>부드러운)</span>
          </div>
        </div>
        <div class="circle-active"></div>
        <div class="circle-pick"></div>
      </div>
      <div class="mauto" style="width: 392px; margin-top: 100px;">
        <button class="button-login" @click="moveNext">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'styling',
  data() {
    return {
      activeCircle: null,
      natural: null,
      unique: null,
      modern: null,
      classic: null,
      feminine: null,
    };
  },
  computed: {
    ...mapGetters({
      selectMood: 'signup/getSelectMood',
    }),
  },
  methods: {
    ...mapActions({
      pickMood: 'signup/pickMood',
    }),
    selectStyle(data) {
      const imageTarget = document.querySelector('.circle-pick');

      if (data === this.$const.STYLE_NATURAL) this.pickClassEvt(this.natural, this.unique, this.classic, this.modern, this.feminine, imageTarget);
      else if (data === this.$const.STYLE_UNIQUE) this.pickClassEvt(this.unique, this.natural, this.modern, this.classic, this.feminine, imageTarget);
      else if (data === this.$const.STYLE_MODERN) this.pickClassEvt(this.modern, this.unique, this.feminine, this.natural, this.classic, imageTarget);
      else if (data === this.$const.STYLE_CLASSIC) this.pickClassEvt(this.classic, this.natural, this.feminine, this.modern, this.unique, imageTarget);
      else if (data === this.$const.STYLE_FEMININE) this.pickClassEvt(this.feminine, this.classic, this.modern, this.natural, this.unique, imageTarget);

      this.pickMood(data);
    },
    changeCircleImage(main, obj) {
      const target = obj;

      if (main === this.unique) {
        target.style.cssText = 'display: block; width: 118%; height: 100%; top: 44%; left: 59.5%;';
        target.style.backgroundImage = 'url("/static/img/signup/hover_unique.png")';
      } else if (main === this.natural) {
        target.style.cssText = 'display: block; width: 118%; height: 100%; top: 44%; left: 40.3%;';
        target.style.backgroundImage = 'url("/static/img/signup/hover_natural.png")';
      } else if (main === this.classic) {
        target.style.cssText = 'display: block; width: 100%; height: 122%; top: 55%; left: 26.3%';
        target.style.backgroundImage = 'url("/static/img/signup/hover_classic.png")';
      } else if (main === this.modern) {
        target.style.cssText = 'display: block; width: 100%; height: 122%; top: 55%; left: 73.7%';
        target.style.backgroundImage = 'url("/static/img/signup/hover_modern.png")';
      } else if (main === this.feminine) {
        target.style.cssText = 'display: block; width: 138%; height: 100%; top: 96%; left: 50%;';
        target.style.backgroundImage = 'url("/static/img/signup/hover_feminine.png")';
      }
    },
    pickClassEvt(main, sub1, sub2, outSub1, outSub2, imageTarget) {
      main.querySelector('span.subject').classList.add('zuly-detail-circle-pick-subject');
      main.classList.add('zuly-detail-circle-pick');
      sub1.classList.add('zuly-detail-circle-pick', 'zuly-circle-pick-second');
      sub2.classList.add('zuly-detail-circle-pick', 'zuly-circle-pick-second');

      outSub1.classList.add('zuly-circle-pick-deactive');
      outSub2.classList.add('zuly-circle-pick-deactive');
      this.changeCircleImage(main, imageTarget);
    },
    removePick() {
      const circlePick = document.querySelectorAll('.zuly-detail-circle-pick');
      const circlePickDeactive = document.querySelectorAll('.zuly-detail-circle-pick');

      if (circlePick.length > 0) {
        document.querySelector('.zuly-detail-circle-pick-subject').classList.remove('zuly-detail-circle-pick-subject');
        document.querySelector('.circle-pick').style.display = 'none';

        for (let i = 0; i < circlePick.length; i += 1) {
          circlePick[i].classList.remove('zuly-detail-circle-pick', 'zuly-circle-pick-second');
          if (circlePickDeactive[i]) circlePickDeactive[i].classList.remove('zuly-circle-pick-deactive');
        }
      }
    },
    circleHoverEvt(main, sub1, sub2, outSub1, outSub2) {
      const obj = main;

      obj.onmouseover = () => {
        this.removePick();
        obj.querySelector('span.subject').classList.add('zuly-detail-circle-active-subject');
        obj.classList.add('zuly-main-circle-active', 'zuly-detail-circle-active');
        sub1.classList.add('zuly-detail-circle-active', 'zuly-circle-active-second');
        sub2.classList.add('zuly-detail-circle-active', 'zuly-circle-active-second');

        outSub1.classList.add('zuly-circle-deactive');
        outSub2.classList.add('zuly-circle-deactive');
        this.changeCircleImage(main, this.activeCircle);
      };

      obj.onmouseout = () => {
        if (this.selectMood) this.selectStyle(this.selectMood);
        obj.querySelector('span.subject').classList.remove('zuly-detail-circle-active-subject');
        obj.classList.remove('zuly-main-circle-active', 'zuly-detail-circle-active');
        sub1.classList.remove('zuly-detail-circle-active', 'zuly-circle-active-second');
        sub2.classList.remove('zuly-detail-circle-active', 'zuly-circle-active-second');

        outSub1.classList.remove('zuly-circle-deactive');
        outSub2.classList.remove('zuly-circle-deactive');
        this.activeCircle.style.cssText = 'display: none;';
      };
    },
    moveNext() {
      this.$router.push({ path: 'colors' });
    },
  },
  created() {
  },
  mounted() {
    this.activeCircle = document.querySelector('.circle-active');
    this.natural = document.querySelector('.circle-natural');
    this.unique = document.querySelector('.circle-unique');
    this.classic = document.querySelector('.circle-classic');
    this.modern = document.querySelector('.circle-modern');
    this.feminine = document.querySelector('.circle-feminine');

    this.circleHoverEvt(this.natural, this.unique, this.classic, this.modern, this.feminine);
    this.circleHoverEvt(this.unique, this.natural, this.modern, this.classic, this.feminine);
    this.circleHoverEvt(this.classic, this.natural, this.feminine, this.modern, this.unique);
    this.circleHoverEvt(this.modern, this.unique, this.feminine, this.natural, this.classic);
    this.circleHoverEvt(this.feminine, this.classic, this.modern, this.natural, this.unique);

    if (this.selectMood) this.selectStyle(this.selectMood);
  },
};
</script>

<style scoped>
.stylingLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.styling-card {
  width: 489px;
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

.zuly-style-circle {
  position: relative;
  display: table;
  width: 453px;
  height: 453px;
  border: solid 2px #000000;
  border-radius: 50%;
}

.zuly-circle-text {
  display: table-cell;
  vertical-align: middle;
  font-size: 36px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  color: #212121;
}

.zuly-circle-text span {
  font-weight: normal;
  letter-spacing: -0.9px;
}

.zuly-detail-circle {
  cursor: pointer;
  position: absolute;
  display: table;
  width: 180px;
  height: 180px;
  background-color: #f4f4f4;
  border-radius: 50%;
}

.zuly-detail-circle-text {
  display: table-cell;
  vertical-align: middle;
  font-size: 18px;
  line-height: 1;
  text-align: center;
  color: #212121;
}

.zuly-detail-circle-text span.description {
  display: inline-block;
  margin-top: 8px;
  font-size: 16px;
  line-height: 1.6;
}

.circle-natural {
  top: 15%;
  left: 22.3%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.circle-unique {
  top: 15%;
  left: 77.7%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.circle-feminine {
  top: 95%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.circle-classic {
  top: 66.5%;
  left: 3%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.circle-modern {
  top: 66.5%;
  left: 97%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.circle-active {
  z-index: -1;
  display: none;
  background-image: url('/static/img/signup/hover_natural.png');
  background-repeat: no-repeat;
  background-position: 50% 0;
  position: absolute;
  width: 118%;
  height: 100%;
  top: 44%;
  left: 40.3%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.zuly-main-circle-active {
  width: 180px !important;
  height: 180px !important;
}

.zuly-detail-circle-active {
  z-index: 1;
  background-color: #FFFFFF;
}

.zuly-detail-circle-active-subject {
  font-size: 27px;
  line-height: 0.96;
  letter-spacing: -0.7px;
  color: #f45649;
}

.zuly-circle-active-second {
  width: 160px;
  height: 160px;
}

.zuly-circle-deactive {
  width: 144px;
  height: 144px;
}

.zuly-detail-circle-pick {
  z-index: 1;
  background-color: #FFFFFF;
}

.zuly-detail-circle-pick-subject {
  font-size: 27px;
  line-height: 0.96;
  letter-spacing: -0.7px;
  color: #f45649;
}

.zuly-circle-pick-second {
  width: 160px;
  height: 160px;
}

.zuly-circle-pick-deactive {
  width: 144px;
  height: 144px;
}

.circle-pick {
  display: none;
  z-index: -1;
  background-repeat: no-repeat;
  background-position: 50% 0;
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
