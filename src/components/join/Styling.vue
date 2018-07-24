<template>
  <div class="container">
    <div class="container-header">
      <p class="styling-title">
        <span v-show="!this.Authentication.authenticated">선호 스타일</span>
        <styleMenu v-show="this.Authentication.authenticated" menuTitle="선호 스타일"></styleMenu>
      </p>
      <p class="styling-text">줄라이는 베이직 스타일을 기본으로 합니다.</p>
      <div class="line line__default"></div>
    </div>
    <div class="contents">
      <div>
        <div class="styling-form" style="width: 100%;">
          <div class="zuly-style-circle mauto">
            <div class="zuly-circle-text">
              ZULY<br/>
              <span>베이직</span>
            </div>
            <div class="zuly-detail-circle circle-natural" @click="selectStyle($const.STYLE_NATURAL)">
              <div class="zuly-detail-circle-text">
                <span class="subject">내추럴</span>
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
          <div class="btn-next">
            <button type="button" class="btn btn-primary" @click="moveNext">
              <span>다음</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <alert-modal ref="view" width="320" height="190"></alert-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertModal from '@/components/common/AlertModal';
import StyleMenu from '@/components/join/common/StyleMenu';

export default {
  name: 'styling',
  components: {
    StyleMenu,
    AlertModal,
  },
  data() {
    return {
      recentMood: null,
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
      Authentication: 'login/Authentication',
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
  },
  methods: {
    ...mapActions({
      setMood: 'signup/setMood',
      setMypageStyle: 'mypage/setMypageStyle',
    }),
    selectStyle(data) {
      const imageTarget = document.querySelector('.circle-pick');
      if (data === this.$const.STYLE_NATURAL) this.pickClassEvt(this.natural, this.unique, this.classic, this.modern, this.feminine, imageTarget);
      else if (data === this.$const.STYLE_UNIQUE) this.pickClassEvt(this.unique, this.natural, this.modern, this.classic, this.feminine, imageTarget);
      else if (data === this.$const.STYLE_MODERN) this.pickClassEvt(this.modern, this.unique, this.feminine, this.natural, this.classic, imageTarget);
      else if (data === this.$const.STYLE_CLASSIC) this.pickClassEvt(this.classic, this.natural, this.feminine, this.modern, this.unique, imageTarget);
      else if (data === this.$const.STYLE_FEMININE) this.pickClassEvt(this.feminine, this.classic, this.modern, this.natural, this.unique, imageTarget);
      this.recentMood = data;
    },
    changeCircleImage(main, obj) {
      const target = obj;

      if (window.outerWidth <= 486) {
        if (main === this.unique) {
          target.style.cssText = 'display: block; width: 118%; height: 100%; top: 43%; left: 58.5%; background-size: 95%;';
          target.style.backgroundImage = 'url("/static/img/signup/hover_unique.png")';
        } else if (main === this.natural) {
          target.style.cssText = 'display: block; width: 118%; height: 100%; top: 43%; left: 40.3%; background-size: 95%;';
          target.style.backgroundImage = 'url("/static/img/signup/hover_natural.png")';
        } else if (main === this.classic) {
          target.style.cssText = 'display: block; width: 100%; height: 124%; top: 55%; left: 27.3%; background-size: 86%;';
          target.style.backgroundImage = 'url("/static/img/signup/hover_classic.png")';
        } else if (main === this.modern) {
          target.style.cssText = 'display: block; width: 100%; height: 124%; top: 55%; left: 72%; background-size: 86%;';
          target.style.backgroundImage = 'url("/static/img/signup/hover_modern.png")';
        } else if (main === this.feminine) {
          target.style.cssText = 'display: block; width: 138%; height: 100%; top: 93%; left: 50%; background-size: 95%;';
          target.style.backgroundImage = 'url("/static/img/signup/hover_feminine.png")';
        }

        return;
      }

      if (main === this.unique) {
        target.style.cssText = 'display: block; width: 118%; height: 100%; top: 44%; left: 59.5%;';
        target.style.backgroundImage = 'url("/static/img/signup/hover_unique.png")';
      } else if (main === this.natural) {
        target.style.cssText = 'display: block; width: 118%; height: 100%; top: 44%; left: 40.3%;';
        target.style.backgroundImage = 'url("/static/img/signup/hover_natural.png")';
      } else if (main === this.classic) {
        target.style.cssText = 'display: block; width: 100%; height: 124%; top: 55%; left: 26.3%;';
        target.style.backgroundImage = 'url("/static/img/signup/hover_classic.png")';
      } else if (main === this.modern) {
        target.style.cssText = 'display: block; width: 100%; height: 124%; top: 55%; left: 73.7%;';
        target.style.backgroundImage = 'url("/static/img/signup/hover_modern.png")';
      } else if (main === this.feminine) {
        target.style.cssText = 'display: block; width: 138%; height: 100%; top: 96%; left: 50%;';
        target.style.backgroundImage = 'url("/static/img/signup/hover_feminine.png")';
      }
    },
    pickClassEvt(main, sub1, sub2, outSub1, outSub2, imageTarget) {
      if (main) {
        this.removePick();

        main.querySelector('span.subject').classList.add('zuly-detail-circle-pick-subject');
        main.classList.add('zuly-detail-circle-pick');
        sub1.classList.add('zuly-detail-circle-pick', 'zuly-circle-pick-second');
        sub2.classList.add('zuly-detail-circle-pick', 'zuly-circle-pick-second');

        outSub1.classList.add('zuly-circle-pick-deactive');
        outSub2.classList.add('zuly-circle-pick-deactive');
        outSub1.querySelector('span.description').classList.add('zuly-circle-pick-none');
        outSub2.querySelector('span.description').classList.add('zuly-circle-pick-none');
        this.changeCircleImage(main, imageTarget);
      }
    },
    removePick() {
      const circlePick = document.querySelectorAll('.zuly-detail-circle-pick');
      const circlePickDeactive = document.querySelectorAll('.zuly-circle-pick-deactive');

      if (circlePick.length > 0) {
        document.querySelector('.zuly-detail-circle-pick-subject').classList.remove('zuly-detail-circle-pick-subject');
        document.querySelector('.circle-pick').style.display = 'none';

        for (let i = 0; i < circlePick.length; i += 1) {
          circlePick[i].classList.remove('zuly-detail-circle-pick', 'zuly-circle-pick-second');
        }

        for (let i = 0; i < circlePickDeactive.length; i += 1) {
          circlePickDeactive[i].classList.remove('zuly-circle-pick-deactive');
        }
      }
    },
    initHoverDivision() {
      this.activeCircle = document.querySelector('.circle-active');
      this.natural = document.querySelector('.circle-natural');
      this.unique = document.querySelector('.circle-unique');
      this.classic = document.querySelector('.circle-classic');
      this.modern = document.querySelector('.circle-modern');
      this.feminine = document.querySelector('.circle-feminine');
      if (this.$common.deviceCheck()) {
        this.circleHoverMobileEvt(this.natural, this.unique, this.classic, this.modern, this.feminine);
        this.circleHoverMobileEvt(this.unique, this.natural, this.modern, this.classic, this.feminine);
        this.circleHoverMobileEvt(this.classic, this.natural, this.feminine, this.modern, this.unique);
        this.circleHoverMobileEvt(this.modern, this.unique, this.feminine, this.natural, this.classic);
        this.circleHoverMobileEvt(this.feminine, this.classic, this.modern, this.natural, this.unique);
      } else {
        this.circleHoverEvt(this.natural, this.unique, this.classic, this.modern, this.feminine);
        this.circleHoverEvt(this.unique, this.natural, this.modern, this.classic, this.feminine);
        this.circleHoverEvt(this.classic, this.natural, this.feminine, this.modern, this.unique);
        this.circleHoverEvt(this.modern, this.unique, this.feminine, this.natural, this.classic);
        this.circleHoverEvt(this.feminine, this.classic, this.modern, this.natural, this.unique);
      }
    },
    circleHoverMobileEvt(main, sub1, sub2, outSub1, outSub2) {
      const obj = main;
      const outObj1 = outSub1;
      const outObj2 = outSub2;

      obj.onmouseclick = () => {
        this.removePick();
        obj.querySelector('span.subject').classList.add('zuly-detail-circle-active-subject');
        obj.classList.add('zuly-main-circle-active', 'zuly-detail-circle-active');
        sub1.classList.add('zuly-detail-circle-active', 'zuly-circle-active-second');
        sub2.classList.add('zuly-detail-circle-active', 'zuly-circle-active-second');

        outObj1.classList.add('zuly-circle-deactive');
        outObj2.classList.add('zuly-circle-deactive');
        outObj1.querySelector('span.description').style.display = 'none';
        outObj2.querySelector('span.description').style.display = 'none';
        this.changeCircleImage(main, this.activeCircle);
      };
    },
    circleHoverEvt(main, sub1, sub2, outSub1, outSub2) {
      const obj = main;
      const outObj1 = outSub1;
      const outObj2 = outSub2;

      obj.onmouseenter = () => {
        this.removePick();
        obj.querySelector('span.subject').classList.add('zuly-detail-circle-active-subject');
        obj.classList.add('zuly-main-circle-active', 'zuly-detail-circle-active');
        sub1.classList.add('zuly-detail-circle-active', 'zuly-circle-active-second');
        sub2.classList.add('zuly-detail-circle-active', 'zuly-circle-active-second');

        outObj1.classList.add('zuly-circle-deactive');
        outObj2.classList.add('zuly-circle-deactive');
        outObj1.querySelector('span.description').style.display = 'none';
        outObj2.querySelector('span.description').style.display = 'none';
        this.changeCircleImage(main, this.activeCircle);
      };

      obj.onmouseleave = () => {
        if (this.recentMood) this.selectStyle(this.recentMood);
        obj.querySelector('span.subject').classList.remove('zuly-detail-circle-active-subject');
        obj.classList.remove('zuly-main-circle-active', 'zuly-detail-circle-active');
        sub1.classList.remove('zuly-detail-circle-active', 'zuly-circle-active-second');
        sub2.classList.remove('zuly-detail-circle-active', 'zuly-circle-active-second');

        outObj1.classList.remove('zuly-circle-deactive');
        outObj2.classList.remove('zuly-circle-deactive');
        outObj1.querySelector('span.description').style.display = 'inline-block';
        outObj2.querySelector('span.description').style.display = 'inline-block';
        this.activeCircle.style.cssText = 'display: none;';
      };
    },
    moveNext() {
      if (this.recentMood === null) {
        this.$common.viewAlertModal('선호 스타일을 선택해 주세요.', this.$refs, 'alert');
        return;
      }
      this.setMood(this.recentMood);
      this.$localStorage.set('Mood', this.recentMood);
      this.$router.push({ path: '/join/signup' });
    },
  },
  async created() {
    const localStorage = this.$localStorage.get('Mood');
    if (localStorage) {
      this.recentMood = localStorage;
    }
    /* TODO: 왜 사용하는걸까? */
    // if (this.Authentication.authenticated) {
    //   if (!this.mypageStyleData.bust_size) await this.setMypageStyle();
    //   this.selectStyle(this.mypageStyleData.moodCode.toString());
    // } else if (localStorage) this.selectStyle(localStorage);
  },
  mounted() {
    this.initHoverDivision();
    if (this.recentMood) {
      this.selectStyle(this.recentMood);
    }
  },
};
</script>

<style scoped lang="scss">
  .container {
    padding: 24px 20px 17px 20px;
    .container-header {
      .styling-title {
        font-size: 24px;
        line-height: 32px;
        letter-spacing: -1.4px;
        text-align: center;
      }
      .styling-text {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.8px;
        color: #797979;
        text-align: center;
      }
      .line {
        border-width: 2px;
        margin-top: 16px;
        margin-bottom: 70px;
      }
    }
  }
  .styling-form {
    margin-top: 70px;
  }
  .zuly-style-circle {
    margin: 0 auto;
  }
  .stylingLine {
    height: 1px;
    opacity: 0.2;
    background-color: #333333;
  }
  .styling-card {
    width: 489px;
    height: 240px;
    background-color: #FFFFFF;
    border: solid 2px #dadada;
    position: relative;
  }

  .styling-images {
    width: 100%;
    height: 100%;
  }

  .btn-next {
    width: 100%;
    margin-top: 61px;
    button {
      width: 100%;
      height: 50px;
    }
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
    font-size: 32px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    color: #333333;
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
    font-size: 16px;
    line-height: 1;
    text-align: center;
    color: #333333;
    letter-spacing: -1px;
  }

  .zuly-detail-circle-text span.description {
    display: inline-block;
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.4;
    letter-spacing: -0.8px;
    color: #797979;
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
    -webkit-filter: grayscale(100%);
    opacity: 0.6;
    filter: alpha(opacity=60);
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
    color: #f16458;
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
    color: #f16458;
  }

  .zuly-circle-pick-second {
    width: 160px;
    height: 160px;
  }

  .zuly-circle-pick-deactive {
    width: 144px;
    height: 144px;
  }

  .zuly-circle-pick-none {
    display: none;
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

  @media screen and (max-width: 486px) {
    .mt70 {
      margin-top: 70px !important;
    }

    .content-title {
      margin-top: 30px !important;
    }

    .zuly-circle-text {
      font-size: 22px;
    }

    .zuly-style-circle {
      width: 230px;
      height: 230px;
    }

    .zuly-detail-circle {
      width: 84px;
      height: 84px;
    }

    .zuly-main-circle-active {
      width: 84px !important;
      height: 84px !important;
    }

    .zuly-circle-pick-second {
      width: 74px !important;
      height: 74px !important;
    }

    .zuly-circle-pick-deactive {
      width: 67px !important;
      height: 67px !important;
    }

    .zuly-detail-circle-pick-subject,
    .zuly-detail-circle-active-subject {
      font-size: 20px;
    }

    .zuly-detail-circle-text {
      font-size: 12px;
    }

    .zuly-detail-circle-text span.description {
      font-size: 10px;
    }

    .circle-feminine {
      top: 89.5%;
      left: 50%;
    }

    .circle-classic {
      top: 64%;
      left: 5%;
    }

    .circle-modern {
      top: 64%;
      left: 95%;
    }

    .circle-natural {
      top: 13%;
      left: 23.3%;
    }

    .circle-unique {
      top: 13%;
      left: 75.7%;
    }
  }

  @media (min-width: 768px) {
    .container {
      width: 795px;
      margin-top: 0px;
      margin-right: auto;
      margin-bottom: 0px;
      margin-left: auto;
      padding: 74px 0 0 0;
      .container-header {
        .styling-title {
          font-size: 32px;
          line-height: 40px;
          letter-spacing: -1.7px;
        }
        .styling-text {
          font-size: 16px;
          line-height: 23px;
          letter-spacing: -1px;
          margin-top: 5px;
        }
        .line {
          margin-top: 26px;
        }
      }
    }
    .btn-next {
      position: relative;
      text-align: right;
      border-top: 1px solid #cacaca;
      margin-top: 160px;
      padding-top: 30px;
      button {
        width: 280px;
        height: 60px;
        font-size: 16px;
        letter-spacing: -1px;
      }
    }
  }
</style>
