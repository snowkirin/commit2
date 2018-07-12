<template>
  <div class="signup">
    <div class="contents clearfix">
      <div class="signup-text content">
        <div class="signup-title">
          <p class="text">
            줄라이는 <span>78,000</span>원<br/>
            요금제 단일 상품 입니다.
          </p>
        </div>
        <div class="explain">
          <p>월 2회 스타일링 된 의류 세트(2벌) 정기 배송</p>
          <p>
            <span>(1회 배송 의류 리테일가 30만원 기준 x 2 = 60만원)</span>
          </p>
          <p>무료 세탁</p>
          <p>
            무료 수거/배송 서비스
          </p>
          <p>
            무료 전문 스타일링 및 스타일링 Tip 제공
          </p>
        </div>
      </div>
      <div class="content">
        <form name="joinForm">
          <!--요금제-->
          <div class="payment-system">
            <p class="txt-point">요금제</p>
            <div class="form-row">
              <input
                type="text"
                class="form-input"
                value="월2회 단일 78,000원 요금제"
                readonly>
            </div>
          </div>
          <!--배송일 지정-->
          <div class="delivery-date">
            <p class="txt-point">배송일 지정</p>
            <div>
              <div>
                <ul>
                  <li
                    v-for="(data, idx) in setDeliveryDay"
                    :key="idx"
                    @click="selectDay(data)"
                    :class="{'selected': joinSecond.deliveryDate === data.solar_date}"
                    :style="calcDate(data, idx)">
                    <span class="en-font">{{data.month_day}}</span>
                      <br/>
                    <span>{{ data.day_of_week }}</span>
                  </li>
                </ul>
              </div>
              <div class="text">
                <p v-if="deliveryDay.monthDay || deliveryDay.dayOfWeek" style="color: #333;">※ {{ msgDeliveryDay }}</p>
                <p>신청 주에 수령을 원하시면 별도 연락 부탁드립니다.<br/>
                (02-6929-3823)</p>
              </div>
            </div>
          </div>
          <!-- 카드 결제 정보-->
          <div class="payment-info">
            <p class="txt-point">카드 결제 정보</p>
            <div class="form-row">
              <div class="form-card">
                <input
                  autocomplete="cc-exp"
                  type="number"
                  class="form-input"
                  placeholder="카드 번호 (-없이 16자리 입력)"
                  maxlength="16"
                  @keydown="$common.NumberValidateEvt"
                  v-validate="'required'"
                  name="cardNumber"
                  v-model="joinSecond.cardNumber"
                >
                <input
                  autocomplete="cc-exp"
                  type="text"
                  class="form-input"
                  placeholder="MMYY"
                  v-validate="'required'"
                  @keyup="checkCardExpiry"
                  name="cardExpiry"
                >
              </div>
              <p
                class="txt-error"
                v-show="(errors.has('cardNumber') || errors.has('cardExpiry'))">
                카드번호 & 유효기간을 입력해주세요.
              </p>
              <p
                class="txt-error"
                v-show="cardVerify">
                {{ cardVerifyMsg }}
              </p>
            </div>
            <div class="form-row">
              <div>
                <input
                  type="text"
                  class="form-input"
                  name="birthDay"
                  v-model="joinSecond.userBirth"
                  placeholder="생년월일(YYMMDD)"
                  v-validate="'required'"
                  @keyup="checkBirthExpiry">
              </div>
              <p class="txt-error" v-show="errors.has('birthDay')">생년월일을 입력해주세요.</p>
              <p class="txt-error" v-show="birthVerify">{{ birthVerifyMsg }}</p>
            </div>
            <div class="form-row">
              <div>
                <input
                  type="password"
                  class="form-input"
                  placeholder="비밀번호"
                  v-model="joinSecond.cardPassword"
                  v-validate="'required'"
                  style="width: 106px;"
                  name="cardPwd">
                <div class="last-two-digits">
                  <span>닷</span>
                  <span>닷</span>
                </div>
              </div>
              <p class="txt-error" v-show="errors.has('cardPwd')">카드비밀번호 앞 2자리를 입력해주세요.</p>
            </div>
          </div>
          <!-- 개인정보 -->
          <div class="personal-info">
            <p class="txt-point">공동 현관 비밀번호 <br/> <span class="txt-entrance">(문 앞까지 가기 전에 공동 현관이 있는 경우)</span></p>
            <div class="form-row">
              <input
                type="text"
                v-model="joinSecond.lobbyPassword"
                class="form-input"
                placeholder="현관 비밀번호">
            </div>
          </div>
          <div class="recommendation">
            <p class="txt-point">추천인</p>
            <div class="form-row form-group" data-grid="7:3">
              <input
                type="text"
                class="form-input"
                placeholder="이메일 또는 코드"
                v-model="joinSecond.recommendCode">
              <button
                type="button"
                @click="recommendVerify"
                class="btn btn-secondary">
                확인
              </button>
            </div>
          </div>
          <!-- 쿠폰 -->
          <!--<div class="coupon">
            <p class="txt-point">쿠폰</p>
            <div class="form-row form-group" data-grid="7:3">
              <input
                type="text"
                class="form-input"
                v-model="joinSecond.coupon"
                placeholder="쿠폰">
              <button
                type="button"
                class="btn btn-secondary"
                @click="couponVerify">
                확인
              </button>
            </div>
          </div>-->
          <!-- 주문합계 -->
          <div class="order-total">
            <div>
              <table class="order-total-table">
                <colgroup>
                  <col width="*">
                  <col :width="($mq === 'sm') ? 100 : 120">
                </colgroup>
                <thead>
                <tr>
                  <th colspan="2">주문 합계</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                  <td>총 결제금액</td>
                  <td>
                    <span class="txt-number">
                      <vue-numeric separator="," v-model="price.totalPrice" read-only></vue-numeric>
                    </span>
                    <span class="txt-unit">원</span>
                  </td>
                </tr>
                </tfoot>
                <tbody>
                <tr>
                  <td>월 2회 단일 요금제</td>
                  <td>
                    <span class="txt-number"><vue-numeric separator="," v-model="price.basicPrice" read-only></vue-numeric></span>
                    <span class="txt-unit">원</span>
                  </td>
                </tr>
                <tr v-if="price.promotionPrice !== price.basicPrice">
                  <td>프로모션 기간 금액</td>
                  <td>
                    <span class="txt-number"><vue-numeric separator="," v-model="price.promotionPrice" read-only></vue-numeric></span>
                    <span class="txt-unit">원</span>
                  </td>
                </tr>
                <tr v-if="price.salePrice !== 0">
                  <td>추천인 할인</td>
                  <td>
                    <span class="txt-number">(-) <vue-numeric separator="," v-model="price.salePrice" read-only></vue-numeric></span>
                    <span class="txt-unit">원</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="custom-checkbox">
            <input class="custom-control-input" type="checkbox" name="private_flag" id="private_flag">
            <label class="custom-control-label" for="private_flag">
              상기 결제정보를 확인하였으며, 구매진행에 동의합니다. 첫번째 결제는 구독 상품 배송이 시작될때 이루어집니다.
            </label>
          </div>
          <div class="btn-complete">
            <button
              type="button"
              @click="finalSignup"
              class="btn btn-primary">
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
    <alert-modal ref="view" width="320" height="190" :isConfirm.sync="isConfirm"></alert-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertModal from '@/components/common/AlertModal';
