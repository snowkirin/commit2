<template>
  <div class="container">
    <div v-if="showCurrent" :style="$mq === 'sm'? 'padding-top: 17px;': 'padding-top: 32px;'">
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
      <feedBack
      ref="feedback"
      v-if="!_.isEmpty(feedbackData)"
      :data="feedbackData"
      :subscriptionId="feedbackDirect.subscription_id ? feedbackDirect.subscription_id : currentCloset.subscription_id"
      :type="directFeedbackCheck ? 'direct' : 'current'">
    </feedBack>
      <div class="current-styling" v-show="!directFeedbackCheck">
      <!-- Mobile-->
        <div class="mobile-carousel">
          <div class="carousel txt-zuly">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(data, idx) in currentCloset.products" :key="idx" v-if="data.id !== null">
                <img :src="$common.IMAGEURL() + data.image.path"/>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
          <p class="txt-tip-today-style en-font"><span>TIP</span> <span class="txt-dash">_</span><br/> <span>TODAY&apos;S STYLE</span></p>
          <div class="txt-style-tip">
            <p class="txt-style-tip__desc">
              {{ currentCloset.styling_tip }}
            </p>
          </div>
        </div>
      <!--<vue-json-pretty :data="currentCloset"></vue-json-pretty>-->
        <!--<div>{{currentCloset.products.length}}</div>-->
      <div class="desktop-carousel">
        <div class="inner">
          <ul class="images">
            <li v-for="(data, idx) in currentCloset.products" :key="idx" v-if="data.id !== null" :class="{'txt-zuly': idx === 0}">
              <img :src="$common.IMAGEURL() + data.image.path"/>
            </li>
          </ul>
          <p
            class="txt-tip-today-style en-font"
            :style="(currentCloset.products.length === 1 ) ? 'margin-top: 30px' : ''"><span class="txt-tip">TIP</span><br/> <span>TODAY&apos;S STYLE</span></p>
          <p class="txt-style-tip__desc">
            {{ currentCloset.styling_tip }}
          </p>
        </div>
      </div>
      <!--Desktop -->

      <div class="zuly-line-dot"></div>
    </div>
      <detail-modal ref="detail" dataId="address"></detail-modal>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

import FeedBack from '@/components/closet/feedback/Index';
import DetailModal from '@/components/common/DetailModal';

import Closet from '@/library/api/closet';

import 'swiper/dist/css/swiper.css';

import VueJsonPretty from 'vue-json-pretty';

