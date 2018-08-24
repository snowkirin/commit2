<template>
  <div class="contents">
    <div class="contents-header">
      <h3>회원 정보 및 약관 동의</h3>
    </div>
    <form name="joinForm">
      <div class="content">
        <div class="grid-flex">
          <!--Left Side -->
          <div class="column column-left">
            <div class="user-account">
              <p class="txt-form-title">사용자 계정</p>
              <div>
                <div class="form-row">
                  <div
                    class="text-field"
                    :class="{'text-field-error' : errors.has('name')}"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      autocomplete="name"
                      maxlength="15"
                      v-validate="'required'"
                      v-model="joinData.name"
                    />
                  </div>
                  <p
                    v-if="errors.has('name')"
                    class="txt-error">
                    이름을 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div :class="{'text-field-error' : errors.has('email')}" class="text-field">
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      autocomplete="email"
                      maxlength="50"
                      v-validate="'required|email'"
                      v-model="joinData.email"
                    />
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('email')">
                    이메일을 정확하게 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div :class="{'text-field-error' : errors.has('password')}" class="text-field">
                    <input
                      type="password"
                      name="password"
                      placeholder="비밀번호 8자리 이상의 영문,숫자,특수문자 포함"
                      autocomplete="new-password"
                      maxlength="256"
                      ref="password"
                      v-validate="{ required: true, regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&^])[A-Za-z\d$@$!%*?&]{8,}/ }"
                      v-model="joinData.password"
                      @keyup="pwdCheck(errors.has('password'))"
                    />
                  </div>
                  <p
                    class="txt-error"
                    v-show="errors.has('password')">
                    {{ pwdMsg }}
                  </p>
                </div>
                <div class="form-row">
                  <div
                    class="text-field"
                    :class="{'text-field-error' : errors.has('passwordConfirm')}"
                  >
                    <input
                      type="password"
                      name="passwordConfirm"
                      placeholder="비밀번호 확인"
                      autocomplete="new-password"
                      maxlength="256"
                      v-validate="'required|confirmed:password'"
                    />
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('passwordConfirm')"
                  >
                    비밀번호가 일치하지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!--Right Side-->
          <div class="column column-right">
            <!-- 연락처 정보 -->
            <div class="contact-info">
              <p class="txt-form-title">연락처 정보</p>
              <div>
                <div class="form-row">
                  <div class="grid-flex grid-fixed">
                    <div class="text-field column" :class="{'text-field-error' : errors.has('phone')}">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="핸드폰번호"
                        autocomplete="tel-national"
                        maxlength="14"
                        v-validate="{ required: true, regex: /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})/ }"
                        v-model="joinData.phone"
                      />
                    </div>
                    <div class="column w-31 o-2">
                      <button
                        type="button"
                        class="btn btn-secondary h-50"
                        id="phoneVerify"
                        @click="clickPhoneVerify"
                      >
                        인증
                      </button>
                    </div>
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('phone')">
                    휴대전화를 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div class="grid-flex grid-fixed">
                    <div class="column text-field" :class="{'text-field-error' : errors.has('phoneAuthNumber')}">
                      <input
                        type="text"
                        name="phoneAuthNumber"
                        placeholder="인증번호"
                        autocomplete="tel-extension"
                        v-validate="'required'"
                      />
                    </div>
                    <div class="column w-31 o-2">
                      <button
                        type="button"
                        class="btn btn-secondary h-50"
                        id="authKeyConfirm"
                        @click="authKeyConfirm"
                      >
                        확인
                      </button>
                    </div>
                  </div>
                  <p
                    class="txt-error"
                    v-if="authErr">
                    {{ authErrMessage }}
                  </p>
                </div>
                <div class="form-row">
                  <div class="grid-flex grid-fixed">
                    <div class="column text-field" :class="{'text-field-error' : errors.has('zipcode')}">
                      <input
                        type="text"
                        name="zipcode"
                        placeholder="우편번호"
                        autocomplete="postal-code"
                        readonly
                        v-validate="'required'"
                        v-model="joinData.zipcode"
                        @click="openPostCode"
                      />
                    </div>
                    <div class="column w-31 o-2">
                      <button
                        type="button"
                        class="btn btn-secondary h-50"
                        @click="openPostCode"
                      >
                        주소찾기
                      </button>
                    </div>
                  </div>
                  <p></p>
                </div>
                <div class="form-row">
                  <div class="text-field" :class="{'text-field-error' : errors.has('address')}">
                    <input
                      type="text"
                      name="address"
                      placeholder="주소"
                      autocomplete="address-line1"
                      maxlength="30"
                      readonly
                      v-validate="'required'"
                      v-model="joinData.addr"
                      @click="openPostCode"
                    />
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('address')">
                    주소가 입력되지 않았습니다.
                  </p>
                </div>
                <div class="form-row">
                  <div class="text-field" :class="{'text-field-error' : errors.has('detail_address')}">
                    <input
                      type="text"
                      name="detail_address"
                      placeholder="상세주소"
                      autocomplete="address-line2"
                      maxlength="30"
                      ref="detailAddress"
                      v-validate="'required'"
                      v-model="joinData.addrDetail"
                    />
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('detail_address')">
                    상세주소가 입력되지 않았습니다.
                  </p>
                  <p class="txt-delivery">※ 현재 서울 전지역과 경기 일부 지역에 한하여 서비스를 제공하고 있습니다. <a href="//www.naver.com" target="_blank">(배송지역 보기)</a></p>
                </div>
              </div>
            </div>
            <div>
              <p class="txt-form-title">연령대</p>
              <ul class="list-flex">
                <li class="item w-33 h-50" @click="clickAgeRange('number', $event)">20대</li>
                <li class="item w-33 h-50" @click="clickAgeRange('number', $event)">30대</li>
                <li class="item w-33 h-50" @click="clickAgeRange('number', $event)">40대</li>
              </ul>
              <ul class="list-flex" style="margin-top: -1px">
                <li class="item w-33 h-50" @click="clickAgeRange('range', $event)">초반</li>
                <li class="item w-33 h-50" @click="clickAgeRange('range', $event)">중반</li>
                <li class="item w-33 h-50" @click="clickAgeRange('range', $event)">후반</li>
              </ul>
            </div>
            <!-- 추가 정보 -->
            <div class="more-info">
              <p class="txt-form-title">추가 정보</p>
              <div class="form-row">
                <date-picker
                  :lang="datepickerConfig.lang"
                  :format="'MM-DD'"
                  v-model="joinData.ann"
                >
                </date-picker>
              </div>
            </div>
            <!-- 체크박스 -->
            <div>
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="private_flag"
                  id="private_flag">
                <label
                  class="custom-control-label"
                  for="private_flag">
                  개인정보의 수집 및 이용에 대한 동의
                </label>
                <a href="#" class="custom-control-link" @click="viewModal('private')">자세히보기</a>
              </div>
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="use_flag"
                  id="use_flag">
                <label
                  class="custom-control-label"
                  for="use_flag">
                  이용약관
                </label>
                <a href="#" class="custom-control-link" @click="viewModal('use')">자세히보기</a>
              </div>
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="marketingFlag"
                  id="marketingFlag">
                <label
                  class="custom-control-label"
                  @click="toggleMarketing"
                  for="marketingFlag">
                  [선택] 마케팅 정보 수신 동의
                </label>
                <a href="#" class="custom-control-link" @click="viewModal('marketing')">자세히보기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-complete">
        <button class="btn btn-primary h-56" type="button" @click="validateBeforeSubmit">다음</button>
      </div>
    </form>
    <modal name="postCode" height="auto" width="90%" :scrollable="true" :adaptive="true">
      <CommonModal modalTitle="주소찾기" :modalCustomCloseFunc="closePostCode">
        <DaumPostCode @complete="completePostCode"></DaumPostCode>
      </CommonModal>
    </modal>
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import DatePicker from 'vue2-datepicker';
import CommonModal from '@/components/common/modal/CommonModal';
import Simplert from 'vue2-simplert';
import Info from '@/info';