import VueNumeric from 'vue-numeric';
import Codes from '@/library/api/codes';

export default {
  name: 'signUp-second',
  components: {
    AlertModal,
    VueNumeric,
  },
  data() {
    return {
      joinSecond: {
        deliveryDate: '',
        cardNumber: '',
        cardYearExpiry: '',
        cardMonthExpiry: '',
        userBirth: '',
        cardPassword: '',
        lobbyPassword: null,
        coupon: null,
        membershipId: 1,
        recommendCode: null,
      },
      price: {
        basicPrice: 0,
        promotionPrice: 0,
        salePrice: 0,
        totalPrice: 0,
      },
      setDeliveryDay: {},
      deliveryDay: {
        monthDay: '',
        dayOfWeek: '',
      },
      cardVerify: false,
      cardVerifyMsg: '',
      birthVerify: false,
      birthVerifyMsg: '',
      isConfirm: false,
    };
  },
  computed: {
    ...mapGetters({
      Join: 'signup/getJoin',
    }),
    msgDeliveryDay() {
      const date = _.split(this.deliveryDay.monthDay, '/');
      const week = _.trim(this.deliveryDay.dayOfWeek, '()');
      return `${date[0]}월 ${date[1]}일 첫 배송 후 격주 ${week}요일에 배송됩니다.`;
    },
  },
  methods: {
    ...mapActions({
      setJoinSecond: 'signup/setJoinSecond',
      signup: 'signup/signup',
    }),
    selectDay(param) {
      this.joinSecond.deliveryDate = param.solar_date;
      this.deliveryDay.monthDay = param.month_day;
      this.deliveryDay.dayOfWeek = param.day_of_week;
    },
    checkCardExpiry(evt) {
      const cardReg = /^(0?[1-9]|1[0-2]|12)(1[9]|[2-9][0-9]|99)$/;
      if (!cardReg.test(evt.target.value)) {
        this.cardVerify = true;
        this.cardVerifyMsg = '카드유효기간을 MMYY(월년) 형태로 입력해주세요. (ex: 0323)';
      } else {
        const cardMonth = evt.target.value.substr(0, 2);
        const cardYear = evt.target.value.substr(2, 4);

        this.cardVerify = false;
        this.joinSecond.cardMonthExpiry = cardMonth;
        this.joinSecond.cardYearExpiry = _.padStart(cardYear, 4, '20');
      };
    },
    checkBirthExpiry(evt) {
      const birthReg = /^([0-9][0-9]|99)(0?[1-9]|1[0-2]|12)(0?[1-9]|[12][0-9]|3[01])$/;
      if (!birthReg.test(evt.target.value)) {
        this.birthVerify = true;
        this.birthVerifyMsg = '생년월일을 YYMMDD(년월일) 형태로 입력해주세요. (ex: 851211)';
      } else this.birthVerify = false;
    },
    couponVerify() {
      const coupon = document.querySelector('input[name=coupon]');

      if (!this.$common.InputDataValidation(coupon, '쿠폰을 입력해주세요.', true)) return false;

      return true;
    },
    recommendVerify() {
      const $this = this;
      if (this.joinSecond.recommendCode === '' || this.joinSecond.recommendCode === null) {
        this.$common.viewAlertModal('추천인을 입력해 주세요.', this.$refs, 'alert');
      } else {
        Codes.getRecommendCode(this.joinSecond.membershipId, this.joinSecond.recommendCode).then(function(res) {
          if (res.data.result) {
            console.log(res);
            $this.price.totalPrice = res.data.total_price;
            $this.price.salePrice = res.data.sale_price;
            $this.$common.viewAlertModal('정상등록 되었습니다.', $this.$refs, 'alert');
          } else {
            $this.$common.viewAlertModal('추천인을 정확하게 입력해 주세요.', $this.$refs, 'alert');
          }
        }).catch(function(err) {
          console.error(err);
        });
      }
    },
    finalSignup() {

      const privateFlag = document.querySelector('input[name=private_flag]:checked');
      // 배송일 지정
      if (this.joinSecond.deliveryDate === '') {
        this.$common.viewAlertModal('배송일을 선택해주세요.', this.$refs, 'alert');
        return;
      }
      // 구매 동의 체크박스
      if (!privateFlag) {
        this.$common.viewAlertModal('구매진행에 동의해주세요.', this.$refs, 'alert');
        return;
      }
      this.setJoinSecond(this.joinSecond);

      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const signupRtn = await this.signup();
          if (signupRtn.result) {
            this.$common.viewAlertModal(signupRtn.msg, this.$refs, 'confirm', '/join/addinfo');
          } else {
            this.$common.viewAlertModal(signupRtn.msg, this.$refs, 'alert');
          }
          return;
        }
        this.$common.viewAlertModal('에러메시지를 확인하시고<br/>입력후 버튼을 눌러주세요.', this.$refs, 'alert');
      });
    },
    calcDate(data, idx) {
      if (idx === 0) {
        if (data.day_of_week === '(월)') {
          return { marginLeft: '0%'};
        } else if (data.day_of_week === '(화)') {
          return { marginLeft: '20%'};
        } else if (data.day_of_week === '(수)') {
          return { marginLeft: '40%'};
        } else if (data.day_of_week === '(목)') {
          return { marginLeft: '60%'};
        } else {
          return { marginLeft: '80%'};
        }
      }
    },
  },
  mounted() {
  },
  created() {
    const $this = this;
    Codes.getFirstDeliveryDays().then(function(res) {
      $this.setDeliveryDay = res.data.result;
    }).catch(function(err) {
      console.error(err);
    });
    Codes.getMembership().then(function(res) {
      if (res.data.result) {
        $this.price.basicPrice = res.data.data.price;
        $this.price.promotionPrice = res.data.data.promotion_price;
        if (!res.data.data.promotion_price) {
          $this.price.totalPrice = res.data.data.price;
        } else {
          $this.price.totalPrice = res.data.data.promotion_price;
        }
      } else {
        return false;
      }
    }).catch(function(err) {
      console.error(err);
    });
  },
  beforeMount() {
  },
  destroyed() {
  },
};
</script>

