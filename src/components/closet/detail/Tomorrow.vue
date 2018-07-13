<template>
  <div class="tomorrow" :style="(!isShow)? 'padding-top:31px': 'padding-top: 25px'">
    <div v-if="!isShow">
      <div class="none">
        <div class="inner">
          <p>
            조금만 기다리세요<br/>
            곧 옷장이 채워집니다.
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <p class="txt-main-title">
          데일리룩 후보 중 마음에 드는 의상을 선택해주세요.
        </p>
        <p class="txt-tomorrow-caution">
          (기한 내 미선택 시, 회원님께 더 어울릴 스타일로 자동 지정 후 배송 됩니다.)
        </p>
      </div>
      <div class="clearfix">
        <div
          ref="codiFirst"
          class="codi-suggestion"
          :class="{selected: this.codiSelected.first}">
          <div>
            <p class="txt-codi-title en-font">A. Setted Look</p>
            <p class="txt-codi-desc">
              {{printStyleFirst.stylingTitle}}
            </p>
          </div>
          <div class="list-codi">
            <div class="item" v-for="(data, idx) in printStyleFirst.image" v-if="data !== null" :key="idx">
              <div class="image">
                <img :src="$common.IMAGEURL() + data" alt="">
              </div>
              <div class="btn-detail">
                <button type="button" :data-attribute="printStyleFirst.productId[idx]">
                  상품 상세보기
                </button>
              </div>
            </div>
          </div>
          <div class="style-explain">

            <p class="txt-tip-title">스타일 팁</p>
            <!--TODO: 말줄임표 -->
            <p class="txt-tip-desc" v-html="$common.htmlEnterLine(printStyleFirst.stylingTip)"></p>
            <div class="line line__dashed"></div>
            <p class="txt-hashtag" v-html="$common.htmlEnterLine(printStyleFirst.hashTag)"></p>
          </div>
          <div class="btn-select" v-if="$mq !== 'sm'">
            <button
              @click="selectStyle(printStyleFirst, 'first')"
              class="btn btn-primary"
              type="button">
              선택하기
            </button>
          </div>

          <div class="dim-selected" v-if="codiSelected.first">
            <div class="heart">
              <img src="/static/img/closet/ico_white.svg" alt="">
            </div>
            <p class="txt-selected">
              좋아요.<br/>
              선택할게요.
            </p>
          </div>
        </div>
        <div
          ref="codiSecond"
          class="codi-suggestion"
          :class="{selected: this.codiSelected.second}">
          <div>
            <p class="txt-codi-title en-font">B. Item Codi</p>
            <p class="txt-codi-desc">
              {{printStyleSecond.stylingTitle}}
            </p>
          </div>
          <div class="list-codi">
            <div class="item" v-for="(data, idx) in printStyleSecond.image" v-if="data !== null" :key="idx">
              <div class="image">
                <img :src="$common.IMAGEURL() + data" alt="">
              </div>
              <div class="btn-detail">
                <button type="button" :data-attribute="printStyleSecond.productId[idx]">
                  상품 상세보기
                </button>
              </div>
            </div>
          </div>
          <div class="style-explain">

            <p class="txt-tip-title">스타일 팁</p>
            <!--TODO: 말줄임표 -->
            <p class="txt-tip-desc" v-html="$common.htmlEnterLine(printStyleSecond.stylingTip)"></p>
            <div class="line line__dashed"></div>
            <p class="txt-hashtag" v-html="$common.htmlEnterLine(printStyleSecond.hashTag)"></p>
          </div>
          <div class="btn-select" v-if="$mq !== 'sm'">
            <button
              @click="selectStyle(printStyleSecond, 'second')"
              class="btn btn-primary"
              type="button">
              선택하기
            </button>
          </div>
          <div class="dim-selected" v-if="codiSelected.second">
            <div class="heart">
              <img src="/static/img/closet/ico_white.svg" alt="">
            </div>
            <p class="txt-selected">
              좋아요.<br/>
              선택할게요.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="($mq === 'sm' && isShow)"
      class="btn-selected">
      <button
        type="button"
        class="btn"
        @click="selectStyle(printStyleFirst, 'first')"
        style="width: 50%; float: left;"
        :class="(codiSelected.first) ? 'btn-primary' : 'btn-secondary'">
        <span v-if="codiSelected.first">A 선택됨</span>
        <span v-else>A 선택하기</span>
      </button>
      <button
        type="button"
        class="btn"
        style="width: 50%; float: right;"
        @click="selectStyle(printStyleSecond, 'second')"
        :class="(codiSelected.second) ? 'btn-primary' : 'btn-secondary'">
        <span v-if="codiSelected.second">B 선택됨</span>
        <span v-else>B 선택하기</span>
      </button>
    </div>
    <alert-modal ref="view" width="300" height="153"></alert-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertModal from '@/components/common/AlertModal';

