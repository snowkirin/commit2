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
                    @click="selectDay(data.solar_date)"
                    :class="{'selected': joinSecond.deliveryDate === data.solar_date}"
                    :style="calcDate(data, idx)">
                    <span class="en-font">{{data.month_day}}</span>
                      <br/>
                    <span>{{ data.day_of_week }}</span>
                  </li>
                </ul>
              </div>
              <p class="text">
                ※ 신청 주에 수령을 원하시면 별도 연락 부탁드립니다.<br/>
                (010-2712-6010)
              </p>
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
            <p class="txt-point">개인 정보 (배송을 위해 현관 비밀번호를 알려주세요)</p>
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
                class="btn btn-secondary">
                확인
              </button>
            </div>
          </div>
          <!-- 쿠폰 -->
          <div class="coupon">
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
          </div>
          <!-- 주문합계 -->
          <div class="order-total">
            <div>
              <table class="order-total-table">
                <colgroup>
                  <col width="*">
                  <col width="100">
                </colgroup>
                <thead>
                <tr>
                  <th colspan="2">주문 합계</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                  <td>총 가격</td>
                  <td><span class="txt-number">78,000</span> <span class="txt-unit">원</span></td>
                </tr>
                </tfoot>
                <tbody>
                <tr>
                  <td>월 2회 단일 요금제</td>
                  <td><span class="txt-number">78,000</span> <span class="txt-unit">원</span></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="custom-checkbox">
            <input class="custom-control-input" type="checkbox" name="private_flag" id="private_flag">
            <label class="custom-control-label" for="private_flag">
              상기 결제정보를 확인하였으며, 구매진행에 동의합니다.
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
  <!--<div class="signup subContent mauto">
    <div class="w100 mt70 mauto">
      <div class="content-form d-inlinetable" style="margin-right: 30px; text-align: left;">
        <div class="signup-payment-title">
          ZULY는 78,000원<br/>
          <span>요금제 단일 상품 입니다.</span>
        </div>
        <div class="signup-payment-text" style="font-size: 16px;">
          월 2회 스타일링 된 의류 세트(2벌) 정기 배송<br/>
          <span>(1회 배송 의류 리테일가<br/>30만원 기준 x 2 = 60만원)</span><br/>
          무료 세탁<br/>
          무료 수거/배송 서비스<br/>
          무료 전문 스타일링 및 스타일링 Tip 제공<br/>
        </div>
      </div>
      <div class="content-form d-inlinetable">
        <div class="signup-payment-label sp-mobile-only">요금제</div>
        <div class="signup-payment-btn explain mt18 day-name-active">
          월 2회 단일 78,000원 요금제
        </div>
        <div class="signup-payment-label mt40">배송일 지정</div>
        <div class="w100 mt18" style="text-align: left;">
          <div class="day-name-group">
            <div class="day-name" v-bind:class="{ 'day-name-active': deliveryDay === '0' }" data-id="0" @click="selectDay('0')">월</div>
            <div class="day-name" v-bind:class="{ 'day-name-active': deliveryDay === '1' }" data-id="1" @click="selectDay('1')">화</div>
            <div class="day-name" v-bind:class="{ 'day-name-active': deliveryDay === '2' }" data-id="2" @click="selectDay('2')">수</div>
            <div class="day-name" v-bind:class="{ 'day-name-active': deliveryDay === '3' }" data-id="3" @click="selectDay('3')">목</div>
            <div class="day-name" v-bind:class="{ 'day-name-active': deliveryDay === '4' }" data-id="4" @click="selectDay('4')">금</div>
          </div>
          <div class="mt10 signup-payment-text">
            <span>※ 신청 주에 수령을 원하시면 별도 연락 부탁드립니다.<br/>
            (010-2712-6010)</span>
          </div>
        </div>
        <div class="signup-payment-label mt40">카드 결제 정보</div>
        <div class="w100 mt18">
          <div class="field" :class="{ error: errors.has('cardNumber') }">
            <div class="inputGroup">
              <div class="inputIconLabel" style="display: inline-table; width: 72%;">
                <input type="text" name="cardNumber" class="form-login-input" placeholder="카드번호(- 없이 16자리 입력)" maxlength="16" @keydown="$common.NumberValidateEvt" v-validate="'required'" />
                <i class="fa fa-credit-card fa-lg"></i>
              </div>
              <div style="display: inline-table; width: 3%;"></div>
              <input type="text" name="cardExpiry" class="form-login-group" placeholder="MMYY" style="width: 25%;" v-validate="'required'" @keyup="checkCardExpiry" />
              <span class="error" v-show="(errors.has('cardNumber') || errors.has('cardExpiry'))">카드번호 & 유효기간을 입력해주세요.</span>
              <span class="error" v-show="cardVerify">{{ cardVerifyMsg }}</span>
            </div>
          </div>
          <div class="field mt12 talign-left" :class="{ error: errors.has('birthDay') }">
            <input type="text" name="birthDay" class="form-login-input" placeholder="생년월일(YYMMDD)" v-validate="'required'" @keyup="checkBirthExpiry" />
            <span class="error" v-show="errors.has('birthDay')">생년월일을 입력해주세요.</span>
            <span class="error" v-show="birthVerify">{{ birthVerifyMsg }}</span>
          </div>
          <div class="field mt12 talign-left" :class="{ error: errors.has('cardPwd') }">
            <input type="password" name="cardPwd" class="form-login-input" placeholder="비밀번호" style="width: 24%;" maxlength="2" v-validate="'required'" />
            <span class="password-icon-position">
              <i class="fa fa-circle" style="font-size: 8px;"></i>
              <i class="fa fa-circle" style="font-size: 8px;"></i>
            </span>
          </div>
          <div class="talign-left">
            <span class="error" v-show="errors.has('cardPwd')">카드비밀번호 앞 2자리를 입력해주세요.</span>
          </div>
        </div>
        <div class="signup-payment-label mt40">개인 정보(배송을 위해 현관 비밀번호를 알려주세요)</div>
        <div class="w100 mt18">
          <div class="field mt12">
            <input type="text" name="lobbyPwd" class="form-login-input" placeholder="현관 비밀번호" maxlength="12" />
          </div>
        </div>
        <div class="signup-payment-label mt40">쿠폰</div>
        <div class="w100 mt18">
          <div class="field mt12">
            <div class="inputGroup">
              <input type="text" name="coupon" class="form-login-group" placeholder="쿠폰" style="width: 72%;" />
              <div style="display: inline-table; width: 3%;"></div>
              <button class="button-grey" style="width: 25%;" @click="couponVerify">확인</button>
            </div>
          </div>
        </div>
        <div class="signup-payment-label-normal mt40">주문 합계</div>
        <div class="greyLine mt20"></div>
        <div class="signup-payment-label-normal mt30" style="font-size: 18px">
          월 2회 단일 요금제
          <span style="float: right;">￦78,000</span>
        </div>
        <div id="coupon-area" class="signup-payment-label mt12" style="font-size: 18px">
        </div>
        <div class="greyLine mt20"></div>
        <div class="signup-payment-label mt30" style="font-size: 18px">
          총 가격
          <span style="float: right;">￦78,000</span>
        </div>
        <div class="signup-chk-area mt40" @click="checkBoxEvt">
          <label class="container">
            <input type="checkbox" name="private_flag" value="Y" />
            <span class="checkmark"></span>
          </label>
          <div class="checkboxText">
            상기 결제정보를 확인하였으며, 구매진행에 동의합니다.
          </div>
        </div>
      </div>
      <div class="mt40">
        <div id="next-btn" class="next-btn" style="width: 392px; float: right;">
          <button class="button-login button-next" @click="finalSignup">
            결제
          </button>
        </div>
      </div>
    </div>
    <alert-modal ref="view" width="320" height="190" :isConfirm.sync="isConfirm"></alert-modal>
  </div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertModal from '@/components/common/AlertModal';