<style scoped lang="scss">
  .signup {
    padding: 23px 20px 123px;
  }
  .contents {
  }
  .content {
  }
  .signup-text {
    margin-bottom: 32px;
    .signup-title {
      margin-bottom: 12px;
      .text {
        font-size: 26px;
        line-height: 34px;
        letter-spacing: -1.4px;
        span {
          font-size: 28px;
          line-height: 36px;
          letter-spacing: 0;
          font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
        }
      }
    }
    .explain {
      font-size: 15px;
      line-height: 23px;
      letter-spacing: -0.6px;
      span {
        color: #797979;
      }
    }
  }

  .txt-point {
    margin-bottom: 12px;
  }
  .delivery-date {
    ul {
      font-size: 0;
      background-color: #f5f5f5;
      outline: 1px solid #f5f5f5;

    }
    li {
      user-select: none;
      cursor: pointer;
      display: inline-block;
      height: 50px;
      background-color: #fff;
      width: 20%;
      outline: 1px solid #cacaca;
      position: relative;
      color: #bbb;
      font-size: 15px;
      letter-spacing: 0;
      text-align: center;
      line-height: 18px;
      padding-top: 6px;
      &.selected {
        outline: 2px solid #333;
        outline-offset: -2px;
        z-index: 10;
        color: #333;
        font-weight: 700;
      }
    }
  }
  .delivery-date,
  .payment-info,
  .personal-info,
  .coupon,
  .order-total,
  .recommendation {
    margin-top: 36px;
  }
  .form-row {
    margin-bottom: 10px;
  }
  .payment-system {
    .form-input {
      &[readonly]{
        border: 2px solid #333;
      }
    }
  }
  .last-two-digits {
    display: inline-block;
    font-size: 0;
    margin-left: 4px;
    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #333;
      border-radius: 50%;
      overflow: hidden;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  .delivery-date {
    margin-top: 36px;
    .text {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.8px;
      color: #797979;
      margin-top: 9px;
    }
  }
  .payment-info {
    .form-card {
      display: flex;
      input {
        &:nth-child(1){
          margin-right: 8px;
        }
        &:nth-child(2){
          flex: 0 0 106px;
        }
      }
    }
  }
  .txt-entrance {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.8px;
    color: #797979;
    font-weight: 400;
  }
  .order-total {
    margin-bottom: 15px;
    &-table {
      table-layout: fixed;
      width: 100%;
      font-size: 15px;
      line-height: 23px;
      letter-spacing: -0.6px;
      .txt-number {
        font-size: 18px;
        font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
        line-height: 25px;
        letter-spacing: 0;
      }
      th, td {
        border-bottom: 1px solid #e9e9e9;
        height: 60px;
      }
      td {
        &:nth-child(2){
          text-align: right;
        }
      }
      thead {
        th {
          font-weight: 400;
        }
      }
      tfoot {
        td {
          font-weight: 700;
        }
      }
    }
  }
  .btn-complete {
    margin-top: 71px;
    margin-left: -20px;
    width: calc( 100% + 20px + 20px);
    button {
      width: 100%;
      height: 60px;
      font-size: 18px;
    }
  }
  @media (min-width: 767px) {
    .signup {
      margin: 0 auto;
      width: 1200px;
      padding: 0;
    }
    .contents {
      margin: 74px auto 0;
      width: 784px;
    }
    .signup-text {
      margin-bottom: 0;
    }
    .content {
      &:nth-child(1) {
        float: left;
        width: 302px;
      }
      &:nth-child(2) {
        float: right;
        width: 334px;
      }
    }
    .signup-text {
      .signup-title {
        .text {
          font-size: 32px;
          line-height: 40px;
          letter-spacing: -1.7px;
          font-weight: 500;
          span {
            font-size: 34px;
            line-height: 36px;
            letter-spacing: 0;
          }
        }
      }
      .explain {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -1px;
      }
    }

    .order-total-table {
      font-size: 16px;
      .txt-number {
        font-size: 22px;
      }
    }
  }
</style>