const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인', // 닫기 버튼 텍스트
};
export default {
  name: 'signUp-first',
  components: {
    DatePicker,
    CommonModal,
    Simplert
  },
  data() {
    return {
      // DatePicker Config
      datepickerConfig: {
        lang: {
          days: ['일','월','화','수','목','금','토'],
          months: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
          placeholder: {
            date: '기념임을 입력하시면, 기념일날 할인 쿠폰 지급'
          }
        }
      },
      pwdMsg: '비밀번호를 입력해주세요.',
      isPwd: false,
      authErr: false,
      authErrMessage: '',
      personalText: Info.Personal.text, // 개인정보취급방침
      termsText: Info.Terms.text, // 서비스 약관
      marketingText: Info.Marketing.text, // 마케팅 동의
      // 회원가입 정보
      joinData: {
        age: 0,
        name: '',
        email: '',
        password: '',
        phone: '',
        ann: null,
        zipcode: '',
        addr: '',
        addrDetail: '',
        marketingAgree: 'N',
      },
      selectedAgeRange: {
        number: '',
        range: ''
      },
      resultPostCode: {} // 주소 결과값
    };
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin',
      PhoneVerify: 'signup/PhoneVerify'
    }),
  },
  methods: {
    ...mapActions({
      setJoin: 'signup/setJoin',
      postPhone: 'signup/postPhone',
      patchPhone: 'signup/patchPhone',
    }),
    openPostCode() {
      this.$modal.show('postCode');
    },
    closePostCode() {
      this.$modal.hide('postCode');
    },
    completePostCode(result) {
      if (result.userSelectedType === 'R') {
        //  도로명 주소
        this.joinData.addr = result.roadAddress;
      } else {
        //  지번 주소
        this.joinData.addr = result.jibunAddress;
      }
      this.joinData.zipcode = result.zonecode;
      this.$refs.detailAddress.focus();
      this.closePostCode();
    },
    viewModal(param) {
      let modalConfig = {};
      if (param === 'private') {
        modalConfig = {
          modalTitle: '개인 정보 관리 지침',
          modalContent: this.personalText,
          modalContentType: 'html'
        }
      } else if (param === 'use') {
        modalConfig = {
          modalTitle: '서비스 약관',
          modalContent: this.termsText,
          modalContentType: 'html'
        }
      } else if (param === 'marketing') {
        modalConfig = {
          modalTitle: '마케팅 정보 수신 동의',
          modalContent: this.marketingText,
          modalContentType: 'html'
        }
      }

      this.$modal.show(
        CommonModal,
        modalConfig,
        {
          scrollable: true,
          height: 'auto',
          width: '80%',
          adaptive: true,
        }
      );
    },
    pwdCheck(isBoolean) {
      const pwd = document.querySelector('input[name=password]');

      let checkBoolean = isBoolean;
      if (pwd.value === '') {
        if (!checkBoolean) checkBoolean = !checkBoolean;
        this.pwdMsg = '비밀번호를 입력해주세요.';
      } else {
        this.pwdMsg = '비밀번호가 안전하지 않습니다. (최소 8자리 이상의 영문,숫자,특수문자 포함)';
      }

      this.isPwd = !checkBoolean;
    },
    async clickPhoneVerify(event) {
      const joinForm = document.joinForm,
        email = joinForm.email,
        phone = joinForm.phone,
        phoneAuthNumber = joinForm.phoneAuthNumber;

      if( !this.joinData.email ) {
        _.assign(alertObject, {
          message: '이메일을 먼저 입력해주세요.',
          onClose: function() {
            email.focus();
          }
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }

      this.$validator.validate('phone', phone.value).then((result) => {
        if (result) {
          const phoneData = {
            email: _.trim(this.joinData.email),
            phone: _.trim(this.joinData.phone)
          };
          this.postPhone(phoneData).then(res => {
            if (res.data.result) {
              event.target.disabled = true;
              this.startTimer();
              this.authErr = true;
              phoneAuthNumber.focus();
            } if (res.data.phoneDuplicated) {
              _.assign(alertObject, {
                message: '이미 등록된 핸드폰 번호입니다. 다시 확인해 주세요.',
              });
              this.$refs.alert.openSimplert(alertObject);
            }
            if (res.data.emailDuplicated) {
              _.assign(alertObject, {
                message: '이미 등록된 이메일 주소입니다. 다시 확인해 주세요.',
              });
              this.$refs.alert.openSimplert(alertObject);
            }
          });
        } else {
          _.assign(alertObject, {
            message: '올바른 휴대폰번호를 입력해주세요.'
          });
          this.$refs.alert.openSimplert(alertObject);
        }
      });
    },
    async authKeyConfirm() {
      const joinForm = document.joinForm,
        phoneAuthNumber = joinForm.phoneAuthNumber;

      if (this.PhoneVerify.authId === null || this.PhoneVerify.authId === '') {
        _.assign(alertObject, {
          message: '먼저 휴대전화를 입력하고 인증버튼을 눌러주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return false;
      }

      if (phoneAuthNumber.value === '') {
        _.assign(alertObject, {
          message: '인증번호를 입력해주세요.',
          onClose: function() {
            phoneAuthNumber.focus();
          }
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }

      let formData = {
        authId: this.PhoneVerify.authId,
        authNumber: phoneAuthNumber.value
      };
      await this.patchPhone(formData);

      if (this.PhoneVerify.isVerify) {
        const phone = document.querySelector('input[name=phone]');
        _.assign(alertObject, {
          message: '인증되었습니다.'
        });
        this.$refs.alert.openSimplert(alertObject);
        document.querySelector('#phoneVerify').disabled = true;
        document.querySelector('#authKeyConfirm').disabled = true;
        phone.disabled = true;
        phoneAuthNumber.disabled = true;
        this.authErr = false;
        clearInterval(window.interval);
      } else {
        _.assign(alertObject, {
          message: '인증번호를 다시 확인하시고 진행해주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
      }

      return true;
    },
    startTimer() {
      const timer = Date.parse(new Date(new Date().getTime() + (0.3 * 60 * 1000))) / 1000;
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
          _.assign(alertObject, {
            message: '시간이 초과되었습니다. 다시 인증해주십시오.'
          });
          this.$refs.alert.openSimplert(alertObject);
          document.querySelector('#phoneVerify').disabled = false;
          this.authErr = false;
        }
      }, 1000);

      window.interval = interval;
    },

    clickAgeRange(type, event) {
      this.selectedAgeRange[type] = event.target.innerText;
      if (!event.target.classList.contains('selected')) {
        _.forEach(event.target.closest('ul').querySelectorAll('li'), function(value){
          value.classList.remove('selected')
        });
        event.target.classList.add('selected');
      }
    },
    toggleMarketing() {
      const isChecked = document.joinForm.marketingFlag.checked;
      if (isChecked) {
        this.joinData.marketingAgree = 'N';
      } else {
        this.joinData.marketingAgree = 'Y';
      }
    },
    validateBeforeSubmit() {
      const $this = this;
      const joinForm = document.joinForm;

      this.$validator.validateAll().then((result) => {
        if (result) {
          const privateFlag = joinForm.private_flag.checked;
          const useFlag = joinForm.use_flag.checked;
          if (!privateFlag) {
            _.assign(alertObject, {
              message: '개인정보의 수집 및 이용에 동의해주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
            return;
          }
          if (!useFlag) {
            _.assign(alertObject, {
              message: '이용약관을 확인해주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
            return;
          }

          if (_.isEmpty(this.selectedAgeRange.number)) {
            _.assign(alertObject, {
              message: '연령대(20대/30대/40대)를 선택해 주세요..'
            });
            this.$refs.alert.openSimplert(alertObject);
            return;
          }
          if (_.isEmpty(this.selectedAgeRange.range)) {
            _.assign(alertObject, {
              message: '연령대(초반/중반/후반)을 선택해 주세요..'
            });
            this.$refs.alert.openSimplert(alertObject);
            return;
          }
          if (this.PhoneVerify.isVerify) {
            if (this.joinData.ann !== null) {
              this.joinData.ann = this.$moment(this.joinData.ann).format('MM.DD');
            }
            // 연령대
            if (this.selectedAgeRange.number === '20대') {
              if (this.selectedAgeRange.range === '초반') {
                this.joinData.age = 16001;
              } else if (this.selectedAgeRange.range === '중반') {
                this.joinData.age = 16002;
              } else {
                this.joinData.age = 16003;
              }
            } else if (this.selectedAgeRange.number === '30대') {
              if (this.selectedAgeRange.range === '초반') {
                this.joinData.age = 16004;
              } else if (this.selectedAgeRange.range === '중반') {
                this.joinData.age = 16005;
              } else {
                this.joinData.age = 16006;
              }
            } else {
              if (this.selectedAgeRange.range === '초반') {
                this.joinData.age = 16007;
              } else if (this.selectedAgeRange.range === '중반') {
                this.joinData.age = 16008;
              } else {
                this.joinData.age = 16009;
              }
            }
            this.setJoin(this.joinData);
            this.$router.push({ path: '/join/signup/2' });
            return;
          }
          _.assign(alertObject, {
            message: '휴대전화 인증을 진행해주세요.'
          });
          this.$refs.alert.openSimplert(alertObject);
          return;
        }
        document.querySelectorAll('.text-field-error input')[0].setAttribute('tabindex', -1);
        document.querySelectorAll('.text-field-error input')[0].focus();
        document.querySelectorAll('.text-field-error input')[0].setAttribute('tabindex', null);
      });
    },
  },
  created() {
    if (!_.isEmpty(this.Join)) {
      this.joinData = {
        name: this.Join.name ? this.Join.name : '',
        email: this.Join.email ? this.Join.email : '',
        phone: this.Join.phone ? this.Join.phone : ' ',
        skirtSize: this.Join.skirtSize ? this.Join.skirtSize : null,
        pantsSize: this.Join.pantsSize ? this.Join.pantsSize : null,
        bodyType: this.Join.bodyType ? this.Join.bodyType : null,
      }
    }
  },
  mounted() {
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/join-style.scss"></style>
<style scoped lang="scss">
.contents {
  .content {
    .column {
      // Left
      .user-account {
      }
      // Right
      .contact-info {
        padding-top: 26px;
      }
      .more-info {
        padding-top: 26px;
        .form-row {
          margin-bottom: 19px;
        }
      }
      .custom-checkbox {
        margin-bottom: 8px;
      }
    }
  }
}
.txt-delivery {
  @include fontSize(14px);
  color: $color-secondary;
  margin-top: 10px;
}
.form-row {
  margin-bottom: 10px;
}
@media (min-width: 768px) {
  .contents {
    .content {
      .column {
        .contact-info {
          padding-top: 0;
        }
      }
    }
  }
}
</style>
