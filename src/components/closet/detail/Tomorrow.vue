<template>
  <div class="contents">
    <div class="contents-header">
      <h3>데일리룩 후보 중 마음에 드는 의상을 선택해주세요.</h3>
      <p>(기한 내 미선택 시, 회원님께 더 어울릴 스타일로 자동 지정 후 배송 됩니다.)</p>
    </div>
    <div class="content">

      <div class="grid-flex">
        <div class="column">
          <div>
            <div>
              <!-- Text ZONE-->
              <p class="txt-type">TYPE A</p>
              <p class="txt-styling-title">{{ tomorrowData.productA.stylingTitle }}</p>
            </div>
            <div>
              <div
                v-for="(data, idx) in tomorrowData.productA.products"
                :key="idx"
              >
                <div>
                  <img :src="$common.ZulyImage()+data.image">
                </div>
                <button type="button">상품 상세보기</button>
              </div>
            </div>
            <div>
              <p class="txt-styling-tip">{{ tomorrowData.productA.stylingTip }}</p>
            </div>
            <div class="btn-selected">
              <button
                type="button"
                class="btn btn-primary h-56"
              >
                선택하기
              </button>
            </div>
          </div>
        </div>
        <div class="column">
        </div>
      </div>

      <!--<div v-if="!isShow">
        <div class="none">
          <div class="inner txt-centering">
            <p>
              조금만 기다리세요<br/>
              곧 옷장이 채워집니다.
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="clearfix">
          <div
            ref="codiFirst"
            class="codi-suggestion"
            :class="{selected: this.codiSelected.first}">
            <div>
              <p class="txt-codi-title en-font">TYPE A</p>
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
                  <button
                    type="button"
                    :data-attribute="printStyleFirst.productId[idx]"
                    @click="(idx === 0) ? openDetailModal(products[0]) : openDetailModal(products[1])">
                    상품 상세보기
                  </button>
                </div>
              </div>
            </div>
            <div class="style-explain">

              <p class="txt-tip-title">ZULY Comment</p>
              &lt;!&ndash;TODO: 말줄임표 &ndash;&gt;
              <p class="txt-tip-desc" v-html="$common.htmlEnterLine(printStyleFirst.stylingTip)"></p>
              &lt;!&ndash;TODO: 추후에 사용될지 모르는 Hash . 확정될시 변경할 것&ndash;&gt;
              &lt;!&ndash;<div class="line line__dashed"></div>
              <p class="txt-hashtag" v-html="$common.htmlEnterLine(printStyleFirst.hashTag)"></p>&ndash;&gt;
            </div>
            <div class="btn-select" v-if="$mq !== 'sm' && selectButtonShow">
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
              <p class="txt-codi-title en-font">TYPE B</p>
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
                  <button
                    type="button"
                    :data-attribute="printStyleSecond.productId[idx]"
                    @click="(idx === 0) ? openDetailModal(products[2]) : openDetailModal(products[3])">
                    상품 상세보기
                  </button>
                </div>
              </div>
            </div>
            <div class="style-explain">

              <p class="txt-tip-title">ZULY Comment</p>
              &lt;!&ndash;TODO: 말줄임표 &ndash;&gt;
              <p class="txt-tip-desc" v-html="$common.htmlEnterLine(printStyleSecond.stylingTip)"></p>
              &lt;!&ndash;TODO: 추후에 사용될지 모르는 Hash . 확정될시 변경할 것&ndash;&gt;
              &lt;!&ndash;<div class="line line__dashed"></div>
              <p class="txt-hashtag" v-html="$common.htmlEnterLine(printStyleSecond.hashTag)"></p>&ndash;&gt;
            </div>
            <div class="btn-select" v-if="$mq !== 'sm' && selectButtonShow">
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
      </div>-->
    </div>

    <!--<div
      v-if="($mq === 'sm' && isShow && selectButtonShow)"
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
    <detail-modal
      ref="detailModal"
      v-if="detailModalShow"
      :detailData="detailModalData"
      @closeDetailModal="closeDetailModal"></detail-modal>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertModal from '@/components/common/AlertModal';
import DetailModal from '@/components/common/DetailPopup';

