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
              <div class="form-title-wrap">
                <p class="txt-form-title">배송일 지정</p>
              </div>
              <div>
                <div>
                  <ul class="list-flex list-delivery-days">
                    <li
                      v-for="(data, idx) in deliveryDateData"
                      :key="idx"
                      class="item w-20 h-50"
                      :class="[{'selected': paymentInfoData.deliveryDate === data.solar_date}, {'holy-day': data.is_holiday === 'Y'}]"
                      style="flex-direction: column;"
                      :style="calcDate(data, idx)"
                      @click="selectDay(data)"
                    >
                      <span class="txt-date-number">{{data.month_day}}</span>
                      <span>{{ data.day_of_week }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <notifications group="deliveryDate" width="100%" position="bottom left" :max="1" class="zuly-notify"/>
            </div>
            <div class="row">
              <div class="form-title-wrap mb-5">
                <p class="txt-form-title">카드 결제 정보</p>
              </div>
              <div class="mb-10">
                <div class="grid-flex grid-fixed">
                  <div class="column">
                    <label class="label-card" for="cardNumber">카드 번호 </label>
                    <div class="text-field" :class="{'text-field-error': errors.has('cardNumber')}">
                      <input
                        id="cardNumber"
                        autocomplete="cc-exp"
                        type="text"
                        placeholder="( - 없이, 15~16자리)"
                        maxlength="16"
                        v-validate="'required'"
                        name="cardNumber"
                        v-model="paymentInfoData.cardNumber"
                      >
                    </div>
                  </div>
                  <div class="column w-31 o-2">
                    <label class="label-card" for="cardExpiry">유효기간</label>
                    <div class="text-field" :class="{'text-field-error': errors.has('cardExpiry')}">
                      <input
                        id="cardExpiry"
                        autocomplete="cc-exp"
                        type="text"
                        placeholder="MMYY"
                        v-validate="'required'"
                        @keyup="checkCardExpiry"
                        name="cardExpiry"
                      >
                    </div>
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
                <div class="grid-flex grid-fixed">
                  <div class="column">
                    <label class="label-card" for="birdthDay">생년월일</label>
                    <div class="text-field" :class="{'text-field-error': errors.has('birthDay')}">
                      <input
                        id="birdthDay"
                        type="text"
                        class="form-input"
                        name="birthDay"
                        v-model="paymentInfoData.userBirth"
                        placeholder="생년월일(YYMMDD)"
                        v-validate="'required'"
                        @keyup="checkBirthExpiry">
                    </div>
                  </div>

                  <div class="column w-31 o-2">
                    <label class="label-card" for="cardPwd">비밀번호</label>
                    <div class="text-field" :class="{'text-field-error': errors.has('cardPwd')}">
                      <input
                        id="cardPwd"
                        type="password"
                        placeholder="앞2자리"
                        v-model="paymentInfoData.cardPassword"
                        maxlength="2"
                        v-validate="'required'"
                        name="cardPwd">
                    </div>
                  </div>
                </div>
                <p class="txt-error" v-show="errors.has('birthDay')">생년월일을 입력해주세요.</p>
                <p class="txt-error" v-show="birthVerify">{{ birthVerifyMsg }}</p>
                <p class="txt-error" v-show="errors.has('cardPwd')">카드비밀번호 앞 2자리를 입력해주세요.</p>
              </div>
            </div>
          </div>
          <div class="column column-right">
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">요금제</p>
              </div>
              <div>
                <div class="txt-payment">
                  <p>월 2회 단일 78,000원 요금제</p>
                </div>
                <div class="list-payment">
                  <ul>
                    <li>- 월 2회 의류 세트 정기 배송/수거 및 세탁</li>
                    <li>- 배송 전 상품 제안 및 스타일링 Tip 제공</li>
                    <li class="txt-warning">- 구독 해지 전까지 매월 자동 결제</li>
                  </ul>
                </div>
              </div>
            </div>
              <!-- 주문합계 -->
            <div class="row">
              <div>
                <table class="table-order-total">
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
                    <td>월 결제금액</td>
                    <td>
                      <span class="txt-number">
                        {{membershipData.promotion_price| currency('',0)}}
                      </span>
                      <span class="txt-unit">원</span>
                    </td>
                  </tr>
                  <tr class="first-payment-wrap">
                    <td>첫 결제 금액</td>
                    <td>무료</td>
                  </tr>
                  </tfoot>
                  <tbody>
                  <tr>
                    <td>월 2회 단일 요금제</td>
                    <td>
                    <span class="txt-number">
                      {{membershipData.price | currency('',0)}}
                    </span>
                      <span class="txt-unit">원</span>
                    </td>
                  </tr>
                  <tr v-if="membershipData.promotion_price !== membershipData.price">
                    <td>프로모션 기간 금액</td>
                    <td>
                    <span class="txt-number">
                      {{membershipData.promotion_price | currency('',0)}}
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
          class="btn btn-primary h-56"
          @click="clickComplete"
        >
          완료
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CalendarAPI from '@/library/api/calendar';
import PaymentAPI from '@/library/api/payment';

export default {
  name: 'signUp-second',
  components: {},
  data() {
    return {
      dialogOptions: {
        okText: '확인',
        customClass: 'zuly-alert',
        backdropClose: true
      },
      // 배송일 지정 데이터
      deliveryDateData: [],
      // 멤버쉽 데이터
      membershipData: {
        price: 0,
        promotion_price: 0,
        title: ''
      },

      // 회원가입을 위한 해당 페이지 저장소.
      paymentInfoData: {
        deliveryDate: '',
        cardNumber: '',
        cardYearExpiry: '',
        cardMonthExpiry: '',
        userBirth: '',
        cardPassword: '',
        coupon: null,
        membershipId: 1,
        recommendCode: null
      },

      joinData: {
        deliveryDate: '',
        cardNumber: '',
        cardYearExpiry: '',
        cardMonthExpiry: '',
        userBirth: '',
        cardPassword: '',
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
      isConfirm: false
    };
  },
  computed: {
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
      ADD_PAYMENT_INFO_DATA: 'join/ADD_PAYMENT_INFO_DATA',
      SIGNIN: 'join/SIGNIN'
    }),
    selectDay(param) {
      if (param.is_holiday === 'Y') {
        return;
      } else {
        this.paymentInfoData.deliveryDate = param.solar_date;
        this.deliveryDay.monthDay = param.month_day;
        this.deliveryDay.dayOfWeek = param.day_of_week;
        this.$notify({
          group: 'deliveryDate',
          text: `※ ${this.msgDeliveryDay}`
        });
      }
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
        this.paymentInfoData.cardMonthExpiry = cardMonth;
        this.paymentInfoData.cardYearExpiry = _.padStart(cardYear, 4, '20');
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
    successJoin() {
      this.$router.push({
        path: '/join/add-info'
      });
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
    },
    clickComplete() {
      const privateFlag = document.querySelector(
        'input[name=private_flag]:checked'
      );

      // 배송일 지정
      if (this.paymentInfoData.deliveryDate === '') {
        this.$dialog.alert('배송일을 선택해주세요.', this.dialogOptions);
        return;
      }
      // 구매 동의 체크박스
      if (!privateFlag) {
        this.$dialog.alert('구매진행에 동의해주세요.', this.dialogOptions);
        return;
      }
      this.$validator.validateAll().then(async result => {
        if (result) {
          // 배송 및 결제정보에서 입력했던 값을 저장한다.
          await this.ADD_PAYMENT_INFO_DATA({ ...this.paymentInfoData });
          // 지금까지 취합했던 값들을 취합한다. 만약 입력하지 않았다면 등등.
          // 모든 값들이 정확히 있다면 회원가입 API를 호출한다.

          const resultData = await this.SIGNIN();
          if (resultData.results) {
            // 성공했으니 다음페이지로 가시오!
            this.successJoin();
          } else {
            this.$dialog.alert(resultData.errorMsg, this.dialogOptions);
          }
        } else {
          document
            .querySelectorAll('.text-field-error input')[0]
            .setAttribute('tabindex', -1);
          document.querySelectorAll('.text-field-error input')[0].focus();
          document
            .querySelectorAll('.text-field-error input')[0]
            .setAttribute('tabindex', null);
        }
      });
    }
  },
  async created() {
    // 배송일 데이터를 가져온다.
    const firstDeliveryDaysResult = await CalendarAPI.GetFirstDeliveryDays();
    this.deliveryDateData = firstDeliveryDaysResult.data.result;
    // 기본 멤버쉽 정보를 가져온다.
    const membershipDataResult = await PaymentAPI.GetMembership();
    this.membershipData = membershipDataResult.data.data;
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

.label-card {
  @include fontSize(14px);
  display: block;
  margin-bottom: 5px;
}

.column-left {
  .row {
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
.row {
  margin-top: 30px;
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

.table-order-total {
  @include fontSize(15px);
  table-layout: fixed;
  width: 100%;
  .txt-number {
    @include fontSize(18px, en);
  }
  th,
  td {
    vertical-align: middle;
  }
  th {
    padding-bottom: 10px;
    font-weight: 700;
  }
  td {
    height: 60px;
    border-bottom: 1px solid #e9e9e9;
    &:nth-child(2) {
      text-align: right;
    }
  }
  thead {
    th {
      border-bottom: 1px solid $color-primary;
      font-weight: 700;
      text-align: left;
    }
  }
  tfoot {
    td {
      font-weight: 700;
    }
  }
  .first-payment-wrap {
    td {
      &:nth-child(1) {
        color: $color-primary;
      }
      color: #d16e7b;
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
