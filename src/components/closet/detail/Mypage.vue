<template>
  <div class="contents">
    <div class="contents-header">
      <h3>나의 정보를 변경 하실 수 있습니다.</h3>
    </div>
    <div class="content-form content-border">
      <div>
        <div class="grid-flex">
          <div class="column column-left">
            <div class="row">
              <form data-vv-scope="phone">
                <!-- 휴대폰-->
                <div>
                  <div class="form-title-wrap">
                    <p class="txt-form-title">휴대폰 번호</p>
                  </div>

                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">
                        <div class="text-field">
                          <input
                            type="text"
                            readonly
                            :value="initPhoneNumber">
                        </div>
                      </div>
                      <div class="column w-26 o-3">
                        <button
                          type="button"
                          class="btn btn-secondary h-50"
                          @click="clickTogglePhone"
                        >
                          {{ isFlag.phoneNumber ? '변경 취소' : '변경'}}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-if="isFlag.phoneNumber" class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">
                        <div class="text-field" :class="{'text-field-error': errors.has('phone.latestPhoneNumber')}">
                          <input
                            type="text"
                            name="latestPhoneNumber"
                            ref="latestPhoneNumberInput"
                            placeholder="변경할 휴대폰 번호"
                            v-validate="{required: true, regex: /^\d{3}\d{3,4}\d{4}$/}"
                            data-vv-as="휴대폰 번호"
                            v-model.trim="phoneNumber"
                          >
                        </div>
                      </div>
                      <div class="column w-26 o-3">
                        <button
                          type="button"
                          class="btn btn-secondary h-50"
                          ref="latestPhoneNumberButton"
                          @click="clickSendPhoneAuth"
                        >
                          인증 전송
                        </button>
                      </div>
                    </div>
                    <p
                      class="txt-error"
                      v-if="errors.has('phone.latestPhoneNumber')"
                    >
                      {{errors.first('phone.latestPhoneNumber')}}
                    </p>
                  </div>

                  <div v-if="isFlag.phoneAuth" class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">
                        <div class="text-field">
                          <input type="text" v-model="phoneAuthNumber">
                        </div>
                      </div>
                      <div class="column w-26 o-3">
                        <button type="button" class="btn btn-secondary h-50" @click="clickChangePhone">변경</button>
                      </div>
                    </div>
                    <p
                      class="txt-error">
                      {{ authErrMessage }}
                    </p>
                  </div>

                </div>
              </form>
            </div>
            <div class="row">
              <form data-vv-scope="password" name="password">
                <!--비밀번호 -->
                <div>
                  <div class="form-title-wrap">
                    <p class="txt-form-title">비밀번호 변경</p>
                  </div>

                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column w-71">
                        <div class="text-field">
                          <input
                            type="password"
                            placeholder="현재 비밀번호"
                            name="currentPassword"
                            v-model="currentPassword"
                            data-vv-as="현재 비밀번호"
                            v-validate=""
                          >
                        </div>
                      </div>
                    </div>
                    <p class="txt-error" v-if="errors.has('password.currentPassword')">
                      {{ errors.first('password.currentPassword') }}
                    </p>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column w-71">
                        <div class="text-field" :class="{'text-field-error': errors.has('password.newPassword')}">
                          <input
                            type="password"
                            placeholder="신규 비밀번호"
                            name="newPassword"
                            ref="newPassword"
                            v-model="newPassword"
                            data-vv-as="신규 비밀번호"
                            v-validate="{regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/}"
                            @keyup="pwdCheck(errors.has('password.newPassword'))"
                          >
                        </div>
                      </div>
                    </div>
                    <p class="txt-error" v-if="errors.has('password.newPassword')">
                      {{ pwdMsg }}
                      <!--{{ errors.first('password.newPassword') }}-->
                    </p>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">
                        <div class="text-field" :class="{'text-field-error': errors.has('password.newPasswordConfirm')}">
                          <input
                            type="password"
                            placeholder="신규 비밀번호 확인"
                            name="newPasswordConfirm"
                            v-validate="{confirmed: newPassword}"
                          >
                        </div>
                      </div>
                      <div class="column w-26 o-3">
                        <button
                          type="button"
                          class="btn btn-primary h-50"
                          @click="clickChangePassword"
                        >
                          변경
                        </button>
                      </div>
                    </div>
                    <p
                      class="txt-error"
                      v-if="errors.has('password.newPasswordConfirm')"
                    >
                      비밀번호가 일치하지 않습니다.
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div class="row">
              <!--결재 카드-->
              <form data-vv-scope="payment" name="payment">
                <div>
                  <div class="form-title-wrap mb-5">
                    <p class="txt-form-title">결제 카드 변경 (등록 카드 마지막 3자리: {{ calcCardNumber }})</p>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">
                        <label class="label-card" for="newCardNumber">카드번호</label>
                        <div
                          class="text-field"
                          :class="{'text-field-error': errors.has('payment.newCardNumber')}">
                          <input
                            id="newCardNumber"
                            type="text"
                            placeholder="( - 없이, 15~16자리)"
                            name="newCardNumber"
                            maxlength="16"
                            v-validate="'max:16'"
                            data-vv-as="카드 번호"
                            v-model.trim="newCardNumber"
                          >
                        </div>
                      </div>
                      <div class="column w-23 o-3">
                        <label class="label-card" for="newCardValidity">유효기간</label>
                        <div
                          class="text-field"
                          :class="{'text-field-error': errors.has('payment.newCardValidity')}"
                        >
                          <input
                            id="newCardValidity"
                            type="text"
                            placeholder="MMYY"
                            maxlength="4"
                            name="newCardValidity"
                            v-validate="{date_format: 'MMYY'}"
                            data-vv-as="카드 유효 기간"
                            v-model.trim="newCardValidity"
                          >
                        </div>
                      </div>
                    </div>
                    <p
                      class="txt-error"
                      v-if="errors.has('payment.newCardNumber') || errors.has('payment.newCardValidity')"
                    >
                      {{errors.first('payment.newCardNumber')}}
                      <br v-if="errors.has('payment.newCardNumber')"/>
                      {{errors.first('payment.newCardValidity')}}
                    </p>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">

                      </div>
                    </div>
                    <p
                      class="txt-error"
                      v-if="errors.has('payment.newCardBirth')">
                      {{ errors.first('payment.newCardBirth') }}
                    </p>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">
                        <label class="label-card" for="newCardBirth">생년월일</label>
                        <div
                          class="text-field"
                          :class="{'text-field-error': errors.has('payment.newCardBirth')}"
                        >
                          <input
                            id="newCardBirth"
                            type="text"
                            placeholder="YYMMDD"
                            maxlength="6"
                            name="newCardBirth"
                            v-validate="{date_format: 'YYMMDD'}"
                            data-vv-as="생년월일"
                            v-model.trim="newCardBitrh"
                          >
                        </div>
                      </div>

                      <div class="column o-3">
                        <label class="label-card" for="newCardPassword">카드 비밀번호</label>
                        <div
                          class="text-field"
                          :class="{'text-field-error': errors.has('payment.newCardPassword')}">
                          <input
                            id="newCardPassword"
                            type="text"
                            placeholder="앞 두자리"
                            maxlength="2"
                            name="newCardPassword"
                            v-validate="{digits: 2}"
                            data-vv-as="비밀번호"
                            v-model.trim="newCardPassword"
                          >
                        </div>
                      </div>

                      <div class="column w-26 o-3">
                        <label class="label-card">&nbsp;</label>
                        <button
                          type="button"
                          class="btn btn-primary h-50"
                          @click="clickChangePayment"
                        >
                          변경
                        </button>
                      </div>
                    </div>
                    <p
                      class="txt-error"
                      v-if="errors.has('payment.newCardPassword')"
                    >
                      {{ errors.first('payment.newCardPassword') }}
                    </p>
                  </div>
                </div>
              </form>
            </div>


          </div>
          <div class="column column-right">
            <div class="row">
              <!--주소-->
              <form>
                <div>
                  <div class="form-title-wrap">
                    <p class="txt-form-title">주소</p>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">
                        <div class="text-field">
                          <input
                            type="text"
                            v-model="zipcode"
                            readonly
                            @click="clickOpenPostCode"
                          >
                        </div>
                      </div>
                      <div class="column w-26 o-3">
                        <button
                          type="button"
                          class="btn btn-secondary h-50"
                          @click="clickOpenPostCode"
                        >
                          주소 찾기
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="form-row" v-show="isFlag.postCode">
                    <div id="postCode"></div>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">

                      <div class="column">
                        <div class="text-field">
                          <input
                            type="text"
                            readonly
                            v-model="address"
                            @click="clickOpenPostCode"
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">

                      <div class="column">
                        <div class="text-field">
                          <input
                            type="text"
                            ref="addressDetail"
                            v-model="addressDetail"
                          >
                        </div>
                      </div>
                      <div class="column w-26 o-3">
                        <button
                          type="button"
                          class="btn btn-primary h-50"
                          @click="clickChangeAddr"
                        >
                          변경
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="row">
              <!--공동 현관-->
              <form>
                <div>
                  <div class="form-title-wrap">
                    <p class="txt-form-title">공동 현관 번호</p>
                    <p class="txt-form-explain">(배송을 위해 공동현관 비밀번호 알려주세요)</p>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">
                        <div class="text-field">
                          <input
                            type="text"
                            v-model="lobbyPassword"
                            placeholder="공용 현관이 없는 경우 없음을 입력해주세요."
                          >
                        </div>
                      </div>
                      <div class="column w-26 o-3">
                        <button
                          type="button"
                          class="btn btn-primary h-50"
                          @click="clickChangeLobbyPassword"
                        >
                          변경
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="row">
              <!--기념-->
              <form data-vv-scope="ann" name="ann">
                <div>
                  <div class="form-title-wrap">
                    <p class="txt-form-title">기념일</p>
                  </div>
                  <div class="form-row">
                    <div class="grid-flex grid-fixed">
                      <div class="column">
                        <div class="text-field" :class="{'text-field-error': errors.has('ann.aniversary')}">
                          <input
                            type="text"
                            maxlength="4"
                            name="anniversary"
                            v-validate="{date_format: 'MMDD'}"
                            data-vv-as="기념일"
                            v-model="anniversary"
                          >
                        </div>
                      </div>
                      <div class="column w-26 o-3">
                        <button
                          type="button"
                          class="btn btn-primary h-50"
                          @click="clickChangeAnn"
                        >
                          변경
                        </button>
                      </div>
                    </div>
                    <p class="txt-error" v-if="errors.has('ann.anniversary')">
                      {{ errors.first('ann.anniversary') }}
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <!-- 현재 사용되지 않음-->
            <div class="row">
              <!--회원 가입일-->
              <div>
                <div class="form-title-wrap">
                  <p class="txt-form-title">회원 가입일</p>
                </div>
                <div class="form-row">
                  <div class="grid-flex grid-fixed">
                    <div class="column">
                      <div class="text-field">
                        <input type="text" readonly :value="User.inserted">
                      </div>
                    </div>
                    <div class="column w-26 o-3">
                      <button
                        type="button"
                        class="btn btn-primary h-50"
                        @click="clickWithdrawal"
                        :disabled="User.type === 14702"
                      >
                        회원탈퇴
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Simplert from 'vue2-simplert';

