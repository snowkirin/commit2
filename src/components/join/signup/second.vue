<template>
  <div class="signup subContent mauto">
    <div class="w100 mt30 mauto">
      <div class="content-form d-inlinetable" style="margin-right: 30px; text-align: left;">
        <div class="signup-payment-title">
          ZULY는 78,000원<br/>
          <span>요금제 단일 상품 입니다.</span>
        </div>
        <div class="explain signup-payment-text" style="margin-top: 28px">
          월 2회 스타일링 된 의류 세트(2벌) 정기 배송<br/>
          <span>(1회 배송 의류 리테일가<br/>40만원 기준 x 2 = 80만원)</span><br/>
          무료 세탁<br/>
          무료 수거/배송 서비스<br/>
          무료 전문 스타일링 및 스타일링 Tip 제공<br/>
        </div>
      </div>
      <div class="content-form d-inlinetable">
        <div class="signup-payment-label">요금제</div>
        <div class="signup-payment-btn explain mt18">
          월 2회 단일 78,000원 요금제
        </div>
        <div class="signup-payment-label mt40">배송일 지정</div>
        <div class="w100 mt18" style="text-align: left;">
          <div>
            <label class="form-input-radio">
              <input type="radio" name="delivery_day" value="0" v-validate="'required'" />월요일
              <span class="checkmark-radio"></span>
            </label>
            <label class="form-input-radio" style="margin-left: 40px">
              <input type="radio" name="delivery_day" value="1" />화요일
              <span class="checkmark-radio"></span>
            </label>
            <label class="form-input-radio" style="margin-left: 40px">
              <input type="radio" name="delivery_day" value="2" />수요일
              <span class="checkmark-radio"></span>
            </label>
          </div>
          <div class="mt20">
            <label class="form-input-radio">
              <input type="radio" name="delivery_day" value="3" />목요일
              <span class="checkmark-radio"></span>
            </label>
            <label class="form-input-radio" style="margin-left: 40px">
              <input type="radio" name="delivery_day" value="4" />금요일
              <span class="checkmark-radio"></span>
            </label>
          </div>
          <div class="mt10 signup-payment-text">
            <span>※ 신청 주에 수령을 원하시면 별도 연락 부탁드립니다.<br/>
            (010-2712-6010)</span>
          </div>
          <div class="mt10">
            <span class="error" v-show="errors.has('delivery_day')">배송일을 지정해주세요.</span>
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
              <input type="text" name="cardExpiry" class="form-login-group" placeholder="MM/YY" style="width: 25%;" v-validate="'required'" @keyup="checkCardExpiry" />
              <span class="error" v-show="(errors.has('cardNumber') || errors.has('cardExpiry'))">카드번호 & 유효기간을 입력해주세요.</span>
              <span class="error" v-show="cardVerify">{{ cardVerifyMsg }}</span>
            </div>
          </div>
          <div class="field mt12 talign-left" :class="{ error: errors.has('birthDay') }">
            <input type="text" name="birthDay" class="form-login-input" placeholder="생년월일(YY/MM/DD)" v-validate="'required'" @keyup="checkBirthExpiry" />
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
            <input type="password" name="birthDay" class="form-login-input" placeholder="현관 비밀번호" />
          </div>
        </div>
        <div class="signup-payment-label mt40">쿠폰</div>
        <div class="w100 mt18">
          <div class="field mt12" :class="{ error: errors.has('zipcode') }">
            <div class="inputGroup">
              <input type="text" name="coupon" class="form-login-group" placeholder="쿠폰" style="width: 72%;" v-validate="'required'" />
              <div style="display: inline-table; width: 3%;"></div>
              <button class="button-grey" style="width: 25%;" @click="couponVerify">확인</button>
            </div>
          </div>
        </div>
        <div class="signup-payment-label mt40">주문 합계</div>
        <div class="greyLine mt20"></div>
        <div class="signup-payment-label mt30" style="font-size: 18px">
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
        <div class="signup-chk-area mt30" @click="checkBoxEvt">
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
        <div class="next-btn" style="width: 392px; float: right;">
          <button class="button-login" @click="finalSignup">
            결제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signUp-second',
  data() {
    return {
      deliveryDay: '',
      cardVerify: false,
      cardVerifyMsg: '',
      birthVerify: false,
      birthVerifyMsg: '',
    };
  },
  methods: {
    checkBoxEvt(evt) {
      const chkbox = evt.path[1].querySelector('input[type=checkbox]');
      if (chkbox) chkbox.checked = !chkbox.checked;
    },
    selectDelivery(evt) {
      const deliveryBtn = document.querySelector('.on');

      if (deliveryBtn) deliveryBtn.classList.remove('on');
      evt.target.classList.add('on');
      this.deliveryDay = evt.target.getAttribute('data-id');
    },
    checkCardExpiry(evt) {
      const cardReg = /^(0?[1-9]|1[0-2]|12)[/](1[9]|[2-9][0-9]|99)$/;
      if (!cardReg.test(evt.target.value)) {
        this.cardVerify = true;
        this.cardVerifyMsg = '카드유효기간을 MM/YY(월/년) 형태로 입력해주세요. (ex: 03/23)';
      } else this.cardVerify = false;
    },
    checkBirthExpiry(evt) {
      const birthReg = /^([0-9][0-9]|99)[/](0?[1-9]|1[0-2]|12)[/](0?[1-9]|[12][0-9]|3[01])$/;
      if (!birthReg.test(evt.target.value)) {
        this.birthVerify = true;
        this.birthVerifyMsg = '생년월일을 YY/MM/DD(년/월/일) 형태로 입력해주세요. (ex: 85/12/11)';
      } else this.birthVerify = false;
    },
    couponVerify() {
      const coupon = document.querySelector('input[name=coupon]');

      if (!this.$common.InputDataValidation(coupon, '쿠폰을 입력해주세요.', true)) return false;

      return true;
    },
    finalSignup() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          return;
        }

        alert('에러메시지를 확인하시고 입력후 버튼을 눌러주세요.');
      });
    },
  },
};
</script>

<style scoped>
.content-form {
  vertical-align: top;
}

.signup-payment-title {
  font-size: 38px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.26;
  letter-spacing: -1px;
  text-align: left;
  color: #212121;
  position: relative;
  bottom: 5px;
}

.signup-payment-title span {
  position: relative;
  letter-spacing: -3.2px;
  right: 2px;
}

.signup-payment-text {
  line-height: 1.7;
}

.signup-payment-text span {
  color: #797979;
}

.signup-payment-label {
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #212121;
}

.signup-payment-btn {
  width: 100%;
  background-color: #ffffff;
  border: solid 2px #212121;
  text-align: left;
  padding: 20px 0 20px 22px;
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
  letter-spacing: -2px;
}

.on {
  border: solid 2px #212121;
}

.mt18 {
  margin-top: 18px;
}
</style>
