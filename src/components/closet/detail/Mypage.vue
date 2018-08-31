<template>
  <div class="contents">
    <div class="contents-header">
      <h3>나의 정보를 변경 하실 수 있습니다.</h3>
    </div>
    <div class="content">
      <!--<vue-json-pretty :data="Mypage"></vue-json-pretty>-->
      <div>
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
        <form data-vv-scope="password">
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
                      v-validate="{required: true, regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/}"
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
                  <div class="text-field">
                    <input
                      type="password"
                      placeholder="신규 비밀번호"
                      name="newPassword"
                      ref="newPassword"
                      v-model="newPassword"
                      data-vv-as="신규 비밀번호"
                      v-validate="{
                        required: true,
                        regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/
                      }"
                    >
                  </div>
                </div>
              </div>
              <p class="txt-error" v-if="errors.has('password.newPassword')">
                {{ errors.first('password.newPassword') }}
              </p>
            </div>
            <div class="form-row">
              <div class="grid-flex grid-fixed">
                <div class="column">
                  <div class="text-field">
                    <input
                      type="password"
                      placeholder="신규 비밀번호 확인"
                      name="newPasswordConfirm"
                      v-validate="{required: true, confirmed: newPassword}"
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
        <!--결재 카드-->
        <form data-vv-scope="payment" name="payment">
          <div>
            <div class="form-title-wrap">
              <p class="txt-form-title">결제 카드</p>
              <p class="txt-form-explain">마지막 3자리: {{ calcCardNumber }}</p>
            </div>
            <div class="form-row">
              <div class="grid-flex grid-fixed">
                <div class="column">
                  <div
                    class="text-field"
                    :class="{'text-field-error': errors.has('payment.newCardNumber')}">
                    <input
                      type="text"
                      placeholder="카드 번호 (-없이 16자리 입력)"
                      name="newCardNumber"
                      maxlength="16"
                      v-validate="{credit_card: true}"
                      data-vv-as="카드 번호"
                      v-model.trim="newCardNumber"
                    >
                  </div>
                </div>
                <div class="column w-23 o-3">
                  <div
                    class="text-field"
                    :class="{'text-field-error': errors.has('payment.newCardValidity')}"
                  >
                    <input
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
                  <div
                    class="text-field"
                    :class="{'text-field-error': errors.has('payment.newCardBirth')}"
                  >
                    <input
                      type="text"
                      placeholder="생년월일(YYMMDD)"
                      maxlength="6"
                      name="newCardBirth"
                      v-validate="{date_format: 'YYMMDD'}"
                      data-vv-as="생년월일"
                      v-model.trim="newCardBitrh"
                    >
                  </div>
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
                  <div
                    class="text-field"
                    :class="{'text-field-error': errors.has('payment.newCardPassword')}">
                    <input
                      type="text"
                      placeholder="비밀번호"
                      maxlength="2"
                      name="newCardPassword"
                      v-validate="{digits: 2}"
                      data-vv-as="비밀번호"
                      v-model.trim="newCardPassword"
                    >
                  </div>
                </div>
                <div class="column">
                  **
                </div>
                <div class="column w-26 o-3">
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
            <div class="form-row" v-if="isFlag.postCode">
              <div>
                <DaumPostCode
                  style="border: 1px solid #3d3d35; max-height: 400px; overflow: auto;"
                  @complete="completePostCode"
                >
                </DaumPostCode>
              </div>

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

        <!--공동 현관-->
        <form>
          <div>
            <div class="form-title-wrap">
              <p class="txt-form-title">공동 현관 번호</p>
            </div>
            <div class="form-row">
              <div class="grid-flex grid-fixed">
                <div class="column">
                  <div class="text-field">
                    <input
                      type="text"
                      v-model="lobbyPassword"
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

        <!--회원 가입일-->
        <div v-if="false">
          <div class="form-title-wrap">
            <p class="txt-form-title">회원 가입일</p>
          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">
              <div class="column">
                <div class="text-field">
                  <input type="text">
                </div>
              </div>
              <div class="column">
                <button type="button" class="btn btn-primary h-50">회원탈퇴</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';

const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인' // 닫기 버튼 텍스트
};

export default {
  name: 'mypage',
  components: {
    VueJsonPretty
  },
  data() {
    return {
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
      PhoneAuth: 'member/PhoneAuth'
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
      patchPayment: 'member/patchPayment',
      patchAddress: 'member/patchAddress',
      patchLobbyPassword: 'member/patchLobbyPassword',
      patchAnn: 'member/patchAnn'
    }),
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
          alert('같은 번호로는 변경이 불가능 합니다.');
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
              alert('통신오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
            }
          });
        }
      });
    },
    clickChangePhone() {
      if (_.isEmpty(this.phoneAuthNumber)) {
        alert('인증번호를 입력해 주세요.');
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
      console.log('비밀번호 변경 버튼 누름');
      this.$validator.validateAll('password').then(result => {
        if (result) {
          console.log('비밀번호 변경 성공');
          // 비밀번호 변경 API
        } else {
          console.log('비밀번호 변경 실패');
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
        alert('카드 번호를 입력해 주세요');
        return;
      }
      if (
        _.isEmpty(formData.cardYearExpiry) ||
        _.isEmpty(formData.cardMonthExpiry)
      ) {
        alert('카드 유효기간를 입력해 주세요');
        return;
      }
      if (_.isEmpty(formData.userBirth)) {
        alert('생년월일를 입력해 주세요');
        return;
      }
      if (_.isEmpty(formData.cardPassword)) {
        alert('비밀번호를 입력해 주세요');
        return;
      }
      this.$validator.validateAll('payment').then(result => {
        if (result) {
          formData.cardYearExpiry = `20${formData.cardYearExpiry.substring(2)}`;
          formData.cardMonthExpiry = formData.cardMonthExpiry.substring(0, 2);
          console.log(formData);
          this.patchPayment(formData).then(res => {
            console.log(res);
            if (res.data.result) {
              alert('성공!');
              this.currentCardNumber = this.newCardNumber;
              // 입력했던 카드 정보 초기화
              this.newCardNumber = '';
              this.newCardValidity = '';
              this.newCardBitrh = '';
              this.newCardPassword = '';
            } else {
              alert('통신오류 발생');
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
          alert('변경되었습니다.');
          this.clickClosePostCode();
        } else {
          alert('통신 오류 발생');
        }
      });
    },
    clickChangeLobbyPassword() {
      // 공동 현관 비밀번호 변경
      const formData = {
        lobbyPassword: this.lobbyPassword
      };

      if (_.isEmpty(this.lobbyPassword)) {
        alert('공동 현관 번호를 입력해 주세요.');
      } else {
        this.patchLobbyPassword(formData).then(res => {
          if (res.data.result) {
            alert('변경되었습니다.');
          } else {
            alert('통신 오류 발생');
          }
        });
      }
    },
    clickChangeAnn() {
      // 기념일 변경
      if (_.isEmpty(this.anniversary)) {
        alert('기념일을 입력해 주세요.');
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
                alert('변경되었습니다.');
              } else {
                alert('통신오류 발생');
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
    }
  },
  async created() {
    await this.getMypage();
    this.setMypageData();
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
input[readonly] {
  color: #bbb;
}

.form-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