export default {
  name: 'current',
  data() {
    return {
      // Swiper Options
      swiperOption: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      API_IMAGE_URL: process.env.API_IMAGE_URL,
      orderCount: 0,
      productAmount: 0,
      paymentAmount: 0,
      printBtnText: '',
      buyProductArr: [],
      firstCurrentCloset: true,
      secondCurrentCloset: true,
      feedbackData: {},
      directFeedbackCheck: false,
      showCurrent: true,
    };
  },
  components: {
    FeedBack,
    DetailModal,
    swiper,
    swiperSlide,
    VueJsonPretty,
  },
  computed: {
    ...mapGetters({
      currentCloset: 'mypage/closet/getCurrentCloset',
      currentNone: 'mypage/closet/getCurrentNone',
      paymentCurrent: 'mypage/closet/getPaymentCurrent',
      feedbackDirect: 'login/feedbackDirect',
      isLogin: 'login/isLogin',
    }),
    printStylingTip() {
      let printData = this.currentCloset.styling_tip;
      if (printData) printData = this.$common.htmlEnterLine(printData);
      return printData;
    },
  },
  methods: {
    ...mapActions({
      setCurrentCloset: 'mypage/closet/setCurrentCloset',
      buyUsedProduct: 'mypage/closet/buyUsedProduct',
      initPaymentCurrent: 'mypage/closet/initPaymentCurrent',
    }),
    closeSurvey() {
      document.querySelector('.closet-feedback').style.display = 'none';
    },
    productEvt($evt, k) {
      if ($evt.target.checked) {
        this.buyProductArr.push(this.currentCloset.products[k]);
      } else {
        for (let i = 0; i < this.buyProductArr.length; i += 1) {
          if (this.buyProductArr[i].id === this.currentCloset.products[k].id) {
            this.buyProductArr.splice(i, 1);
            break;
          }
        }
      }

      this.productCal();
    },
    productCal() {
      this.orderCount = 0;
      this.productAmount = 0;
      this.paymentAmount = 0;
      this.printBtnText = '';

      for (let i = 0; i < this.buyProductArr.length; i += 1) {
        this.productAmount += parseInt(this.buyProductArr[i].used_price, 10);
      }

      this.orderCount = this.buyProductArr.length;
      this.paymentAmount = this.productAmount;

      if (this.paymentAmount > 0) {
        this.printBtnText = `${this.$common.numberWithCommas(this.paymentAmount)}원`;
      }
    },
    paymentConfirm() {
      if (this.buyProductArr.length <= 0) {
        alert('결제하실 상품을 체크해주세요.');
        return;
      }
      alert('체험단 기간 중에는 결제가 불가능합니다.');
      // const paymentFlag = confirm('대여 상품은 교환/환불이 어렵습니다.\n정말 구매하시겠습니까?');
      // if (paymentFlag) {
      //   this.currentPayment();
      // }
    },
    async currentPayment() {
      // await this.buyUsedProduct(this.buyProductArr)
      //   .then(setTimeout(() => { alert(this.paymentCurrent); }, 1500))
      //   .catch(err => console.log(err));
      // this.initPaymentCurrent();
      await this.buyUsedProduct(this.buyProductArr);
    },
    viewModal(closetInfo, closetImage) {
      this.$refs.detail.openModal(closetInfo, closetImage);
    },
    feedbackInfo() {
      const $this = this;
      const subscriptionId = this.feedbackDirect.subscription_id ? this.feedbackDirect.subscription_id : this.currentCloset.subscription_id;
      Closet.mypageFeedback(subscriptionId)
        .then(function(res) {
          console.log(res);
          if (res.data.result) {
            $this.feedbackData = res.data;
          }
        });
    },
  },
  async created() {
    console.log(1);
    if (!this.isLogin) {
      console.log(2);
      if (this.feedbackDirect.result) {
        console.log(3);
        this.showCurrent = false;
        this.directFeedbackCheck = true;
        this.feedbackInfo();
      }
    } else {
      console.log(4);
      await this.setCurrentCloset();
      if (_.isEmpty(this.currentCloset)) {
        console.log(5);
        this.showCurrent = true;
      } else {
        console.log(6);
        this.showCurrent = false;
        this.feedbackInfo();
      }
    }
  },
};
</script>

