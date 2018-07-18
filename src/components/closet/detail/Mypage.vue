<template>
  <div class="mypage">
    <p class="txt-main-title">나의 정보를 변경 하실 수 있습니다.</p>
    <div class="contents" :class="{clearfix: $mq !== 'sm'}">
      <div class="content">
        <div class="name row">
          <p class="txt-point">이름</p>
          <p class="txt-name"></p>
        </div>
        <div class="email row">
          <p class="txt-point">이메일</p>
          <div class="form-group" data-grid="7:3">
            <input type="email" class="form-input">
            <button
              class="btn btn-secondary"
              type="button">
              이메일 변경
            </button>
          </div>
        </div>
        <div class="password row">
          <p class="txt-point">비밀번호 변경</p>
          <div class="form-group" data-grid="7:3">
            <input
              class="form-input"
              type="password">
          </div>
          <div class="form-group" data-grid="7:3">
            <input
              class="form-input"
              type="password">
          </div>
          <div class="form-group" data-grid="7:3">
            <input
              class="form-input"
              type="password">
            <button
              class="btn btn-secondary"
              type="button">
              비밀번호 변경
            </button>
          </div>
        </div>
        <div class="phone row">
          <p class="txt-point">휴대폰 번호 변경</p>
          <div class="form-group" data-grid="7:3">
            <input
              type="tel"
              class="form-input"
              placeholder="휴대전화번호">
            <button
              class="btn btn-secondary"
              type="button">휴대폰 번호<br v-show="$mq === 'sm'"/> 변경</button>
          </div>
        </div>
        <!--카드번호-->
        <div class="card row">
          <p class="txt-point">카드 결제 정보</p>
          <div class="form-group" data-grid="7:3">
            <input type="number" name="" id="" class="form-input" placeholder="카드번호">
            <button type="button" class="btn btn-secondary">카드 변경</button>
          </div>
        </div>
      </div>
      <div class="content">
        <!--주소-->
        <div class="address row">
          <p class="txt-point">주소</p>
          <div class="form-group">
            <input type="text" class="form-input">
          </div>
          <div class="form-group">
            <input type="text" class="form-input">
          </div>
          <div class="form-group">
            <input type="text" class="form-input">
          </div>
        </div>
        <!--기념일-->
        <div class="anniversary row">
          <p class="txt-point">기념일</p>
          <div class="form-group">
            <input type="date" class="form-input">
          </div>
        </div>
        <!--배송일-->
        <div class="delivery-date row">
          <p class="txt-point">배송일 지정</p>
          <div>
            <ul>
              <li class="selected">월</li>
              <li>화</li>
              <li>수</li>
              <li>목</li>
              <li>금</li>
            </ul>
          </div>
        </div>
        <!--현관 번호-->
        <div class="entrance-number row">
          <div>
            <p class="txt-point">공동 현관 번호</p>
            <p class="txt-entrance-number">(배송을 위해 공동현관 비밀번호 알려주세요)</p>
          </div>
          <div>
            <input
              class="form-input"
              type="text">
          </div>
        </div>
      </div>
    </div>
    <div class="btn-modify">
      <button
        type="button"
        class="btn btn-primary">
        정보 수정하기
      </button>
    </div>
  </div>
  <!--<div class="mypage mt40">
    <div class="main-point-text closet-title">나의 정보관리</div>
    <div class="closet-title-text mt15">
      나의 정보를 변경 하실 수 있습니다.
    </div>
    <div class="mypage-content mt30">
      <div class="mypage-content-area">
        <div class="mypage-content-left" style="margin-bottom: 40px;">
          <div class="mypage-content-row">
            <div class="mypage-content-header">이름</div>
            <div class="mypage-content-data mt40">{{ mypageData.name }}</div>
          </div>
          <div class="mypage-content-row" style="margin-top: 63px;">
            <div class="mypage-content-header">이메일</div>
            <div class="mypage-content-data mobile-v">
              {{ mypageData.email }}
              <button id="changeEmail" class="button-grey" style="width: 20%; margin-left: 5px;" @click="displayEvt('emailarea', 'changeEmail', '이메일 변경')">이메일 변경</button>
            </div>
            <div class="mypage-content-data mt10 hide-area" id="emailarea">
              <div class="field">
                <div class="inputGroup">
                  <input type="text" name="changeEmail" class="form-login-group confirm-area" placeholder="변경할 이메일주소"/>
                  <div id="changeEmailConfirmWall" style="display: inline-table; width: 1.5% !important;"></div>
                  <button id="changeEmailConfirm" class="button-grey" style="width: 25%;" @click="actEmailChange" >변경</button>
                </div>
              </div>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">비밀번호 변경</div>
            <div class="mypage-content-data mt20">
              <div class="field" :class="{ error: errors.has('cur_password') }">
                <input type="password" name="cur_password" class="form-login-input" style="width: 60% !important;" placeholder="현재 비밀번호" v-validate="'required'" />
                <span class="error" v-show="errors.has('cur_password')">현재 비밀번호를 입력해주세요.</span>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('new_password') }">
                <input type="password" name="new_password" class="form-login-input" style="width: 60% !important;" placeholder="신규 비밀번호" v-validate="{ required: true, regex: pwdRegex }" @keyup="pwdCheck(errors.has('new_password'))" />
                <span class="error" v-show="errors.has('new_password')">{{ pwdMsg }}</span>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('new_password_confirm') }">
                <div class="inputGroup">
                  <input type="password" name="new_password_confirm" class="form-login-group" placeholder="신규 비밀번호 확인" style="width: 60%;" v-validate="'required|confirmed:new_password'" @change="pwdConfirm(errors.has('passwordConfirmation'))" />
                  <div style="display: inline-table; width: 1.5%;"></div>
                  <button id="changePwd" class="button-grey" style="width: 25%;" @click="pwdChange">비밀번호 변경</button>
                </div>
                <span class="error" v-show="errors.has('new_password_confirm')">비밀번호가 일치하지 않습니다.</span>
              </div>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">휴대폰 번호</div>
            <div class="mypage-content-data mt20">
              <div class="field">
                <div class="inputGroup">
                  <input type="text" name="view_phone" class="form-login-group" placeholder="휴대전화" style="width: 60%;" :value="mypageData.phone_no" disabled/>
                  <div style="display: inline-table; width: 1.5%;"></div>
                  <button id="changePhone" class="button-grey" style="width: 25%;" @click="displayEvt('phonearea', 'changePhone', '휴대폰번호 변경')">휴대폰번호 변경</button>
                </div>
              </div>
            </div>
            <div class="hide-area" id="phonearea">
              <div class="mypage-content-data mt10">
                <div class="field" :class="{ error: errors.has('phone') }">
                  <div class="inputGroup">
                    <input type="text" name="phone" class="form-login-group confirm-area" placeholder="휴대전화" v-validate="'required'" />
                    <div style="display: inline-table; width: 1.5%;"></div>
                    <button id="phoneVerify" class="button-grey" style="width: 25%;" @click="phoneVerify">인증</button>
                  </div>
                  <span class="error" v-show="errors.has('phone')">휴대전화를 입력해주세요.</span>
                </div>
              </div>
              <div class="mypage-content-data mt10">
                <div class="field" :class="{ error: errors.has('phone_auth_number') }">
                  <div class="inputGroup">
                    <input type="text" name="phone_auth_number" class="form-login-group confirm-area" placeholder="인증번호" v-validate="'required'" />
                    <div style="display: inline-table; width: 1.5%;"></div>
                    <button id="authKeyConfirm" class="button-grey" style="width: 25%;" @click="authKeyConfirm">확인</button>
                  </div>
                  <span class="error" v-show="authErr">{{ authErrMessage }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">카드 결제 정보</div>
            <div class="mypage-content-data mt20">
              <div class="field">
                <div class="mypage-content-data mobile-v">
                  <span style="width: 60%;">{{ getCardInfo() }}</span>
                  <button id="changeCard" class="button-grey" style="width: 20%;"
                  :style="{ 'margin-left': (mypageData.card_name !== null && mypageData.card_name !== undefined) ? '5px' : '0px;' }"
                  @click="displayEvt('cardarea', 'changeCard', '카드 변경')">카드 변경</button>
                </div>
              </div>
            </div>
            <div class="hide-area" id="cardarea">
              <div class="mypage-content-data mt20">
                <div class="field" :class="{ error: errors.has('cardNumber') }">
                  <div class="inputGroup">
                    <div class="inputIconLabel" style="display: inline-table; width: 60%;">
                      <input type="text" name="cardNumber" class="form-login-input" placeholder="카드번호(- 없이 16자리 입력)" maxlength="16" v-validate="'required'" />
                      <i class="fa fa-credit-card fa-lg"></i>
                    </div>
                    <div style="display: inline-table; width: 1.5%;"></div>
                    <input type="text" name="cardExpiry" class="form-login-group card-verify" placeholder="MM/YY" v-validate="'required'" @keyup="checkCardExpiry" />
                    <span class="error" v-show="(errors.has('cardNumber') || errors.has('cardExpiry'))">카드번호 & 유효기간을 입력해주세요.</span>
                    <span class="error" v-show="cardVerify">{{ cardVerifyMsg }}</span>
                  </div>
                </div>
                <div class="field mt12 talign-left" :class="{ error: errors.has('birthDay') }">
                  <input type="text" name="birthDay" class="form-login-input birth-verify" placeholder="생년월일(YYMMDD)" v-validate="'required'" @keyup="checkBirthExpiry" />
                  <span class="error" v-show="errors.has('birthDay')">생년월일을 입력해주세요.</span>
                  <span class="error" v-show="birthVerify">{{ birthVerifyMsg }}</span>
                </div>
                <div class="field mt12 talign-left" :class="{ error: errors.has('cardPwd') }">
                  <input type="password" name="cardPwd" class="form-login-input card-verify" placeholder="비밀번호" maxlength="2" v-validate="'required'" />
                  <span class="password-icon-position">
                    <i class="fa fa-circle" style="font-size: 8px;"></i>
                    <i class="fa fa-circle" style="font-size: 8px;"></i>
                  </span>
                  <button id="authKeyConfirm" class="button-grey" style="margin-left: 30px; width: 25%;" @click="paymentChange">확인</button>
                </div>
                <div class="talign-left">
                  <span class="error" v-show="errors.has('cardPwd')">카드비밀번호 앞 2자리를 입력해주세요.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mypage-content-center"></div>
        <div class="mypage-content-right">
          <div class="myapge-content-row mt40">
            <div class="mypage-content-header">주소</div>
            <div class="mypage-content-data mt20">
              <div class="field" :class="{ error: errors.has('zipcode') }">
                <div class="inputGroup">
                  <input type="text" name="zipcode" readonly="readonly" class="form-login-group" placeholder="우편번호" style="width: 60%;" v-validate="'required'" :value="mypageData.zipcode" />
                  <div style="display: inline-table; width: 1.5%;"></div>
                  &lt;!&ndash; <button id="findAddr" class="button-grey" style="width: 25%;" @click="openDaumPopup">주소찾기</button> &ndash;&gt;
                </div>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('address') }">
                <input type="text" name="address" readonly="readonly" class="form-login-input" placeholder="주소" style="width: 60%;" v-validate="'required'" :value="mypageData.address" />
                <span class="error" v-show="errors.has('address')">주소가 입력되지 않았습니다.</span>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('detail_address') }">
                <input type="text" name="detail_address" readonly="readonly" class="form-login-input" placeholder="상세주소" style="width: 60%;" v-validate="'required'" :value="mypageData.address_detail" />
                <span class="error" v-show="errors.has('detail_address')">상세주소가 입력되지 않았습니다.</span>
              </div>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">기념일</div>
            <div class="mypage-content-data mt20">
              <div class="field">
                <input type="text" name="ann" placeholder="기념일" readonly="readonly" class="form-login-input" :value="mypageData.memorial_day" style="width: 60%;">
              </div>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">배송일 지정</div>
            <div class="mypage-content-data mt30">
              <div class="day-name-group" style="width: 60%;">
                <div class="day-name" v-bind:class="{ 'day-name-active': delivery_day === 0 }">월</div>
                <div class="day-name" v-bind:class="{ 'day-name-active': delivery_day === 1 }">화</div>
                <div class="day-name" v-bind:class="{ 'day-name-active': delivery_day === 2 }">수</div>
                <div class="day-name" v-bind:class="{ 'day-name-active': delivery_day === 3 }">목</div>
                <div class="day-name" v-bind:class="{ 'day-name-active': delivery_day === 4 }">금</div>
              </div>
            </div>
          </div>
          <div class="mypage-content-row mb50">
            <div class="mypage-content-header">공동 현관 번호 <span>(배송을 위해 공동현관 비밀번호 알려주세요)</span></div>
            <div class="mypage-content-data mt20">
              <div class="field">
                <input type="text" name="lobbyPwd" readonly="readonly" class="form-login-input" style="width: 60%;" placeholder="공동 현관 번호" :value="mypageData.address_password" maxlength="12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mypage-modify-btn mt30 hide-area">
      <div class="mypage-button-area">
        <button class="button-grey mypage-button">취소</button>
        <button class="button-login mypage-button">저장</button>
      </div>
    </div>
    <address-modal ref="address" dataId="address"></address-modal>
  </div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import AddressModal from '@/components/common/AddressModal';

