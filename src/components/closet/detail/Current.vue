<template>
  <div class="current mt40">
    <div class="closet-card-none" v-show="currentNone">
      <div class="closet-card-none-content">
        <div class="content-table mauto">
          <span>내일의 옷장에서<br/><b>선택하신 옷을 수령</b>하시면<br/>옷장이 채워집니다.</span>
        </div>
      </div>
    </div>

    <div v-show="!currentNone">
      <div class="main-point-text closet-title">현재의 옷장</div>
      <div class="closet-title-text mt15">
        현재 대여중인 의상이 마음에 드신다면?<br/>
        반납 없이 구매할 수 있습니다.<br/>
      </div>
      <div class="closet-feedback mt50">
        <div class="closet-feedback-content">
          ZULY 이용에 대한 이야기를 들려주세요.<br/>
          소중한 의견을 바탕으로 다음 스타일링이 진행됩니다.<br/>
          <button class="button-survey mt30" style="width: 15%;">피드백 시작하기</button>
        </div>
        <div class="custom-btn" @click="closeSurvey">
          <div class="btn-times"></div>
        </div>
      </div>
      <feedBack ref="feedback"></feedBack>
      <div class="closet-styling-tip mt50">
        <div class="closet-styling-rotate-text">
          ZULY STYLE
        </div>
        <div class="closet-styling-image-first" v-if="firstCurrentCloset">
          <template v-if="currentCloset.products && currentCloset.products.length > 0">
            <div class="image-area">
              <div
                class="image-area-detail"
                v-bind:style="{
                  'background-image': `url(${API_IMAGE_URL}${currentCloset.products[0].image})`,
                }"
              ></div>
            </div>
          </template>
        </div>
        <div class="closet-styling-image-second" v-if="secondCurrentCloset">
          <template v-if="currentCloset.products && currentCloset.products.length > 1">
            <div class="image-area">
              <div
                class="image-area-detail"
                v-bind:style="{
                  'background-image': `url(${API_IMAGE_URL}${currentCloset.products[1].image})`,
                }"
              ></div>
            </div>
          </template>
        </div>
        <div class="closet-styling-image-title first-title">
          #TIP
          <div class="third-line"></div>
        </div>
        <div class="closet-styling-image-title second-title">
          TODAY'S STYLE
        </div>
      </div>
      <div class="closet-styling-tip-title">스타일 팁</div>
      <div class="closet-styling-tip-text" v-html="printStylingTip">
        <!-- div class="closet-styling-tip-stylist mt30">
          - 담당 스타일리스트 한영진님
        </div -->
      </div>
      <div class="closet-styling-tip-hashtag">
        <div class="dotted-line-hashtag"></div>
        <div class="mt20" v-html="currentCloset.hashtag">
        </div>
      </div>
      <div class="current-closet-item-list mt30" style="display: flex;">
        <div class="current-closet-item" style="padding-top:20px">
          <template v-for="(closet, k) in currentCloset.products">
            <div v-if="closet.id !== null" v-bind:key="k" class="closet-item-card mt10">
              <div class="item-checkbox" v-show="closet.sold_flag !== 1">
                <label class="container">
                  <input type="checkbox" name="product" :value="closet.id" @click="productEvt($event, k)">
                  <span class="checkmark" style="width: 40px; height: 40px;"></span>
                </label>
              </div>
              <div class="thumnail-image-area">
                <div
                  class="thumnail-image"
                  v-bind:style="{
                    'background-image': `url(${API_IMAGE_URL}${closet.image})`,
                  }"
                ></div>
              </div>
              <div class="item-content">
                <div style="padding-top: 25px;">
                  <span style="font-weight: 600;">[{{ closet.brand_kor_name }}]</span><br/>
                  <span style="line-height: 2;">{{ closet.name }}</span>
                  <div style="padding-top: 8px;">
                    <span class="normal-price">{{ $common.numberWithCommas(closet.sale_price) }}원</span><br/>
                    <span style="line-height: 1.8;">혜택가 {{ $common.numberWithCommas(closet.used_price) }}원 <span class="normal-price-percent">({{ closet.discount_rate }}%↓)</span></span>
                  </div>
                  <span class="product-detail" @click="viewModal(closet, currentCloset.images[k])">
                    상품 상세보기
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div style="display: inline-block; width: 1.3%;"></div>
        <div class="current-closet-item-buy">
          <div class="item-buy-title mt30">최종결제 금액확인</div>
          <div class="mt30" style="height: 1px; background-color: #333333; opacity: 0.5;"></div>
          <div class="mt50 item-buy-row">
            <div class="item-buy-row-title">주문 수량</div>
            <div class="item-buy-row-right">
              {{ orderCount }}
            </div>
          </div>
          <div class="mt50 item-buy-row">
            <div class="item-buy-row-title">총 상품금액</div>
            <div class="item-buy-row-right">
              {{ $common.numberWithCommas(productAmount) }}원
            </div>
          </div>
          <div class="mt30 item-buy-row" style="background-color: #f5f5f5; padding: 31px 23px; margin-left: 2px;">
            <div class="item-buy-row-title">최종 결제 금액</div>
            <div class="item-buy-row-right">
              <span>{{ $common.numberWithCommas(productAmount) }}</span>원
            </div>
          </div>
          <div style="margin: 23px;">
            <button class="button-login" @click="paymentConfirm()">
              {{ printBtnText }} 등록된 카드로 결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
    <detail-modal ref="detail" dataId="address"></detail-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FeedBack from '@/components/closet/feedback/Index';