export default {
  name: 'tomorrow',
  components: {
    AlertModal,
  },
  data() {
    return {
      isMobile: false,
      isShow: false,
      selected: {},
      alertMsg: '',
      codiSelected: {
        first: false,
        second: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      tomorrowCloset: 'mypage/closet/getTomorrowCloset',
      tomorrowNone: 'mypage/closet/getTomorrowNone',
      tomorrowSelect: 'mypage/closet/getTomorrowSelect',
    }),
    printStyleFirst() {
      let firstStyle = {
        productId: [],
        description: [],
        image: [],
        stylingTip: '',
        hashTag: '',
        stylingTitle: '',
        selected: false,
      };

      if (Array.isArray(this.tomorrowCloset.products)) {
        if (this.tomorrowCloset.products[0]) {
          firstStyle = this.setArrayData(firstStyle, {
            prdId: this.tomorrowCloset.products[0].id,
            description: this.tomorrowCloset.products[0].description,
            image: this.tomorrowCloset.products[0].image,
          });

          firstStyle.stylingTip = this.tomorrowCloset.products[0].styling_tip;
          firstStyle.stylingTitle = this.tomorrowCloset.products[0].styling_title;
          firstStyle.hashTag = this.tomorrowCloset.products[0].hashtag;
          firstStyle.selected = (this.tomorrowCloset.products[0].selected);
        }

        if (this.tomorrowCloset.products[1]) {
          firstStyle = this.setArrayData(firstStyle, {
            prdId: this.tomorrowCloset.products[1].id,
            description: this.tomorrowCloset.products[1].description,
            image: this.tomorrowCloset.products[1].image,
          });
        }
      }

      return firstStyle;
    },
    printStyleSecond() {
      let secondStyle = {
        productId: [],
        description: [],
        image: [],
        stylingTip: '',
        hashTag: '',
        stylingTitle: '',
        selected: false,
      };

      if (Array.isArray(this.tomorrowCloset.products)) {
        if (this.tomorrowCloset.products[2]) {
          secondStyle = this.setArrayData(secondStyle, {
            prdId: this.tomorrowCloset.products[2].id,
            description: this.tomorrowCloset.products[2].description,
            image: this.tomorrowCloset.products[2].image,
          });

          secondStyle.stylingTip = this.tomorrowCloset.products[2].styling_tip;
          secondStyle.stylingTitle = this.tomorrowCloset.products[2].styling_title;
          secondStyle.hashTag = this.tomorrowCloset.products[2].hashtag;
          secondStyle.selected = (this.tomorrowCloset.products[2].selected);
        }

        if (this.tomorrowCloset.products[3]) {
          secondStyle = this.setArrayData(secondStyle, {
            prdId: this.tomorrowCloset.products[3].id,
            description: this.tomorrowCloset.products[3].description,
            image: this.tomorrowCloset.products[3].image,
          });
        }
      }

      return secondStyle;
    },
  },
  methods: {
    ...mapActions({
      setTomorrowCloset: 'mypage/closet/setTomorrowCloset',
      setTomorrowSelect: 'mypage/closet/setTomorrowSelect',
    }),
    btnSelect(data) {
      if (data === 'first') {
        this.codiSelected.first = true;
        this.codiSelected.second = false;
      } else {
        this.codiSelected.first = false;
        this.codiSelected.second = true;
      }
    },
    centerImage(value) {
      for (let i = 0; value.length > i; i += 1) {
        if (value[i] === null) return true;
      }
      return false;
    },
    isShowFlag(tmr) {
      if (tmr.products) {
        this.isShow = true;
      }

      return true;
    },
    printDDay(date) {
      let changeDay = '';
      if (date === 0 || date < 0) {
        changeDay = 'D day';
      } else {
        changeDay = `D-${date}일 후`;
      }

      return changeDay;
    },
    async selectStyle(style, type) {
      /*if (this.tomorrowCloset.select_dday >= 0) {
        await this.setTomorrowSelect({
          subscriptionId: this.tomorrowCloset.subscription_id,
          products: [...this.parseIntProduct(...style.productId)],
        });
        if (type === 'first') {
          this.$common.viewAlertModal('<b class="en-font">A.Setted Look</b> 배송됩니다.', this.$refs, 'alert');
          this.codiSelected.first = true;
          this.codiSelected.second = false;
        } else {
          this.$common.viewAlertModal('<b class="en-font">B.Item Codi</b> 배송됩니다.', this.$refs, 'alert');
          this.codiSelected.first = false;
          this.codiSelected.second = true;
        }
      } else {
        this.$common.viewAlertModal('선택기간이 지났습니다.<br />고객센터로 문의해주세요.', this.$refs, 'alert');
        return;
      }*/

      if (type === 'first') {
        const positionTop = this.$refs.codiFirst.offsetTop;

        const body = document.body; // safari
        const html = document.documentElement;
        body.scrollTop = positionTop;
        html.scrollTop = positionTop;

        this.$common.viewAlertModal('<b class="en-font">A.Setted Look</b> 배송됩니다.', this.$refs, 'alert');
        this.codiSelected.first = true;
        this.codiSelected.second = false;

      } else {
        const positionTop = this.$refs.codiSecond.offsetTop;

        const body = document.body; // safari
        const html = document.documentElement;
        body.scrollTop = positionTop;
        html.scrollTop = positionTop;

        this.$common.viewAlertModal('<b class="en-font">B.Item Codi</b> 배송됩니다.', this.$refs, 'alert');
        this.codiSelected.first = false;
        this.codiSelected.second = true;
      }
      if (this.tomorrowSelect) await this.setTomorrowCloset();
    },
    parseIntProduct(...data) {
      const rtn = [];

      for (let i = 0; i < data.length; i += 1) {
        rtn.push(parseInt(data[i], 10));
      }

      return rtn;
    },
    printArrText(desc) {
      let rtn = '';

      for (let i = 0; i < desc.length; i += 1) {
        rtn += this.$common.htmlEnterLine(desc[i]);
      }

      return rtn;
    },
    setArrayData(data, { prdId, description, image }) {
      return {
        productId: [...data.productId, prdId],
        description: [...data.description, description],
        image: [...data.image, image],
        stylingTip: data.stylingTip,
        stylingTitle: data.stylingTitle,
        hashTag: data.hashTag,
        selected: data.selected,
      };
    },
  },
  async created() {
    await this.setTomorrowCloset();
    this.isShowFlag(this.tomorrowCloset);
  },
  mounted() {
  },
  updated() {
  },
  destroyed() {
  },
};
</script>