export default {
  name: 'mypage',
  components: {
    Datepicker,
    AddressModal,
  },
  data() {
    return {
      delivery_day: null,
      pwdRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
      pwdMsg: '신규 비밀번호를 입력해주세요.',
      isPwd: false,
      isPwdConfirm: false,
      authErr: false,
      authErrMessage: '',
      cardVerify: false,
      cardVerifyMsg: '',
      birthVerify: false,
      birthVerifyMsg: '',
    };
  },
  computed: {
    ...mapGetters({
      mypageAuth: 'mypage/getMypageAuth',
      mypageData: 'mypage/getMypageData',
      mypagePwdFlag: 'mypage/getMypagePwdFlag',
      mypageEmailFlag: 'mypage/getMypageEmailFlag',
      mypagePaymentFlag: 'mypage/getMypagePaymentFlag',
      phoneAuthKey: 'mypage/getPhoneAuthKey',
      phoneAuth: 'mypage/getPhoneAuth',
    }),
  },
  methods: {
    ...mapActions({
      securityDestroyed: 'mypage/securityDestroyed',
      setMypage: 'mypage/setMypage',
      changeEmail: 'mypage/changeEmail',
      changePwd: 'mypage/changePwd',
      changePayment: 'mypage/changePayment',
      changeFlag: 'mypage/changeFlag',
      actPhoneVerify: 'mypage/phoneVerify',
      actPhoneCheckVerify: 'mypage/phoneCheckVerify',
    }),
    selectDay(day) {
      this.delivery_day = day;
    },
    viewModal(ref) {
      this.$refs[ref].openModal();
    },
    closeModal(ref) {
      this.$refs[ref].closeModal();
    },
    checkCardExpiry(evt) {
      const cardReg = /^(0?[1-9]|1[0-2]|12)(1[9]|[2-9][0-9]|99)$/;
      if (!cardReg.test(evt.target.value)) {
        this.cardVerify = true;
        this.cardVerifyMsg = '카드유효기간을 MMYY(월년) 형태로 입력해주세요. (ex: 0323)';
      } else this.cardVerify = false;
    },
    checkBirthExpiry(evt) {
      const birthReg = /^([0-9][0-9]|99)(0?[1-9]|1[0-2]|12)(0?[1-9]|[12][0-9]|3[01])$/;
      if (!birthReg.test(evt.target.value)) {
        this.birthVerify = true;
        this.birthVerifyMsg = '생년월일을 YYMMDD(년월일) 형태로 입력해주세요. (ex: 851211)';
      } else this.birthVerify = false;
    },
    async phoneVerify() {
      const phone = document.querySelector('input[name=phone]');

      this.$validator.validate('phone', phone.value).then((result) => {
        if (result) {
          if (this.$common.phoneValidation(phone.value)) {
            this.actPhoneVerify({
              phone: phone.value.split('-').join(''),
            });

            this.startTimer();
            this.authErr = true;

            return true;
          }

          alert('올바른 휴대폰번호를 입력해주세요.');
        }

        phone.focus();
        return false;
      });
    },
    async authKeyConfirm() {
      const phoneAuthNumber = document.querySelector('input[name=phone_auth_number]');

      if (!this.phoneAuthKey) {
        alert('먼저 휴대전화를 입력하고 인증버튼을 눌러주세요.');
        return false;
      }

      if (!this.$common.InputDataValidation(phoneAuthNumber, '인증번호를 입력해주세요.', true)) return false;

      await this.actPhoneCheckVerify({
        authNumber: phoneAuthNumber.value,
      });

      if (this.phoneAuth) {
        const phone = document.querySelector('input[name=phone]');

        alert('휴대폰번호 변경이 완료되었습니다.');
        await this.setMypage();
        phone.value = '';
        phoneAuthNumber.value = '';
        this.authErr = false;
        this.displayEvt('phonearea', 'changePhone', '휴대폰번호 변경');
        this.changeFlag('phone');
      } else alert('인증번호를 다시 확인하시고 진행해주세요.');

      return true;
    },
    displayEvt(id, buttonArea, beforeText) {
      const target = document.getElementById(id);
      const textbtn = document.getElementById(buttonArea);

      if (target.style.display === 'block') {
        target.style.display = 'none';
        textbtn.innerHTML = beforeText;
      } else {
        target.style.display = 'block';
        textbtn.innerHTML = '변경 취소';
      }
    },
    async actEmailChange() {
      const email = document.querySelector('input[name=changeEmail]');

      if (!this.$common.InputDataValidation(email, '변경할 이메일을 입력해주세요.', true, true)) return;

      await this.changeEmail(email.value);

      if (this.mypageEmailFlag) {
        alert('이메일 변경이 완료되었습니다.');
        await this.setMypage();
        email.value = '';
        this.displayEvt('emailarea', 'changeEmail', '이메일 변경');
        this.changeFlag('email');
      }
    },
    async pwdChange() {
      if (!await this.$validator.validate('cur_password')) return;
      if (!await this.$validator.validate('new_password')) return;
      if (!this.isPwdConfirm) return;

      const curPwd = document.querySelector('input[name=cur_password]');
      const newPwd = document.querySelector('input[name=new_password]');
      const newPwdCf = document.querySelector('input[name=new_password_confirm]');

      await this.changePwd({
        curPassword: curPwd.value,
        newPassword: newPwd.value,
      });

      if (this.mypagePwdFlag) {
        alert('비밀번호 변경이 완료되었습니다.');
        curPwd.value = '';
        newPwd.value = '';
        newPwdCf.value = '';
        this.changeFlag('pwd');
      }
    },
    async paymentChange() {
      if (!await this.$validator.validate('cardNumber')) return;
      if (!await this.$validator.validate('cardExpiry')) return;
      if (!await this.$validator.validate('birthDay')) return;
      if (!await this.$validator.validate('cardPwd')) return;

      const cardNumber = document.querySelector('input[name=cardNumber]');
      const cardExpiry = document.querySelector('input[name=cardExpiry]');
      const birthDay = document.querySelector('input[name=birthDay]');
      const cardPwd = document.querySelector('input[name=cardPwd]');

      await this.changePayment({
        cardNumber: cardNumber.value,
        cardYearExpiry: `20${cardExpiry.value.substring(2, 4)}`,
        cardMonthExpiry: cardExpiry.value.substring(0, 2),
        userBirth: birthDay.value,
        cardPassword: cardPwd.value,
      });

      if (this.mypagePaymentFlag) {
        alert('카드 결제 정보 변경이 완료되었습니다.');
        await this.setMypage();
        cardNumber.value = '';
        cardExpiry.value = '';
        birthDay.value = '';
        cardPwd.value = '';
        this.displayEvt('cardarea', 'changeCard', '카드 변경');
        this.changeFlag('payment');
      }
    },
    pwdCheck(isBoolean) {
      const pwd = document.querySelector('input[name=new_password]');

      let checkBoolean = isBoolean;
      if (pwd.value === '') {
        if (!checkBoolean) checkBoolean = !checkBoolean;
        this.pwdMsg = '비밀번호를 입력해주세요.';
      } else {
        this.pwdMsg = '비밀번호가 안전하지 않습니다. (최소 8자리 이상, 대문자/숫자/특수문자 포함)';
      }

      if (checkBoolean) this.isPwd = false;
      else this.isPwd = true;
    },
    pwdConfirm(isBoolean) {
      if (isBoolean) this.isPwdConfirm = false;
      else this.isPwdConfirm = true;
    },
    openDaumPopup() {
      this.viewModal('address');
      const zipcode = document.querySelector('input[name=zipcode]');
      const address = document.querySelector('input[name=address]');
      const detailAddress = document.querySelector('input[name=detail_address]');

      const daum = window.daum;

      daum.postcode.load(() => {
        new window.daum.Postcode({
          width: '100%',
          height: '433',
          onclose: (state) => {
            if (state === 'COMPLETE_CLOSE') {
              this.closeModal('address');
            }
          },
          oncomplete: (data) => {
            zipcode.value = data.zonecode;

            if (data.userSelectedType === 'R') address.value = data.roadAddress;
            else address.value = data.jibunAddress;

            this.$validator.validate('zipcode');
            this.$validator.validate('address');

            detailAddress.focus();
          },
        }).embed(document.querySelector('div[name=addressArea]'), {});
      });
    },
    startTimer() {
      const timer = Date.parse(new Date(new Date().getTime() + (3 * 60 * 1000))) / 1000;
      let minutes;
      let seconds;

      if (window.interval) clearInterval(window.interval);

      const interval = setInterval(() => {
        const currentTime = Date.parse(new Date()) / 1000;
        const printTimer = timer - currentTime;

        minutes = parseInt(printTimer / 60, 10);
        seconds = parseInt(printTimer % 60, 10);

        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        this.authErrMessage = `메시지를 확인하시고 인증번호를 입력해주세요.  ${minutes}:${seconds}`;

        if (printTimer <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      window.interval = interval;
    },
    getCardInfo() {
      if (this.mypageData.card_name !== null && this.mypageData.card_name !== undefined) {
        return `${this.mypageData.card_name} ${this.mypageData.card_number}`;
      }
      return '';
    },
  },
  async created() {
    // if (!this.mypageAuth) {
    //   alert('잘못된 접근입니다.');
    //   this.$router.push({ path: '/closet/security' });
    // } else {
    //   const htmlScript = document.createElement('script');
    //   htmlScript.setAttribute('src', 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false');
    //   document.head.appendChild(htmlScript);
    //
    //   await this.setMypage();
    //   this.delivery_day = this.mypageData.delivery_day;
    // }
  },
  destroyed() {
    this.securityDestroyed();
  },
};
</script>

<style scoped lang="scss">
  .form-group {
    &[data-grid="7:3"]{
      input {
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: 65.8%;
        /*flex-basis: 65.8%;*/
        margin-right: 2.86%;
      }
      button {
        flex-basis: 31.48%;
      }
    }
  }
  .btn-secondary {
    line-height: 18px;
    height: 50px;
  }

  .mypage {
    padding: {
      top: 24px;
      right: 20px;
      bottom: 20px;
      left: 20px;
    }
  }
  .contents {
    margin-top: 13px;
    margin-bottom: 20px;
    padding-top: 16px;
    padding-bottom: 29px;
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
  }

  .row {
    margin-bottom: 35px;
  }
  .txt-point {
    margin-bottom: 12px;
  }

  .name {
    .txt-point {
      margin-bottom: 7px;
    }
    .txt-name {
      font-size: 15px;
      line-height: 23px;
      letter-spacing: -0.6px;
      color: #797979;
    }
  }

  .password,
  .address {
    .form-group {
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }

  .delivery-date {
    ul {
      list-style: none;
      display: flex;
    }
    li {
      height: 50px;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 57px;
      border: 1px solid #c4c4c4;
      margin-left: -1px;
      text-align: center;
      line-height: 48px;
      position: relative;
      color: #bbb;
      font-size: 15px;
      letter-spacing: -0.6px;
      &:first-child {
        margin-left: 0;
      }
      &.selected {
        outline: 2px solid #333;
        outline-offset: -2px;
        z-index: 10;
        color: #333;
      }
    }
  }
  .entrance-number {
    margin-bottom: 0;
    .txt-point {
      margin-bottom: 2px;
    }
    .txt-entrance-number {
      font-size: 15px;
      line-height: 23px;
      letter-spacing: -0.6px;
      color: #797979;
      margin-bottom: 13px;
    }
  }
  .btn-modify {
    button {
      width: 100%;
    }
  }

  @media (min-width: 767px) {
    .mypage {
      width: 1200px;
      padding: {
        top: 30px;
        right: 0;
        bottom: 0;
        left: 0;
      }
      margin: 0 auto;
    }
    .name .txt-name,
    .entrance-number .txt-entrance-number {
      font-size: 16px;
    }
    .contents {
      margin-top: 27px;
      margin-bottom: 18px;
      padding-top: 24px;
    }
    .content {
      width: 490px;
      .row {
        &:last-child {
          margin-bottom: 0;
        }
      }
      &:nth-child(1) {
        float: left;
      }
      &:nth-child(2) {
        float: right;
        margin-right: 59px;
      }
    }
    .row {
      margin-bottom: 33px;
    }
    .delivery-date {
      li {
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: 99px;
        font-size: 16px;
      }
    }
    .btn-modify {
      text-align: right;
      button {
        width: 287px;
        height: 60px;
      }
    }
  }

/*.mypage-modify-btn {
  height: 150px;
}

.mypage-content {
  border-top: 2px solid #333333;
  border-bottom: 2px solid #333333;
}

.mypage-content-area {
  display: flex;
}

.mypage-content-center {
  width: 0.1%;
  background-color: #797979;
  margin: 30px;
  opacity: 0.5;
}

.mypage-content-left, .mypage-content-right {
  width: 49.8%;
}

.mypage-content-row {
  margin-top: 40px;
}

.mypage-content-header {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.4px;
  color: #333333;
}

.mypage-content-data {
  font-size: 16px;
  line-height: 1;
  color: #333333;
}

.mypage-content-header span {
  font-weight: normal;
}

.mypage-button-area {
  float: right !important;
}

.mypage-button {
  width: 202px;
}

.confirm-area {
  width: 60%;
}

span.error {
  display: block;
}

.card-verify {
  width: 25% !important;
}

.birth-verify {
  width: 86.5% !important;
}

@media screen and (max-width: 486px) {
  .mypage-content-area {
    display: block;
  }

  .mypage-content-left,
  .mypage-content-right {
    width: 100%;
  }

  .mypage-content-right {
    margin-bottom: 40px;
  }

  input,
  .vdp-datepicker,
  .day-name-group {
    width: 100% !important;
  }

  input[name=view_phone],
  input[name=new_password_confirm] {
    width: 59.4% !important;
  }

  #findAddr,
  #changePhone,
  #changePwd{
    width: 38.6% !important;
  }

  #changeEmail,
  #changeCard,
  #changeEmailConfirm,
  #phoneVerify,
  #authKeyConfirm {
    margin-left: 0 !important;
    margin-top: 10px !important;
    width: 38.6% !important;
  }

  #changeEmailConfirm {
    margin-top: 10px;
  }

  .mobile-v {
    margin-top: 20px !important;
  }

  .mypage-button-area {
    width: 100%;
  }

  .mypage-button {
    width: 49%;
    height: 70px;
  }

  .confirm-area {
    width: 59% !important;
  }

  .card-verify {
    width: 38.5% !important;
  }

  .birth-verify {
    width: 100% !important;
  }
}*/
</style>
