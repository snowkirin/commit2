<!--suppress ALL -->
<template>
  <div class="contents">
    <div class="contents-header">
      <h3>배송 및 결제 정보</h3>
    </div>
    <form name="joinForm">
    <div class="content">
      <div class="grid-flex">
        <div class="column column-left">
          <div class="row">
            <p class="txt-form-title">배송일 지정</p>
            <div>
              <div>
                <ul class="list-flex">
                  <li
                    v-for="(data, idx) in FirstDeliveryDays"
                    :key="idx"
                    @click="selectDay(data)"
                    class="item w-20 h-50"
                    :class="{'selected': joinData.deliveryDate === data.solar_date}"
                    style="flex-direction: column;"
                    :style="calcDate(data, idx)">
                    <span class="lang-en">{{data.month_day}}</span>
                    <span>{{ data.day_of_week }}</span>
                  </li>
                </ul>
              </div>
              <p class="txt-delivery-date">신청 주에 수령을 원하시면 별도 연락 부탁드립니다.<br/>(02-6929-3823)</p>
            </div>
            <notifications group="deliveryDate" width="100%" position="bottom left" :max="1"/>
            <!--<p v-if="deliveryDay.monthDay || deliveryDay.dayOfWeek" style="color: #333;">※ {{ msgDeliveryDay }}</p>-->
            <!--<p style="color: #333;">※ {{ msgDeliveryDay }}</p>-->
          </div>
          <div class="row">
            <p class="txt-form-title">카드 결제 정보</p>
            <div class="mb-10">
              <div class="grid-flex grid-fixed">
                <div class="text-field column">
                  <input
                    autocomplete="cc-exp"
                    type="text"
                    placeholder="카드 번호 (-없이 16자리 입력)"
                    maxlength="16"
                    v-validate="'required'"
                    name="cardNumber"
                    v-model="joinData.cardNumber"
                  >
                </div>
                <div class="text-field column w-31 o-2">
                  <input
                    autocomplete="cc-exp"
                    type="text"
                    placeholder="MMYY"
                    v-validate="'required'"
                    @keyup="checkCardExpiry"
                    name="cardExpiry"
                  >
                </div>
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
            <div class="mb-10">
              <div class="text-field">
                <input
                  type="text"
                  class="form-input"
                  name="birthDay"
                  v-model="joinData.userBirth"
                  placeholder="생년월일(YYMMDD)"
                  v-validate="'required'"
                  @keyup="checkBirthExpiry">
              </div>
              <p class="txt-error" v-show="errors.has('birthDay')">생년월일을 입력해주세요.</p>
              <p class="txt-error" v-show="birthVerify">{{ birthVerifyMsg }}</p>
            </div>
            <div>
              <div class="grid-flex grid-fixed">
                <div class="column text-field">
                  <input
                    type="password"
                    placeholder="비밀번호"
                    v-model="joinData.cardPassword"
                    maxlength="2"
                    v-validate="'required'"
                    style="text-align: right;"
                    name="cardPwd">
                </div>
                <div class="column w-25">
                  <div class="center-align">
                    <div>
                      <span class="icon-dot">&middot;</span>
                      <span class="icon-dot">&middot;</span>
                    </div>
                  </div>
                </div>
              </div>
              <p class="txt-error" v-show="errors.has('cardPwd')">카드비밀번호 앞 2자리를 입력해주세요.</p>
            </div>
          </div>
        </div>
        <div class="column column-right">
          <div class="row">
            <div class="txt-form-title">
              요금제
            </div>
            <div>
              <div class="txt-payment">
                <p>월 2회 단일 78,000원 요금제</p>
              </div>
              <div class="list-payment">
                <ul>
                  <li>- 월 2회 의류 세트 정기 배송/수거 및 세탁</li>
                  <li>- 배송 전 상품 제안 및 스타일링 Tip 제공</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <p class="txt-form-title">공동 현관 비밀번호 <br/> <span class="txt-entrance">(문 앞까지 가기 전에 공동 현관이 있는 경우)</span>
            </p>
            <div>
              <div class="text-field">
                <input
                  type="text"
                  v-model="joinData.lobbyPassword"
                  class="form-input"
                  placeholder="현관 비밀번호">
              </div>
            </div>
          </div>
          <div class="row">
            <p class="txt-form-title">추천인</p>
            <div>
              <div class="grid-flex grid-fixed">
                <div class="column text-field">
                  <input
                    type="text"
                    class="form-input"
                    placeholder="이메일 또는 코드"
                    v-model="joinData.recommendCode">
                </div>
                <div class="column w-31 o-2">
                  <button
                    type="button"
                    @click="recommendVerify"
                    class="btn btn-secondary h-50">
                    확인
                  </button>
                </div>
              </div>


            </div>
          </div>
            <!-- 쿠폰 -->
            <!--<div class="coupon">
              <p class="txt-form-title">쿠폰</p>
              <div class="form-row form-group" data-grid="7:3">
                <input
                  type="text"
                  class="form-input"
                  v-model="joinData.coupon"
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
          <div class="row">
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
                    <vue-numeric
                      v-if="isRecommendCode"
                      separator=","
                      :value="RecommendCode.total_price"
                      read-only>
                    </vue-numeric>
                    <vue-numeric
                      v-else
                      separator=","
                      :value="Membership.promotion_price"
                      read-only>
                    </vue-numeric>
                  </span>
                    <span class="txt-unit">원</span>
                  </td>
                </tr>
                </tfoot>
                <tbody>
                <tr>
                  <td>월 2회 단일 요금제</td>
                  <td>
                  <span class="txt-number">
                    <vue-numeric
                      separator=","
                      v-model="Membership.price"
                      read-only/>
                  </span>
                    <span class="txt-unit">원</span>
                  </td>
                </tr>
                <tr v-if="Membership.promotion_price !== Membership.price">
                  <td>프로모션 기간 금액</td>
                  <td>
                  <span class="txt-number">
                    <vue-numeric
                      separator=","
                      v-model="Membership.promotion_price"
                      read-only/>
                  </span>
                    <span class="txt-unit">원</span>
                  </td>
                </tr>
                <tr v-if="RecommendCode.sale_price">
                  <td>추천인 할인</td>
                  <td>
                  <span class="txt-number">(-)
                    <vue-numeric
                      separator=","
                      :value="RecommendCode.sale_price"
                      read-only/>
                  </span>
                    <span class="txt-unit">원</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="custom-checkbox">
              <input class="custom-control-input" type="checkbox" name="private_flag" id="private_flag">
              <label class="custom-control-label" for="private_flag">
                상기 결제정보를 확인하였으며, 구매진행에 동의합니다. 첫번째 결제는 구독 상품 배송이 시작될때 이루어집니다.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-complete">
      <button
        type="button"
        @click="finalSignup"
        class="btn btn-primary h-56">
        완료
      </button>
    </div>
    </form>
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Simplert from 'vue2-simplert';
import VueNumeric from 'vue-numeric';