const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인' // 닫기 버튼 텍스트
};

export default {
  name: 'mypage',
  components: { Simplert },
  data() {
    return {
      pwdMsg: '',
      initPhoneNumber: '',

      phoneNumber: '',
      phoneAuthNumber: '',
      authErrMessage: '',

      currentPassword: '',
      newPassword: '',

      currentCardName: '',
      currentCardNumber: '',

      newCardNumber: '',
      newCardValidity: '',
      newCardBitrh: '',
      newCardPassword: '',

      zipcode: '',
      address: '',
      addressDetail: '',

      lobbyPassword: '',

      anniversary: '',

      isFlag: {
        // Show / Hide할 Flag들이 들어갈곳
        phoneNumber: false,
        phoneAuth: false,
        postCode: false
      }
    };
  },
  computed: {
    ...mapGetters({
      Mypage: 'member/Mypage',
      PhoneAuth: 'member/PhoneAuth',
      User: 'login/User'
    }),
    calcCardNumber() {
      return this.currentCardNumber.substring(
        this.currentCardNumber.length - 3
      );
    }
  },
  methods: {
    ...mapActions({
      getMypage: 'member/getMypage',
      postPhone: 'member/postPhone',
      patchPhone: 'member/patchPhone',
      patchPassword: 'member/patchPassword',
      patchPayment: 'member/patchPayment',
      patchAddress: 'member/patchAddress',
      patchLobbyPassword: 'member/patchLobbyPassword',
      patchAnn: 'member/patchAnn',
      postCancel: 'login/postCancel',
      changeUserType: 'login/changeUserType'
    }),
    pwdCheck(isBoolean) {
      if (isBoolean) {
        if (this.newPassword === '') {
          this.pwdMsg = '비밀번호를 입력해주세요.';
        }
        else {
          this.pwdMsg = '비밀번호 형식에 맞지 않습니다. 8자리 이상의 영문,숫자,특수문자(!@#$%^&*) 포함';
        }
      }
    },
    setMypageData() {
      // 핸드폰 번호
      this.initPhoneNumber = this.Mypage.phone_no;

      this.currentCardName = this.Mypage.card_name;
      this.currentCardNumber = this.Mypage.card_number;

      this.zipcode = this.Mypage.zipcode;
      this.address = this.Mypage.address;
      this.addressDetail = this.Mypage.address_detail;

      this.lobbyPassword = this.Mypage.address_password
        ? this.Mypage.address_password
        : null;

      this.anniversary = this.Mypage.memorial_day
        ? this.Mypage.memorial_day.replace('.', '')
        : null;

      // this.initData = this.Mypage;
    },
    startTimer() {
      const timer =
        Date.parse(new Date(new Date().getTime() + 3 * 60 * 1000)) / 1000;
      let minutes;
      let seconds;

      if (window.interval) clearInterval(window.interval);

      const interval = setInterval(() => {
        const currentTime = Date.parse(new Date()) / 1000;
        const printTimer = timer - currentTime;

        minutes = parseInt(printTimer / 60, 10);
        seconds = parseInt(printTimer % 60, 10);

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        this.authErrMessage = `메시지를 확인하시고 인증번호를 입력해주세요.  ${minutes}:${seconds}`;

        if (printTimer <= 0) {
          clearInterval(interval);
          _.assign(alertObject, {
            message: '시간이 초과되었습니다. 다시 인증해주십시오.'
          });
          this.$refs.alert.openSimplert(alertObject);
        }
      }, 1000);

      window.interval = interval;
    },
    clickTogglePhone() {
      if (this.isFlag.phoneAuth) {
        this.$refs.latestPhoneNumberInput.disabled = false;
        this.$refs.latestPhoneNumberButton.disabled = false;
        clearInterval(window.interval);
        this.authErrMessage = '';
        this.isFlag.phoneAuth = false;
      }
      this.isFlag.phoneNumber = !this.isFlag.phoneNumber;
    },
    clickSendPhoneAuth() {
      this.$validator.validateAll('phone').then(result => {
        if (this.phoneNumber === this.initPhoneNumber) {
          _.assign(alertObject, {
            message: '같은 번호로는 변경이 불가능 합니다.'
          });
          this.$refs.alert.openSimplert(alertObject);
          return;
        }
        if (result) {
          const formData = {
            phone: this.phoneNumber
          };
          this.postPhone(formData).then(res => {
            if (res.data.result) {
              this.$refs.latestPhoneNumberInput.disabled = true;
              this.$refs.latestPhoneNumberButton.disabled = true;
              this.isFlag.phoneAuth = true;
              this.startTimer();
            } else {
              _.assign(alertObject, {
                message:
                  '통신오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.'
              });
              this.$refs.alert.openSimplert(alertObject);
              return;
            }
          });
        }
      });
    },
    clickChangePhone() {
      if (_.isEmpty(this.phoneAuthNumber)) {
        _.assign(alertObject, {
          message: '인증번호를 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      } else {
        const formData = {
          authId: this.PhoneAuth,
          authNumber: this.phoneAuthNumber
        };

        this.patchPhone(formData).then(res => {
          if (res.data.result) {
            this.$refs.latestPhoneNumberInput.disabled = false;
            this.$refs.latestPhoneNumberButton.disabled = false;
            clearInterval(window.interval);
            this.initPhoneNumber = this.phoneNumber;
            this.authErrMessage = '';
            this.phoneNumber = '';
            this.isFlag.phoneNumber = false;
            this.isFlag.phoneAuth = false;
          } else {
            alert('인증번호를 정확히 입력해 주세요.');
          }
        });
      }
    },
    clickChangePassword() {
      const formData = {
        cur_password: this.currentPassword,
        new_password: this.newPassword
      };

      if (_.isEmpty(formData.cur_password)) {
        _.assign(alertObject, {
          message: '현재 비밀번호를 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }
      if (_.isEmpty(formData.new_password)) {
        _.assign(alertObject, {
          message: '새로운 비밀번호를 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }

      this.$validator.validateAll('password').then(result => {
        if (result) {
          this.patchPassword(formData).then(res => {
            if (res.data.result) {
              const formTarget = document.password;
              _.assign(alertObject, {
                message: '비밀번호가 변경되었습니다.'
              });
              this.$refs.alert.openSimplert(alertObject);
              // 초기화
              formTarget.currentPassword.value = '';
              formTarget.newPassword.value = '';
              formTarget.newPasswordConfirm.value = '';
            } else {
              if (res.data.uncorrent) {
                _.assign(alertObject, {
                  message:
                    '현재 비밀번호가 정확하지 않습니다. 다시 입력해 주세요.'
                });
                this.$refs.alert.openSimplert(alertObject);
                return;
              }
            }
          });
          // 비밀번호 변경 API
        } else {
          _.assign(alertObject, {
            message: '새로운 비밀번호를 정확히 입력해 주세요.'
          });
          this.$refs.alert.openSimplert(alertObject);
          return;
        }
      });
    },
    clickChangePayment() {
      const formData = {
        cardNumber: this.newCardNumber,
        cardYearExpiry: this.newCardValidity,
        cardMonthExpiry: this.newCardValidity,
        userBirth: this.newCardBitrh,
        cardPassword: this.newCardPassword
      };

      if (_.isEmpty(formData.cardNumber)) {
        _.assign(alertObject, {
          message: '카드번호를 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }
      if (
        _.isEmpty(formData.cardYearExpiry) ||
        _.isEmpty(formData.cardMonthExpiry)
      ) {
        _.assign(alertObject, {
          message: '카드 유효기간을 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }
      if (_.isEmpty(formData.userBirth)) {
        _.assign(alertObject, {
          message: '생년월일을 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }
      if (_.isEmpty(formData.cardPassword)) {
        _.assign(alertObject, {
          message: '카드 비밀번호를 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }
      this.$validator.validateAll('payment').then(result => {
        if (result) {
          formData.cardYearExpiry = `20${formData.cardYearExpiry.substring(2)}`;
          formData.cardMonthExpiry = formData.cardMonthExpiry.substring(0, 2);
          this.patchPayment(formData).then(res => {
            if (res.data.result) {
              _.assign(alertObject, {
                message: '카드정보가 변경되었습니다.'
              });
              this.$refs.alert.openSimplert(alertObject);
              this.currentCardNumber = this.newCardNumber;
              // 입력했던 카드 정보 초기화
              this.newCardNumber = '';
              this.newCardValidity = '';
              this.newCardBitrh = '';
              this.newCardPassword = '';
            } else {
              _.assign(alertObject, {
                message:
                  '통신 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.'
              });
              this.$refs.alert.openSimplert(alertObject);
              return;
            }
          });
        } else {
          const formTarget = document.payment;
          const errorTarget = formTarget.querySelectorAll(
            '.text-field-error input'
          );
          errorTarget[0].focus();
        }
      });
    },
    clickOpenPostCode() {
      if (!this.isFlag.postCode) {
        const daum = window.daum;
        daum.postcode.load(() => {
          new window.daum.Postcode({
            width: '100%',
            height: '498px',
            onresize: () => {},
            onclose: state => {
              if (state === 'COMPLETE_CLOSE') {
              }
            },
            oncomplete: data => {
              this.completePostCode(data);
            }
          }).embed(document.getElementById('postCode'), {});
        });
      }
      this.isFlag.postCode = true;
    },
    clickClosePostCode() {
      this.isFlag.postCode = false;
    },
    completePostCode(result) {
      if (result.userSelectedType === 'R') {
        //  도로명 주소
        this.address = result.roadAddress;
      } else {
        //  지번 주소
        this.address = result.jibunAddress;
      }
      this.zipcode = result.zonecode;
      this.clickClosePostCode();
      this.addressDetail = '';
      this.$refs.addressDetail.focus();
    },
    clickChangeAddr() {
      // 주소 변경
      const formData = {
        zipcode: this.zipcode,
        addr: this.address,
        addrDetail: this.addressDetail
      };
      this.patchAddress(formData).then(res => {
        if (res.data.result) {
          _.assign(alertObject, {
            message: '주소가 변경되었습니다.'
          });
          this.$refs.alert.openSimplert(alertObject);
          this.clickClosePostCode();
        } else {
          _.assign(alertObject, {
            message: '통신오류가 발생하였습니다. 잠시후 다시 시도해 주세요.'
          });
          this.$refs.alert.openSimplert(alertObject);
          return;
        }
      });
    },
    clickChangeLobbyPassword() {
      // 공동 현관 비밀번호 변경
      const formData = {
        lobbyPassword: this.lobbyPassword
      };

      if (_.isEmpty(this.lobbyPassword)) {
        _.assign(alertObject, {
          message: '공동 현관 비밀번호를 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      } else {
        this.patchLobbyPassword(formData).then(res => {
          if (res.data.result) {
            _.assign(alertObject, {
              message: '공동 현관 비밀번호가 정상적으로 변경되었습니다.'
            });
            this.$refs.alert.openSimplert(alertObject);
          } else {
            _.assign(alertObject, {
              message: '통신오류가 발생하였습니다. 잠시후 다시 시도해 주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
          }
        });
      }
    },
    clickChangeAnn() {
      // 기념일 변경
      if (_.isEmpty(this.anniversary)) {
        _.assign(alertObject, {
          message: '기념일을 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      } else {
        this.$validator.validateAll('ann').then(result => {
          if (result) {
            const ann = `${this.anniversary.substring(
              0,
              2
            )}.${this.anniversary.substring(2)}`;
            const formData = {
              ann: ann
            };
            this.patchAnn(formData).then(res => {
              if (res.data.result) {
                _.assign(alertObject, {
                  message: '기념일이 정상적으로 변경되었습니다.'
                });
                this.$refs.alert.openSimplert(alertObject);
              } else {
                _.assign(alertObject, {
                  message:
                    '통신오류가 발생하였습니다. 잠시후 다시 시도해 주세요.'
                });
                this.$refs.alert.openSimplert(alertObject);
              }
            });
          } else {
            const formTarget = document.ann;
            const errorTarget = formTarget.querySelectorAll(
              '.text-field-error input'
            );
            errorTarget[0].focus();
          }
        });
      }
    },
    clickWithdrawal() {
      this.$dialog
        .confirm('정말 회원 탈퇴하시겠습니까??', {
          okText: '예',
          cancelText: '아니오',
          customClass: 'zuly-dialog',
          backdropClose: true
        })
        .then(() => {
          const formData = {
            reqType: 15102
          };
          this.postCancel(formData).then(res => {
            if (res.data.result) {
              this.changeUserType(14702);
              this.$dialog.alert('탈퇴 신청되었습니다.', {
                okText: '확인',
                backdropClose: true,
                customClass: 'zuly-alert'
              });
            }
          });
        })
        .catch(() => {});
    }
  },
  async created() {
    await this.getMypage();
    this.setMypageData();

    // POSTCODE
    const htmlScript = document.createElement('script');
    htmlScript.setAttribute(
      'src',
      'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false'
    );
    document.head.appendChild(htmlScript);
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
.label-card {
  @include fontSize(15px);
  display: block;
  margin-bottom: 5px;
}

.form-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

.content-form {
  padding-top: 20px;
  padding-bottom: 30px;
}

@media (min-width: 768px) {
  .content-form {
    background-color: #f7f7f7;
    padding: 25px 30px 30px;
  }
  .column-right {
    margin-left: 5%;
  }
}

@media (min-width: 1080px) {
  .column-left {
    padding-right: 90px;
    position: relative;
    &::after {
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      right: 0;
      border-right: 1px solid #e9e9e9;
      top: 0;
    }
  }
  .column-right {
    padding-left: 30px;
    padding-right: 60px;
  }
}
</style>