import DetailModal from '@/components/common/DetailModal';

export default {
  name: 'current',
  data() {
    return {
      API_IMAGE_URL: process.env.API_IMAGE_URL,
      orderCount: 0,
      productAmount: 0,
      paymentAmount: 0,
      printBtnText: '',
      buyProductArr: [],
      firstCurrentCloset: true,
      secondCurrentCloset: true,
    };
  },
  components: {
    FeedBack,
    DetailModal,
  },
  computed: {
    ...mapGetters({
      currentCloset: 'mypage/closet/getCurrentCloset',
      currentNone: 'mypage/closet/getCurrentNone',
      paymentCurrent: 'mypage/closet/getPaymentCurrent',
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
  },
  async created() {
    await this.setCurrentCloset();
    const productList = this.currentCloset.products;
    for (let i = 0; productList.length > i; i += 1) {
      if (productList[i].id === null) {
        document.querySelector('.closet-styling-tip').classList.add('closet-styling-one-tip');
        document.querySelector('.second-title').classList.add('onepiece-second-title');
        document.querySelector('.closet-styling-tip-title').classList.add('onepiece-closet-styling-tip-title');
        if (i === 0) this.firstCurrentCloset = false;
        else this.secondCurrentCloset = false;
      }
    }
  },
};
</script>

<style scoped>
.closet-feedback {
  display: none;
  height: 330px;
  background: url('/static/img/closet/img_feedback.png');
  background-repeat: no-repeat;
  background-position: 50% 0;
  position: relative;
}

.closet-feedback-content {
  position: relative;
  top: 30%;
  font-size: 27px;
  line-height: 1.3;
  letter-spacing: -1.6px;
  text-align: center;
  color: #ffffff;
}

.custom-btn {
  cursor: pointer;
  width: 48px;
  height: 48px;
  position: absolute;
  opacity: 1;
  top: 8%;
  left: 97.5%;
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
  background-color: #FFFFFF;
  border-radius: 2px;
  top: 23px;
  box-shadow: 0 0 2px 0 #ccc;
}

div.btn-times:before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  left: 9px;
}

div.btn-times:after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: 9px;
}

.closet-styling-tip {
  height: 570px;
  background-color: #dbdbdb;
  position: relative;
}

.closet-styling-rotate-text {
  position: absolute;
  top: 63.7%;
  left: 14.5%;
  width: 81px;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  -webkit-transform: rotate(-270deg);
  -moz-transform: rotate(-270deg);
  -ms-transform: rotate(-270deg);
  -o-transform: rotate(-270deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
}

.closet-styling-image-first {
  width: 352px;
  height: 400px;
  background-color: #FFFFFF;
  position: absolute;
  left: 19.3%;
  top: 9.8%;
}

.closet-styling-image-second {
  width: 352px;
  height: 400px;
  background-color: #FFFFFF;
  position: absolute;
  left: 51.3%;
  top: 22.3%;
}

.closet-styling-image-title {
  font-size: 58px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.41;
  letter-spacing: normal;
  color: #333333;
}

.first-title {
  position: absolute;
  left: 20.5%;
  top: 79.3%;
}

.second-title {
  position: absolute;
  left: 23.7%;
  top: 89.2%;
}

.third-line {
  height: 4px;
  background-color: #333333;
  position: relative;
  left: 153.5px;
  top: -7.5px;
}

.closet-styling-tip-text {
  background-color: #dbdbdb;
  text-align: left;
  word-wrap:break-word;
  padding: 0 19.4% 20px 23.9%;
  font-size: 16px;
}
.closet-styling-tip-hashtag{
  background-color: #dbdbdb;
  text-align: left;
  word-wrap:break-word;
  padding: 0 19.4% 60px 23.9%;
  font-size: 16px;
  color: #683b3f;
  text-transform:capitalize;
}

.closet-styling-tip-title {
  background-color: #dbdbdb;
  text-align: left;
  word-wrap:break-word;
  padding: 0 19.4% 0px 23.9%;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  color: #333333;
  line-height: 3;
}
.closet-styling-tip-stylist {
  font-size: 16px;
  font-weight: normal;
  line-height: 1;
  letter-spacing: -1px;
  color: #797979;
}

.closet-card-hashtag {
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: -0.4px;
  text-align: left;
  color: #683b3f;
  margin-bottom: 20px;
}

.current-closet-item {
  display: inline-block;
  width: 58%;
  background-color: #ffffff;
  border: solid 2px #e9e9e9;
}

.current-closet-item-buy {
  display: inline-block;
  width: 40%;
  border: solid 2px #333333;
}

.item-buy-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #333333;
}