export default {
  name: 'signUp-second',
  components: {
    VueNumeric,
    Simplert
  },
  data() {
    return {
      joinData: {
        deliveryDate: '',
        cardNumber: '',
        cardYearExpiry: '',
        cardMonthExpiry: '',
        userBirth: '',
        cardPassword: '',
        lobbyPassword: null,
        coupon: null,
        membershipId: 1,
        recommendCode: null
      },
      deliveryDay: {
        monthDay: '',
        dayOfWeek: ''
      },
      cardVerify: false,
      cardVerifyMsg: '',
      birthVerify: false,
      birthVerifyMsg: '',
      isConfirm: false,
      isRecommendCode: false
    };
  },
  computed: {
    ...mapGetters({
      FirstDeliveryDays: 'codes/FirstDeliveryDays', // 첫구독시 배송일 데이터
      Membership: 'payment/Membership', // 멤버십 가격
      RecommendCode: 'payment/RecommendCode',
      Join: 'signup/Join'
    }),
    msgDeliveryDay() {
      const date = _.split(this.deliveryDay.monthDay, '/');
      const week = _.trim(this.deliveryDay.dayOfWeek, '()');
      return `${date[0]}월 ${
        date[1]
      }일 첫 배송 후 격주 ${week}요일에 배송됩니다.`;
    }
  },
  methods: {
    ...mapActions({
      getFirstDeliveryDays: 'codes/getFirstDeliveryDays', // 첫 구독시 배송일 데이터 호출
      getMembership: 'payment/getMembership',
      getRecommendCode: 'payment/getRecommendCode',
      setJoin: 'signup/setJoin',
      postJoin: 'signup/postJoin'
    }),
    selectDay(param) {
      this.joinData.deliveryDate = param.solar_date;
      this.deliveryDay.monthDay = param.month_day;
      this.deliveryDay.dayOfWeek = param.day_of_week;
      this.$notify({
        group: "deliveryDate",
        text: this.msgDeliveryDay
      });
    },
    checkCardExpiry(evt) {
      const cardReg = /^(0?[1-9]|1[0-2]|12)(1[9]|[2-9][0-9]|99)$/;
      if (!cardReg.test(evt.target.value)) {
        this.cardVerify = true;
        this.cardVerifyMsg =
          '카드유효기간을 MMYY(월년) 형태로 입력해주세요. (ex: 0323)';
      } else {
        const cardMonth = evt.target.value.substr(0, 2);
        const cardYear = evt.target.value.substr(2, 4);

        this.cardVerify = false;
        this.joinData.cardMonthExpiry = cardMonth;
        this.joinData.cardYearExpiry = _.padStart(cardYear, 4, '20');
      }
    },
    checkBirthExpiry(evt) {
      const birthReg = /^([0-9][0-9]|99)(0?[1-9]|1[0-2]|12)(0?[1-9]|[12][0-9]|3[01])$/;
      if (!birthReg.test(evt.target.value)) {
        this.birthVerify = true;
        this.birthVerifyMsg =
          '생년월일을 YYMMDD(년월일) 형태로 입력해주세요. (ex: 851211)';
      } else this.birthVerify = false;
    },
    couponVerify() {
      const coupon = document.querySelector('input[name=coupon]');
      return this.$common.InputDataValidation(
        coupon,
        '쿠폰을 입력해주세요.',
        true
      );
    },
    async recommendVerify() {
      const $this = this;

      if (
        this.joinData.recommendCode === '' ||
        this.joinData.recommendCode === null
      ) {
        alert('추천인을 입력해 주세요.');
      } else {
        const formData = {
          id: this.joinData.membershipId,
          code: this.joinData.recommendCode
        };
        await this.getRecommendCode(formData).then(res => {
          console.log(res);
          if (res.data.result) {
            alert('정상등록 되었습니다.');
            this.isRecommendCode = true;
          } else {
            alert('추천인을 정확하게 입력해 주세요.');
          }
        });
      }
    },
    clearStorage() {
      this.$localStorage.remove('joinFirst');
      this.$localStorage.remove('Mood');
      this.$localStorage.remove('Size');
    },
    async finalSignup() {
      const privateFlag = document.querySelector(
        'input[name=private_flag]:checked'
      );
      // 배송일 지정
      if (this.joinData.deliveryDate === '') {
        alert('배송일을 선택해주세요.');
        return;
      }
      // 구매 동의 체크박스
      if (!privateFlag) {
        alert('구매진행에 동의해주세요.');
        return;
      }
      await this.setJoin(this.joinData);
      this.$validator.validateAll().then(result => {
        if (result) {
          this.postJoin().then(res => {
            if (res.data.result) {
              alert('성공!');
              this.$router.push({
                path: '/join/addinfo'
              });
            } else {
              alert('오류발생');
            }
          });
        }
      });
      // this.$validator.validateAll().then((result) => {
      //   console.log(result);
      //   if (result) {
      //     this.postJoin().then(res => {
      //       if (res.result) {
      //         this.clearStorage();
      //         alert('성공!');
      //         this.$router.push({
      //           path: '/join/addinfo'
      //         });
      //         // this.$common.viewAlertModal(signupRtn.msg, this.$refs, 'confirm', '/join/addinfo');
      //       } else {
      //         // this.$common.viewAlertModal(signupRtn.msg, this.$refs, 'alert');
      //       }
      //     });
      //   }
      // });
    },
    calcDate(data, idx) {
      if (idx === 0) {
        if (data.day_of_week === '(월)') {
          return { marginLeft: 'calc(0% - 1px)' };
        } else if (data.day_of_week === '(화)') {
          return { marginLeft: 'calc(20% - 1px)' };
        } else if (data.day_of_week === '(수)') {
          return { marginLeft: 'calc(40% - 1px)' };
        } else if (data.day_of_week === '(목)') {
          return { marginLeft: 'calc(60% - 1px)' };
        } else {
          return { marginLeft: 'calc(80% - 1px)' };
        }
      }
    }
  },
  async created() {
    const $this = this;
    if (_.isEmpty(this.FirstDeliveryDays)) {
      await this.getFirstDeliveryDays();
    }
    this.getMembership();
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/join-style.scss"/>
<style scoped lang="scss">
.list-flex {
  background-color: #f5f5f5;
  .item {
    @include fontSize(15px);
    line-height: 1;
  }
}

.column-left {
  .row {
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
.row {
  margin-top: 36px;
}
.icon-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: $color-primary;
  border-radius: 50%;
  overflow: hidden;
  font-size: 0;
  text-indent: -9999em;
  &:nth-child(1) {
    margin-right: 10px;
  }
}
.txt-delivery-date {
  @include fontSize(14px);
  color: $color-secondary;
  margin-top: 10px;
}

.txt-entrance {
  @include fontSize(14px);
  color: $color-secondary;
  font-weight: 400;
}

.txt-payment {
  border: 2px solid #333;
  padding-left: 16px;
  p {
    @include fontSize(15px);
    font-weight: 700;
    line-height: 46px;
  }
}
.list-payment {
  margin-top: 10px;
  li {
    @include fontSize(14px);
  }
}

.order-total-table {
  @include fontSize(15px);
  table-layout: fixed;
  width: 100%;
  .txt-number {
    @include fontSize(18px, en);
  }
  th,
  td {
    border-bottom: 1px solid #e9e9e9;
    height: 60px;
    vertical-align: middle;
  }
  td {
    &:nth-child(2) {
      text-align: right;
    }
  }
  thead {
    th {
      font-weight: 400;
      text-align: left;
    }
  }
  tfoot {
    td {
      font-weight: 700;
    }
  }
}

@media (min-width: 768px) {
  .row {
    &:nth-child(1) {
      margin-top: 0;
    }
  }
  .order-total-table {
    @include fontSize(16px);
    .txt-number {
      @include fontSize(22px);
    }
  }
}
</style>