<style scoped lang="scss">
  .tomorrow {
    padding: 31px 20px 20px 20px;
  }
  .none {
    height: 500px;
    background: url(/static/img/closet/img_none.png) no-repeat 50% 0;
    display: flex;
    justify-content: center;
    .inner {
      margin: auto;
      height: 160px;
      background-color: #fafafa;
      display: table;
      width: 90%;
    }
    p {
      height: 100%;
      vertical-align: middle;
      display: table-cell;
      text-align: center;
      font-size: 20px;
      line-height: 28px;
      letter-spacing: -1px;
    }
  }

  .txt-tomorrow-title {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -1px;
  }
  .txt-tomorrow-caution {
    font-size: 14px;
    letter-spacing: -0.8px;
    line-height: 22px;
    color: #797979;
  }

  .codi-suggestion {
    background-color: #f9f9f9;
    border: 2px solid #e1e1e1;
    padding: 24px 20px 20px 20px;
    text-align: center;
    margin-top: 16px;
    position: relative;
    .dim-selected {
      display: none;
    }
    &.selected {
      outline: 3px solid #000;
      outline-offset: -3px;
      /*border: 3px solid #000;*/
      .dim-selected {
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(51, 51, 51, 0.4);
        z-index: 100;
        .heart {
          margin-bottom: 18px;
          img {
            width: 42.8px;
            height: 37.3px;
          }
        }
        .txt-selected {
          line-height: 38px;
          font-size: 28px;
          letter-spacing: -1.9px;
          font-weight: 300;
        }
      }
    }
    .list-codi {
      width: 236px;
      margin: 0 auto;
      .item {
        background-color: #fff;
        /*border: 1px solid #e8e8e8;*/
        margin-top: 10px;
        &:first-child {
          margin-top: 16px;
        }
      }
      .image {
        border: 1px solid #e8e8e8;
        img {
          border: 5px solid #fff;
          width: 100%;
          /*height: 100%;*/
        }
      }
      .btn-detail {
        margin-top: -1px;
        button {
          /*overflow: hidden;
          text-indent: -9999em;
          background: url(/static/img/closet/btn_detail@2x.png) no-repeat 0 0;
          background-size: 100% 100%;*/
          width: 100%;
          height: 100%;
          color: #797979;
          background-color: #fff;
          border: 1px solid #e8e8e8;
          /*line-height: 36px;*/
          /*letter-spacing: -1.3px;*/
          font-size: 15px;
          line-height: 23px;
          height: 40px;
          letter-spacing: -0.6px;
          cursor: pointer;
        }
      }
    }

    .txt-codi-title {
      font-size: 17px;
      font-weight: 700;
      line-height: 21px;
      margin-bottom: 6px;
      letter-spacing: 0 !important;
    }
    .txt-codi-desc {
      font-size: 18px;
      font-weight: 300;
      letter-spacing: -0.7px;
      line-height: 24px;
      width: 180px;
      text-align: center;
      margin: 0 auto;
    }
    .style-explain {
      padding-top: 37px;
      .line {
        margin-top: 16px;
        margin-bottom: 16px;
        border-bottom-color: #a7a7a7;
      }
    }
    .txt-tip-title {
      font-size: 15px;
      letter-spacing: -0.6px;
      color: #333;
      font-weight: 700;
      line-height: 21px;
      margin-bottom: 11px;
      position: relative;
      /* TODO : Desktop To Mobile */
      &::before {
        content: '';
        border-bottom: 2px solid #333;
        width: 29px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -12px
      }
    }
    .txt-tip-desc {
      line-height: 23px;
      letter-spacing: -0.6px;
      font-size: 15px;
    }
    .btn-select {
      margin-top: 27px;
      button {
        width: 100%;
      }
    }
  }

  .btn-selected {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    button {
      height: 60px;
      font-size: 18px;
      line-height: 18px;
      letter-spacing: -0.7px;
    }
    &::after {
      content: '';
      display: block;
      border-right: 1px solid #fff;
      left: 50%;
      height: 100%;
      position: absolute;
      transform: translateX(-50%);
    }
  }

  @media (min-width: 767px) {
    .tomorrow {
      padding: 30px 0 20px;
      width: 1200px;
      margin: 0 auto;
    }
    .txt-tomorrow-caution {
      font-size: 15px;
      line-height: 23px;
      margin-top: 5px;
      margin-bottom: 28px;
    }
    .codi-suggestion {
      width: 591px;
      margin-top: 0;
      padding: 33px 26px 31px 30px;
      display: inline-block;
      vertical-align: top;
      &:nth-child(2){
        margin-left: 10px;
      }
      .txt-codi-title {
        font-size: 20px;
        line-height: 25px;
        margin-bottom: 9px;
      }
      .txt-codi-desc {
        font-size: 24px;
        line-height: 32px;
        letter-spacing: -1px;
        width: 240px;
        text-align: center;
        margin: 0 auto;
      }
      .list-codi {
        width: auto;
        margin-top: 26px;
        overflow: hidden;
        margin-left: auto;
        margin-right: auto;
        display: inline-block;
        .item {
          float: left;
          margin-top: 0;
          &:first-child {
            margin-top: 0;
            margin-right: 7px;
          }
        }
        .image {
          width: 260px;
          height: 308px;
        }
      }
      /* TODO:  Desktop To Mobile */
      .style-explain {
        padding-top: 50px;
        .line {
          margin-top: 16px;
          margin-bottom: 16px;
        }
      }

      .txt-tip-title {
        margin-bottom: 10px;
        /* TODO : Desktop To Mobile */
        &::before {
          width: 48px;
        }
      }
      .btn-select {
        margin-top: 27px;
        button {
          height: 60px;
        }
      }
    }
  }
</style>