.item-buy-row {
  display: flex;
  padding-left: 23px;
  padding-right: 23px;
}

.item-buy-row-title {
  width: 40%;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.8px;
  line-height: 1;
  color: #797979;
}

.item-buy-row-right {
  width: 60%;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: #333333;
}

.item-buy-row-right span {
  color: #f45649;
}

.closet-item-card {
  padding-left: 22px;
  font-size: 16px;
  line-height: 1;
  color: #333333;
}

.closet-item-card:last-of-type {
  margin-bottom: 35px;
}

.image-area {
  position: relative;
  width: 352px;
  height: 400px;
  background-color: #f5f5f5;
}

.image-area-detail {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 89%;
  height: 91%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.thumnail-image-area {
  position: relative;
  display: inline-block;
  width: 130px;
  height: 181px;
  background-color: #f5f5f5;
  border: solid 1px #e9e9e9;
  margin-left: 52px;
}

.thumnail-image {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 130px;
  height: 181px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.item-content {
  vertical-align: top;
  display: inline-block;
  margin-left: 21px;
}

.container .checkmark:after {
  left: 14px !important;
  top: 8px !important;
  width: 10px !important;
  height: 15px !important;
}

.normal-price {
  color: #797979;
}

.normal-price-percent {
  color: #f45649;
  letter-spacing: -0.7px;
}

.product-detail {
  cursor: pointer;
  height: 18px;
  font-size: 16px;
  letter-spacing: -0.5px;
  text-align: left;
  position: relative;
  top: 17px;
  border-bottom: 1px solid #566b9c;
  color: #566b9c;
}

@media screen and (max-width: 900px) {
  .current-closet-item-list {
   display: block !important;
  }

  .current-closet-item {
    width: 100%;
  }

  .current-closet-item-buy {
    width: 100%;
  }
}

@media screen and (max-width: 486px) {
  .closet-styling-tip {
    height: 900px;
    display: block;
  }

  .closet-styling-one-tip {
    height: 440px;
  }

  .closet-styling-image-first,
  .closet-styling-image-second {
    display: inline-block;
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    position: unset;
    margin: 0 auto;
    left: 0;
    top: 0;
    background-color: unset;
  }

  .closet-styling-image-second {
    margin-top: 30px !important;
  }

  .image-area {
    width: 100% !important;
    height: 400px !important;
    background-color: #FFFFFF;
  }

  .closet-styling-rotate-text {
    top: 88%;
    left: -6%;
  }

  .first-title {
    left: 7.7%;
    top: 94.3%;
  }

  .second-title {
    left: 7.7%;
    top: 98.2%;
  }

  .onepiece-second-title {
    top: 102.3%;
  }

  .closet-styling-image-title {
    font-size: 42px;
  }

  .closet-styling-tip-text {
    padding: 0px 8% 30px 8%;
  }
  .closet-styling-tip-title {
    padding: 20px 8% 0px 8%;
  }
  .onepiece-closet-styling-tip-title {
    padding: 45px 8% 0px 8%;
  }
 .closet-styling-tip-hashtag {
    padding: 0px 8% 25px 8%;
  }
  .thumnail-image,
  .thumnail-image-area {
    width: 80px;
    height: 100px;
  }

  .item-content {
    margin-left: 5px;
  }

  .item-content > div {
    padding-top: 15px !important;
    padding-left: 45px !important;
  }

  .closet-card-none-content {
    width: 90%;
  }

  .content-table span {
    font-size: 26px;
  }
}

@media screen and (max-width: 400px) {
  .closet-styling-image-title {
    font-size: 32px;
  }
}
</style>
