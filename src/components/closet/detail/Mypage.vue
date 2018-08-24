<template>
  <div class="contents">
    <div class="contents-header">
      <p>나의 정보를 변경 하실 수 있습니다.</p>
    </div>
    <div class="content">

    </div>
  </div>
  <!--<div class="mypage">-->
    <!---->
    <!--<div class="contents" :class="{clearfix: $mq !== 'sm'}">-->
      <!--<div class="content">-->
        <!--<div class="phone">-->
          <!--<p class="txt-point">휴대폰 번호 변경</p>-->
          <!--<div class="row">-->
            <!--<div class="form-group" data-grid="7:3" :class="{error: errors.has('phone')}">-->
              <!--<input-->
                <!--type="tel"-->
                <!--class="form-input"-->
                <!--v-validate="'required'"-->
                <!--name="phone"-->
                <!--maxlength="14"-->
                <!--placeholder="새로운 휴대전화번호">-->
              <!--<button-->
                <!--class="btn btn-secondary"-->
                <!--@click="phoneVerify"-->
                <!--type="button">인증</button>-->
            <!--</div>-->
            <!--<p-->
              <!--class="txt-error"-->
              <!--v-if="errors.has('phone')">-->
              <!--휴대전화 번호를 입력해주세요.-->
            <!--</p>-->
          <!--</div>-->
          <!--<div class="row">-->
            <!--<div class="form-group" data-grid="7:3" :class="{error : errors.has('phone_auth_number')}">-->
              <!--<input-->
                <!--type="tel-extension"-->
                <!--class="form-input"-->
                <!--name="phone_auth_number"-->
                <!--v-validate="'required'"-->
                <!--placeholder="인증번호">-->
              <!--<button-->
                <!--class="btn btn-primary"-->
                <!--id="authKeyConfirm"-->
                <!--@click="authKeyConfirm"-->
                <!--type="button">확인</button>-->
            <!--</div>-->
            <!--<p-->
              <!--class="txt-error"-->
              <!--v-if="authErr">-->
              <!--{{ authErrMessage }}-->
            <!--</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="password">-->
          <!--<p class="txt-point">비밀번호 변경</p>-->
          <!--<form data-vv-scope="password">-->
            <!--<div class="row">-->
              <!--<div class="form-group" data-grid="7:3">-->
                <!--<input-->
                  <!--placeholder="현재 비밀번호"-->
                  <!--class="form-input"-->
                  <!--name="currentPassword"-->
                  <!--v-validate="'required'"-->
                  <!--v-model="password.cur_password"-->
                  <!--ref="currentPassword"-->
                  <!--type="password">-->
              <!--</div>-->
              <!--<p class="txt-error" v-if="errors.has('password.currentPassword')">현재 비밀번호를 입력해주세요.</p>-->
            <!--</div>-->
            <!--<div class="row">-->
              <!--<div class="form-group" data-grid="7:3">-->
                <!--<input-->
                  <!--placeholder="새로운 비밀번호"-->
                  <!--class="form-input"-->
                  <!--name="newPassword"-->
                  <!--ref="newPassword"-->
                  <!--v-model="password.new_password"-->
                  <!--v-validate="{ required: true, regex: pwdRegex }"-->
                  <!--@keyup="pwdCheck(errors.has('password.newPassword'))"-->
                  <!--type="password">-->
              <!--</div>-->
              <!--<p class="txt-error" v-if="errors.has('password.newPassword')">{{ pwdMsg }}</p>-->
          <!--</div>-->
            <!--<div class="row">-->
              <!--<div class="form-group" data-grid="7:3">-->
                <!--<input-->
                  <!--placeholder="새로운 비밀번호 확인"-->
                  <!--class="form-input"-->
                  <!--name="newPasswordConfirm"-->
                  <!--v-model="password.chk_new_password"-->
                  <!--v-validate="'required|confirmed:newPassword'"-->
                  <!--type="password">-->
                <!--<button-->
                  <!--class="btn btn-primary"-->
                  <!--type="button"-->
                  <!--@click="pwdChange">-->
                  <!--변경-->
                <!--</button>-->
              <!--</div>-->
              <!--<p class="txt-error" v-if="errors.has('password.newPasswordConfirm')">비밀번호가 일치하지 않습니다.</p>-->
            <!--</div>-->
          <!--</form>-->
        <!--</div>-->
        <!--&lt;!&ndash;카드번호&ndash;&gt;-->
        <!--<div class="payment-info">-->
          <!--<p class="txt-point">카드 결제 정보</p>-->
          <!--<p class="txt-current-card">(현재 카드 마지막 3자리 : {{cardNumberSubString}})</p>-->
          <!--<form data-vv-scope="card">-->
            <!--<div class="row">-->
              <!--<div class="form-card">-->
                <!--<input-->
                  <!--autocomplete="cc-exp"-->
                  <!--type="text"-->
                  <!--class="form-input"-->
                  <!--placeholder="카드 번호 (-없이 16자리 입력)"-->
                  <!--maxlength="16"-->
                  <!--@keydown="$common.NumberValidateEvt"-->
                  <!--v-validate="{required: true,}"-->
                  <!--v-model="cardPayment.cardNumber"-->
                  <!--name="cardNumber"-->
                <!--&gt;-->
                <!--<input-->
                  <!--autocomplete="cc-exp"-->
                  <!--type="text"-->
                  <!--class="form-input"-->
                  <!--placeholder="MMYY"-->
                  <!--ref="cardExpiry"-->
                  <!--v-validate="{required: true}"-->
                  <!--@keyup="checkCardExpiry"-->
                  <!--name="cardExpiry"-->
                <!--&gt;-->
              <!--</div>-->
              <!--<p-->
                <!--class="txt-error"-->
                <!--v-if="(errors.has('card.cardNumber') || errors.has('card.cardExpiry'))">-->
                <!--카드번호 & 유효기간을 입력해주세요.-->
              <!--</p>-->
              <!--<p-->
                <!--class="txt-error"-->
                <!--v-if="cardVerify">-->
                <!--{{ cardVerifyMsg }}-->
              <!--</p>-->
            <!--</div>-->
            <!--<div class="row">-->
              <!--<div>-->
                <!--<input-->
                  <!--type="text"-->
                  <!--class="form-input"-->
                  <!--name="birthDay"-->
                  <!--placeholder="생년월일(YYMMDD)"-->
                  <!--v-model="cardPayment.userBirth"-->
                  <!--@keyup="checkBirthExpiry"-->
                  <!--v-validate="{ required: true}">-->
              <!--</div>-->
              <!--<p class="txt-error" v-if="errors.has('card.birthDay')">생년월일을 입력해주세요.</p>-->
              <!--<p class="txt-error" v-if="birthVerify && !errors.has('card.birthDay')">{{ birthVerifyMsg }}</p>-->
            <!--</div>-->
            <!--<div class="row">-->
              <!--<div>-->
                <!--<input-->
                  <!--type="password"-->
                  <!--class="form-input"-->
                  <!--placeholder="비밀번호"-->
                  <!--maxlength="2"-->
                  <!--v-validate="'required'"-->
                  <!--style="width: 106px;"-->
                  <!--v-model="cardPayment.cardPassword"-->
                  <!--name="cardPwd">-->
                <!--<div class="last-two-digits">-->
                  <!--<span>닷</span>-->
                  <!--<span>닷</span>-->
                <!--</div>-->
                <!--<button-->
                  <!--type="button"-->
                  <!--class="btn btn-primary"-->
                  <!--style="float: right; width: 31.48%;"-->
                  <!--@click="clickCard">변경</button>-->
              <!--</div>-->
              <!--<p class="txt-error" v-if="errors.has('card.cardPwd')">카드비밀번호 앞 2자리를 입력해주세요.</p>-->
            <!--</div>-->
          <!--</form>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="content">-->
        <!--&lt;!&ndash;주소&ndash;&gt;-->
        <!--<div class="address">-->
          <!--<p class="txt-point">주소</p>-->
          <!--<div class="row">-->
            <!--<div class="form-group" data-grid="7:3">-->
              <!--<input-->
                <!--type="text"-->
                <!--class="form-input"-->
                <!--placeholder="우편번호"-->
                <!--readonly-->
                <!--ref="addrZipcode"-->
                <!--name="zipcode"-->
                <!--v-model="address.zipcode"-->
                <!--@click="openDaumPopup">-->
              <!--<button-->
                <!--type="button"-->
                <!--class="btn btn-secondary"-->
                <!--@click="openDaumPopup">주소 찾기</button>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="row">-->
            <!--<div class="form-group">-->
              <!--<input-->
                <!--type="text"-->
                <!--class="form-input"-->
                <!--placeholder="주소"-->
                <!--readonly-->
                <!--ref="addrAddress"-->
                <!--name="address"-->
                <!--v-model="address.addr"-->
                <!--@click="openDaumPopup">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="row">-->
            <!--<div class="form-group" data-grid="7:3">-->
              <!--<input-->
                <!--type="text"-->
                <!--class="form-input"-->
                <!--ref="addrDetailAddress"-->
                <!--name="detailAddress"-->
                <!--v-model="address.addrDetail"-->
                <!--placeholder="상세정보">-->
              <!--<button-->
                <!--type="button"-->
                <!--class="btn btn-primary"-->
                <!--@click="clickAddress">변경</button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash;기념일&ndash;&gt;-->
        <!--<div class="anniversary">-->
          <!--<p class="txt-point">기념일</p>-->
          <!--<div class="row">-->
            <!--<div class="form-group" data-grid="7:3">-->
              <!--<datepicker-->
                <!--style="width:65.8%"-->
                <!--name="ann"-->
                <!--input-class="form-input"-->
                <!--placeholder="기념일을 입력하시면, 기념일날 할인 쿠폰 지급"-->
                <!--language="ko"-->
                <!--v-model="ann"-->
                <!--format="MM.dd">-->
              <!--</datepicker>-->
              <!--<button type="button" class="btn btn-primary" @click="clickMemorialDay">변경</button>-->
            <!--</div>-->
          <!--</div>-->

        <!--</div>-->
        <!--<div class="entrance-number">-->
          <!--<div>-->
            <!--<p class="txt-point">공동 현관 번호</p>-->
            <!--<p class="txt-entrance-number">(배송을 위해 공동현관 비밀번호 알려주세요)</p>-->
          <!--</div>-->
          <!--<div class="row">-->
            <!--<div class="form-group" data-grid="7:3">-->
              <!--<input-->
                <!--class="form-input"-->
                <!--placeholder="현관 비밀번호"-->
                <!--v-model="lobbyPassword"-->
                <!--type="text">-->
              <!--<button-->
                <!--type="button"-->
                <!--class="btn btn-primary"-->
                <!--@click="clickLobbyPassword">변경</button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<address-modal ref="address" dataId="address"></address-modal>-->
  <!--</div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Member from '@/library/api/member';
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
      password: {
        cur_password: '',
        new_password: '',
        chk_new_password: '',
      },
      cardPayment: {
        cardNumber: '',
        cardYearExpiry: '',
        cardMonthExpiry: '',
        userBirth: '',
        cardPassword: '',
      },
      // 기념일
      ann: '',
      // 주소
      address: {
        zipcode: '',
        addr: '',
        addrDetail: '',
      },
      // 공동 현관 번호
      lobbyPassword: '',
      currentCardNumber: '51316582313212313',
    };
  },
  computed: {
    ...mapGetters({
      PasswordAuth: 'auth/PasswordAuth',
      mypageAuth: 'mypage/getMypageAuth',
      mypageData: 'mypage/getMypageData',
      mypagePwdFlag: 'mypage/getMypagePwdFlag',
      mypageEmailFlag: 'mypage/getMypageEmailFlag',
      mypagePaymentFlag: 'mypage/getMypagePaymentFlag',
      phoneAuthKey: 'mypage/getPhoneAuthKey',
      phoneAuth: 'mypage/getPhoneAuth',
    }),
    cardNumberSubString() {
      const cardNumber = this.mypageData.card_number;
      if (cardNumber) {
        const result = cardNumber.substring(cardNumber.length - 3, cardNumber.length);
        return result;
      }
    },
  },
  methods: {
    ...mapActions({
      destroyPasswordAuth: 'auth/destroyPasswordAuth',
      securityDestroyed: 'mypage/securityDestroyed',
      setMypage: 'mypage/setMypage',
      changeEmail: 'mypage/changeEmail',
      changePwd: 'mypage/changePwd',
      changePayment: 'mypage/changePayment',
      changeFlag: 'mypage/changeFlag',
      actPhoneVerify: 'mypage/phoneVerify',
      actPhoneCheckVerify: 'mypage/phoneCheckVerify',
    }),
    // 공통
    viewModal(ref) {
      this.$refs[ref].openModal();
    },
    closeModal(ref) {
      this.$refs[ref].closeModal();
    },
    // 휴대폰 번호
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

    // 비밀번호
    async pwdChange() {
      const passwordData = _.pick(this.password, ['cur_password', 'new_password']);
      const $this = this;
      this.$validator.validateAll('password').then((result) => {
        if (result) {
          Member.patchMemberPassword(passwordData)
            .then((res) => {
              if (res.data.result) {
                alert('비밀번호가 정상적으로 변경되었습니다.');
                _.forEach(this.password, function(value, key) {
                  $this.password[key] = '';
                });
                setTimeout(() => {
                  this.errors.clear('password');
                }, 0);
              } else {
                if (res.data.uncorrect) {
                  alert('현재 비밀번호가 틀렸습니다.');
                  this.$refs.currentPassword.focus();
                }
              }
            });
        }
      });
    },
    pwdCheck(isBoolean) {
      const pwd = this.$refs.newPassword;
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

    // 카드 결제
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
    clickCard() {
      const $this = this;
      if (this.cardVerify) {
        // 카드유효기간 체크
        alert('카드유효기간을 정확히 입력해주세요.');
        return false;
      }
      if (this.birthVerify) {
        // 생년월일 체크.
        alert('생년월일을 정확히 입력해주세요.');
        return false;
      }
      this.$validator.validateAll('card').then((result) => {
        if (result) {
          const cardExpiry = this.$refs.cardExpiry;
          this.cardPayment.cardYearExpiry = `20${cardExpiry.value.substring(2, 4)}`;
          this.cardPayment.cardMonthExpiry = cardExpiry.value.substring(0, 2);
          Member.patchMemberPayment(this.cardPayment).then((res) => {
            if (res.data.result) {
              alert('카드 결제 정보 변경이 완료되었습니다.');
              _.forEach(this.cardPayment, function(value, key) {
                $this.cardPayment[key] = '';
              });
              setTimeout(() => {
                this.errors.clear('card');
                // 정보 새로 업데이트 (카드 뒷자리 3개 변경)
                this.setMypage();
              }, 0);
            } else {
              alert('카드 결제 정보를 정확히 입력해 주세요.');
            }
          });
        }
      });
    },
    /* TODO: 사용될지 안될지 모름.*/
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
    getCardInfo() {
      if (this.mypageData.card_name !== null && this.mypageData.card_name !== undefined) {
        return `${this.mypageData.card_name} ${this.mypageData.card_number}`;
      }
      return '';
    },
    // 기념일
    clickMemorialDay() {
      const $this = this;
      if (this.ann === '') {
        alert('기념일을 선택해 주세요.');
        return false;
      } else {
        const memorialDayData = {
          ann: this.$moment(this.ann).format('MM.DD'),
        };
        Member.patchMemberMemorialDay(memorialDayData)
          .then((res) => {
            if (res.data.result) {
              alert('기념일이 변경되었습니다.');
              $this.ann = '';
            } else {
              alert('통신중 오류가 발생되었습니다.');
            }
          });
      }
    },
    // 공동 현관 번호
    clickLobbyPassword() {
      const $this = this;
      if (this.lobbyPassword === '') {
        alert('비밀번호를 입력해 주세요.');
      } else {
        const lobbyPasswordData = {
          lobbyPassword: this.lobbyPassword,
        };
        Member.patchMemberLobbyPassword(lobbyPasswordData)
          .then((res) => {
            if (res.data.result) {
              alert('현관 비밀번호가 변경되었습니다.');
              $this.lobbyPassword = '';
            } else {
              alert('통신중 오류가 발생되었습니다.');
            }
          });
      }
    },
    // 주소
    openDaumPopup() {
      this.viewModal('address');
      const detailAddress = this.$refs.addrDetailAddress;

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
            this.address.zipcode = data.zonecode;
            if (data.userSelectedType === 'R') {
              this.address.addr = data.roadAddress;
            } else {
              this.address.addr = data.jibunAddress;
            }
            detailAddress.focus();
          },
        }).embed(document.querySelector('div[name=addressArea]'), {});
      });
    },
    clickAddress() {
      const addressData = this.address;
      const $this = this;
      let checkAddressData = true;

      _.forEach(addressData, function(value) {
        if (value === '') {
          alert('주소를 입력해주세요');
          checkAddressData = false;
          return false;
        }
      });
      if (checkAddressData) {
        Member.patchMemberAddress(addressData)
          .then((res) => {
            if (res.data.result) {
              alert('주소가 변경되었습니다.');
              _.forEach($this.address, function(value, key) {
                $this.address[key] = '';
              });
            } else {
              alert('통신중 오류가 발생되었습니다.');
            }
          });
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

  },
  async created() {
    // if (!this.PasswordAuth) {
    //   alert('잘못된 접근입니다.');
    //   this.$router.push({ path: '/closet/security' });
    // }

    // 삭제할것
    // if (!this.mypageAuth) {
    //   alert('잘못된 접근입니다.');
    //   this.$router.push({ path: '/closet/security' });
    // } else {
    //   await this.setMypage();
    //   const htmlScript = document.createElement('script');
    //   htmlScript.setAttribute('src', 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false');
    //   document.head.appendChild(htmlScript);
    // }
  },
  destroyed() {
    this.destroyPasswordAuth();
  },
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss"></style>
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

  .phone {
    margin-bottom: 35px;
  }
  .password {
    margin-bottom: 27px;
  }
  .payment-info {
    margin-bottom: 30px;
  }
  .address {
    margin-bottom: 30px;
  }
  .anniversary{
    margin-bottom: 30px;
  }
  .row {
    margin-top: 10px;
  }

  .phone,
  .password,
  .address
  .anniversary,
  .entrance-number {
  }

  .txt-point {
    padding-bottom: 3px;
  }
  .name {
    .txt-point {
      margin-bottom: 7px;
    }
    .txt-name {
      font-size: 15px;
      line-height: 23px;
      letter-spacing: -0.9px;
      color: #797979;
    }
  }
  .password,
  .address {
  }
  .entrance-number {
    .txt-entrance-number {
      font-size: 15px;
      line-height: 23px;
      letter-spacing: -0.9px;
      color: #797979;
      margin-bottom: 13px;
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
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: 106px;
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
    .txt-current-card {
      font-size: 15px;
      line-height: 23px;
      letter-spacing: -0.9px;
      color: #797979;
    }
  }

  @media (min-width: 768px) {
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
      letter-spacing: -1px;
    }
    .contents {
      margin-top: 27px;
      margin-bottom: 39px;
      padding-top: 24px;
      border-bottom: 1px solid #e9e9e9;
      position: relative;
      &::before {
        position: absolute;
        left: 50%;
        top: 24px;
        display: block;
        content: '';
        width: 1px;
        height: calc(100% - 24px - 39px);
        background-color: #e9e9e9;
        transform: translateX(-50%);
      }
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
      }
    }
    .row {
    }
    .delivery-date {
      li {
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: 99px;
        font-size: 16px;
        letter-spacing: -1px;
      }
    }
    .btn-modify {
      text-align: right;
      button {
        width: 287px;
        height: 60px;
      }
    }
    .payment-info {
      margin-bottom: 0;
      .txt-current-card {
        font-size: 16px;
        letter-spacing: -0.8px;
      }
    }
  }
</style>