export default {
  name: 'tomorrow',
  components: {
    // AlertModal,
    // DetailModal,
  },
  data() {
    return {
      // connectType: '',
      // 직접접속할때 필요함
      // memberId: 0,
      //
      // isMobile: false,
      // isShow: false,
      // selected: {},
      // alertMsg: '',
      // codiSelected: {
      //   first: false,
      //   second: false,
      // },
      // detailModalShow: false,
      // selectButtonShow: true,
      // detailModalData: {},
      // products: [],

      isTomorrowData: false,
      tomorrowData: {
        subscriptionStatus: null,
        subscriptionId: null,
        subscriptionDate: '',
        productA: {},
        productB: {}
      },

    };
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin',
      Tomorrow: 'subscriptions/Tomorrow',
      // tomorrowCloset: 'mypage/closet/getTomorrowCloset',
      // tomorrowNone: 'mypage/closet/getTomorrowNone',
      // tomorrowSelect: 'mypage/closet/getTomorrowSelect',
      // tomorrowDirect: 'login/tomorrowDirect',
    }),
  },
  methods: {
    ...mapActions({
      getTomorrow: 'subscriptions/getTomorrow'
      // setTomorrowCloset: 'mypage/closet/setTomorrowCloset',
      // setTomorrowSelect: 'mypage/closet/setTomorrowSelect',
      // setTomorrowSelectDirect: 'mypage/closet/setTomorrowSelectDirect',
    }),
    processingData() {
      const data = this.Tomorrow.data;
      const selectArray = ['styling_tip', 'styling_title','hashtag'];
      // 데이터 가공
      let productA = {
        stylingTip: '',
        stylingTitle: '',
        hashtag: '',
        products: [],
      };
      let productB = {
        stylingTip: '',
        stylingTitle: '',
        hashtag: '',
        products: [],
      };
      _.forEach(data.products, (value, idx) => {
        if (idx === 0 || idx === 1) {
          if (idx === 0) {
            const pickData = _.pick(value, selectArray);
            const omitData = _.omit(value, selectArray);
            productA.stylingTip = pickData.styling_tip;
            productA.stylingTitle = pickData.styling_title;
            productA.hashtag = pickData.hashtag;
            productA.products.push(omitData);
          } else {
            productA.products.push(value);
          }
        } else {
          if (idx === 2) {
            const pickData = _.pick(value, selectArray);
            const omitData = _.omit(value, selectArray);
            productB.stylingTip = pickData.styling_tip;
            productB.stylingTitle = pickData.styling_title;
            productB.hashtag = pickData.hashtag;
            productB.products.push(omitData);
          }
          else {
            productB.products.push(value);
          }
        }
      });
      this.tomorrowData.subscriptionStatus = data.subscription_status;
      this.tomorrowData.subscriptionId = data.subscription_id;
      this.tomorrowData.subscriptionDate = data.subscription_date;
      this.tomorrowData.productA = productA;
      this.tomorrowData.productB = productB;
    }
  },
  async created() {

    await this.getTomorrow()
      .then(res => {
        if (res.data.result) {
          // 데이터 존재한다면.
          this.processingData();
          this.isTomorrowData = true;
        } else {
          // 데이터가 존재하지 않는다면
          this.isTomorrowData = false;
        }
      });
  },
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss"></style>
<style scoped lang="scss">
  .none {
    height: 500px;
    background: url(~@/assets/img/closet/img_none.png) no-repeat 50% 0;
    position: relative;
    .inner {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 160px;
      background-color: #fafafa;
      width: 90%;
    }
    p {
      text-align: center;
      font-size: 18px;
      line-height: 28px;
      letter-spacing: -1.2px;
    }
  }

  .txt-type {
    @include fontSize(15px, en);
    font-weight: 700;
  }
  .txt-styling-title {
    @include fontSize(18px);
    font-weight: 400;
  }

  /*.codi-suggestion {
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
      !*border: 3px solid #000;*!
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
          line-height: 34px;
          font-size: 24px;
          letter-spacing: -1.2px;
          font-weight: 300;
        }
      }
    }
    .list-codi {
      width: 236px;
      margin: 0 auto;
      .item {
        background-color: #fff;
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
        }
      }
      .btn-detail {
        margin-top: -1px;
        button {
          width: 100%;
          color: #797979;
          background-color: #fff;
          border: 1px solid #e8e8e8;
          font-size: 14px;
          line-height: 23px;
          height: 40px;
          letter-spacing: -0.8px;
          cursor: pointer;
        }
      }
    }

    .txt-codi-title {
      font-size: 15px;
      font-weight: 700;
      line-height: 21px;
      margin-bottom: 6px;
      letter-spacing: -0.9px !important;
    }
    .txt-codi-desc {
      font-size: 17px;
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
      letter-spacing: -0.9px;
      color: #333;
      font-weight: 700;
      line-height: 21px;
      margin-bottom: 11px;
      position: relative;
      !* TODO : Desktop To Mobile *!
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
      letter-spacing: -0.9px;
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
      letter-spacing: -1.2px;
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
  }*/

  @media (min-width: 768px) {
    /*.tomorrow {
      padding: 30px 0 20px;
      width: 1200px;
      margin: 0 auto;
    }
    .txt-tomorrow-caution {
      font-size: 14px;
      line-height: 18px;
      margin-top: 5px;
      margin-bottom: 28px;
      letter-spacing: -0.8px;
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
        font-size: 18px;
        line-height: 25px;
        margin-bottom: 9px;
        letter-spacing: -1.2px;
      }
      .txt-codi-desc {
        font-size: 22px;
        line-height: 32px;
        letter-spacing: -1px;
        width: 230px;
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
      !* TODO:  Desktop To Mobile *!
      .style-explain {
        padding-top: 45px;
        .line {
          margin-top: 16px;
          margin-bottom: 16px;
        }
      }

      .txt-tip-title {
        margin-bottom: 20px;
        !* TODO : Desktop To Mobile *!
        &::before {
          width: 35px;
        }
      }
      .btn-select {
        margin-top: 27px;
        button {
          height: 60px;
        }
      }
    }*/
  }
</style>