<style scoped lang="scss">
  .container {
    padding: 15px 20px 20px 20px;
  }

  .none {
    height: 500px;
    background: url(/static/img/closet/img_none.png) no-repeat 50% 0;
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
  .txt-zuly {
    position: relative;
    &::before {
      position: absolute;
      content: 'ZULY STYLE';
      display: block;
      font-size: 12px;
      font-weight: 700;
      line-height: 14px;
      color: #fff;
      font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
      transform: rotate(90deg);
      transform-origin: 0 0;
      left: -10px;
      bottom: 60px;
    }
  }

  .txt-current-title {
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -1.1px;
  }
  .current-styling {
    background-color: #dbdbdb;
    padding: 32px 26px 24px 24px;
    margin: {
      top: 16px;
      bottom: 31px;
    }
  }
  .txt-rotate {
    position: absolute;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    -webkit-transform: rotate(-270deg);
    -moz-transform: rotate(-270deg);
    -ms-transform: rotate(-270deg);
    -o-transform: rotate(-270deg);
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    left: -10px;
    letter-spacing: -0.8px;
  }
  .carousel {
    position:relative;
    width:285px;
    margin: 0 auto;
    .swiper-container {
      border: 8px solid #fff;
      .swiper-slide {
        img {
          width: 100%;
        }
      }
      .swiper-button-prev,
      .swiper-button-next {
        height: 32px;
        width: 32px;
        border: 1px solid #b9b9b9;
        border-width: 1px 1px 0 0;
        background-image: none;
      }
      .swiper-button-prev {
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
        left: 16px;
      }
      .swiper-button-next {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        right: 16px;
      }
      .swiper-button-disabled {
        display: none;
      }
    }
  }
  .txt-tip-today-style {
    font-size: 32px;
    line-height: 30px;
    font-weight: 700;
    white-space: nowrap;
    position: relative;
    padding-left: 21px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    margin-top: 25px;
    margin-bottom: 15px;
    z-index: 100;
    &:before {
      content: '#';
      display: block;
      left: 0;
      line-height: 41px;
      position: absolute;
    }
    .txt-dash {
      display: inline-block;
      width: 47px;
      border-bottom: 3px solid #333;
      text-indent: -9999em;
      overflow: hidden;
      position: relative;
      top: -3px;
    }
  }
  .txt-style-tip {
    font-size: 15px;
    letter-spacing: -0.9px;
    text-align: center;
    &__title {
      line-height: 21px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    &__desc {
      font-size: 15px;
      line-height: 23px;
    }
  }
  .txt-strike {
    text-decoration-line: line-through;
  }
  .current-product-list {
    border: 2px solid #e9e9e9;
    margin-bottom: 10px;
    .image {
      width: 60px;
      height: 70px;
      overflow: hidden;
    }
    ul {
      list-style: none;
      padding: 23px 21px;
    }
    li {
      display: flex;
      &:after {
        content: '';
        border-bottom: 2px solid #e9e9e9;
        display: block;
      }
      &:last-child {
        &:after {
          display: none;
        }
      }
    }

    .information {
      .title {
        font-size: 15px;
        line-height: 21px;
        font-weight: 700;
        letter-spacing: -0.9px;
      }
      .desc {
        font-size: 15px;
        line-height: 23px;
        letter-spacing: -0.9px;
      }
      .original-price {
        letter-spacing: -0.9px;
        line-height: 23px;
        font-size: 15px;
        color: #797979;
        .txt-strike {
          font-size: 14px;
          line-height: 25px;
          letter-spacing: -0.8px;
        }
      }
      .sale-price {
        font-size: 15px;
        letter-spacing: -0.9px;
        white-space: nowrap;
        .txt-price-accent {
          color: #f16458;
        }
      }
      .link-detail {
        font-size: 15px;
        line-height: 25px;
        letter-spacing: -0.9px;
        color: #566b9c;
        text-decoration: underline;
      }
    }
  }
  .confirm-payment {
    border: 2px solid #333;
    .title {
      font-size: 17px;
      letter-spacing: -1.2px;
      text-align: center;
      border-bottom: 2px solid #333;
      font-weight: 700;
      padding: {
        top: 15px;
        bottom: 13px;
      }
    }
    .quantity,
    .price,
    .final {
      display: flex;
      justify-content: space-between;
      line-height: 25px;
      padding: 10px 15px 10px 18px;
      .text {
        font-size: 15px;
        line-height: 23px;
        letter-spacing: -0.9px;
      }
      .number {
        font-weight: 700;
      }
    }
    .final {
      background-color: #f5f5f5;
      .number {
        color: #f16458;
      }
    }
    .btn-confirm {
     padding: 20px 17px 22px 16px;
      button {
        width: 100%;
        border: 0 none;
        padding: 0;
        text-align: center;
        font-size: 15px;
        line-height: 50px;
        background-color: #333;
        color: #fff;
        letter-spacing: -0.9px;
      }
    }
  }
  .desktop-carousel {
    display: none;
  }

  @media (min-width: 768px) {
    .container {
      margin: 0 auto;
      padding: 0;
      width: 1200px;
    }
    .current-styling {
      margin-top: 36px;
      padding-top: 50px;
      padding-bottom: 50px;
    }
    .mobile-carousel {
      display: none;
    }
    .desktop-carousel {
      display: block;
      text-align: center;
      .inner {
        display: inline-block;
        text-align: left;
      }
      .txt-zuly {
        &::before {
          font-size: 14px;
          left: -20px;
          bottom: 100px;
        }
      }
      .images {
        font-size: 0;
        text-align: center;
        li {
          display: inline-block;
          width: 280px;
          border: 10px solid #fff;
          vertical-align: top;
          img {
            width: 100%;
          }
          &:nth-child(2) {
            margin-left: 30px;
            margin-top: 70px;
          }
        }
      }
      .txt-tip-today-style {
        left: 0;
        transform: translateX(0);
        margin-top: -60px;
        margin-bottom: 20px;
        margin-left: -30px;
        letter-spacing: -0.5px !important;
        font-size: 44px;
        line-height: 1;
        &::before {
          left: -6px;
          top: 2px;

        }
        .txt-tip {
          position: relative;
          &::after {
            content: '';
            display: block;
            width: 130px;
            position: absolute;
            height: 4px;
            background-color: #333;
            right: -139px;
            top: 50%;
            margin-top: -2px
          }
        }
      }
    }
  }
</style>