import Codes from '@/library/api/codes';

export default {
  name: 'signUp-second',
  components: {
    AlertModal,
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
        lobbyPassword: '',
        coupon: '',
        membershipId: 1,
        recommendCode: '',
      },
      setDeliveryDay: {},
      deliveryDay: '',
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
  },
  methods: {
    ...mapActions({
      signup: 'signup/signup',
      setJoinSecond: 'signup/setJoinSecond',
    }),
    selectDay(param) {
      this.joinSecond.deliveryDate = param;
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

      this.$validator.validateAll().then(async (result) => {
        if (result) {
          // const cardExpiry = document.querySelector('input[name=cardExpiry]').value;
          // const lobbyPwd = document.querySelector('input[name=lobbyPwd]').value;

          this.setJoinSecond(this.joinSecond);
          const signupRtn = await this.signup();
          console.log(signupRtn, 'signupRTN');
          /*const signupRtn = await this.signup({
            deliveryDay: this.deliveryDay,
            cardNumber: document.querySelector('input[name=cardNumber]').value,
            cardYearExpiry: `20${cardExpiry.substring(2, 4)}`,
            cardMonthExpiry: cardExpiry.substring(0, 2),
            userBirth: document.querySelector('input[name=birthDay]').value,
            cardPassword: document.querySelector('input[name=cardPwd]').value,
            lobbyPassword: lobbyPwd,
            coupon: document.querySelector('input[name=coupon]').value,
          });

          if (signupRtn.result) {
            this.$common.viewAlertModal(signupRtn.msg, this.$refs, 'confirm', '/login');
            for (let i = 1; i <= 14; i += 1) {
              this.$localStorage.remove(`S${i}`);
            }
          } else {
            this.$common.viewAlertModal(signupRtn.msg, this.$refs, 'alert');
          }*/
          return;
        }

        this.$common.viewAlertModal('에러메시지를 확인하시고<br/>입력후 버튼을 눌러주세요.', this.$refs, 'alert');
      });
    },
    /*dayHoverEvt(group, cnt, obj) {
      const target = obj;

      target.onmouseover = () => {
        if (this.deliveryDay !== target.getAttribute('data-id')) {
          target.classList.add('day-name-active');
          if (group[cnt + 1]) group[cnt + 1].classList.add('day-name-active-left');
        }
      };

      target.onmouseout = () => {
        if (this.deliveryDay !== target.getAttribute('data-id')) {
          target.classList.remove('day-name-active');
          if (group[cnt + 1]) group[cnt + 1].classList.remove('day-name-active-left');
        }
      };
    },*/
    // btnFixedEvt() {
    //   const btn = document.getElementById('next-btn');
    //   btn.classList.remove('next-btn', 'next-btn-mobile');
    //
    //   if (window.scrollY > 800) btn.classList.add('next-btn');
    //   else btn.classList.add('next-btn-mobile');
    // },
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
    /*const dayName = document.querySelectorAll('.day-name');
    for (let i = 0; i < dayName.length; i += 1) {
      this.dayHoverEvt(dayName, i, dayName[i]);
    }*/
  },
  created() {
    const $this = this;
    Codes.getFirstDeliveryDays().then(function(res) {
      $this.setDeliveryDay = res.data.result;
    }).catch(function(err) {
      console.error(err);
    });
  },
  beforeMount() {
    // window.addEventListener('scroll', this.btnFixedEvt);
  },
  destroyed() {
    // window.removeEventListener('scroll', this.btnFixedEvt);
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
  .order-total {
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
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    button {
      width: 100%;
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
            font-weight: 300;
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
/*.content-form {
  vertical-align: top;
}

.signup-payment-title {
  font-size: 32px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.32;
  letter-spacing: -1.5px;
  text-align: left;
  color: #333333;
  position: relative;
  bottom: 5px;
}
@media screen and (max-width: 486px) {
  .signup-payment-title {
    font-size: 26px;
  }

  .button-next {
    height: 60px !important;
  }
}

.signup-payment-title span {
  position: relative;
  right: 2px;
  letter-spacing: -1.0px;
}

.signup-payment-text {
  line-height: 1.5;
  margin-top: 10px;
  letter-spacing: -0.4px;
}

.signup-payment-text span {
  color: #797979;
}

.signup-payment-label {
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #333333;
}

.signup-payment-label-normal {
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #333333;
}

.signup-payment-btn {
  width: 100%;
  background-color: #ffffff;
  border: solid 2px #333333;
  text-align: left;
  padding: 15px 0 15px 22px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}

.signup-delivery {
  width: 47.9%;
  display: inline-block;
  padding: 20px 0 20px;
  border: solid 2px #dadada;
  text-align: center;
}

.password-icon-position {
}

.signup-chk-area {
  display: table;
  cursor: pointer;
}

.checkboxText {
  text-align: left;
  display: table-cell;
  vertical-align: bottom;
  letter-spacing: -1px;
  font-size: 16px;
}

.on {
  border: solid 2px #333333;
}

.mt18 {
  margin-top: 18px;
}

@media screen and (max-width: 486px) {
  .signup {
    padding: 0 4.8% 470px 4.8% !important;
  }

  .content-form {
    margin-right: 0px !important;
  }

  .next-btn {
    width: 100% !important;
    float: none !important;
  }

  .next-btn-mobile {
    position: fixed !important;
    width: 100% !important;
    bottom: 0 !important;
    left: 0 !important;
    z-index: 999 !important;
    margin-top: 0 !important;
    float: none !important;
  }

  .sp-mobile-only {
    margin-top: 40px;
  }
}*/
</style>
