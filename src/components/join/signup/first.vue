<template>
  <div class="container">
    <div class="container-header">
      <p class="signup-title">정기구독/회원가입</p>
      <div class="line line__default"></div>
    </div>
    <div class="contents">
      <form name="joinForm">
        <div class="inner">
          <!--Left Side -->
          <div class="content">
            <div class="user-account">
              <p class="txt-point">사용자 계정</p>
              <div>
                <div class="form-row">
                  <div :class="{error : errors.has('name')}">
                    <input
                      autocomplete="name"
                      type="text"
                      class="form-input"
                      name="name"
                      v-validate="'required'"
                      maxlength="15"
                      v-model="joinFirst.name"
                      placeholder="이름">
                  </div>
                  <p
                    v-if="errors.has('name')"
                    class="txt-error">
                    이름을 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div :class="{error : errors.has('email')}">
                    <input
                      autocomplete="email"
                      type="email"
                      class="form-input"
                      name="email"
                      v-validate="'required|email'"
                      v-model="joinFirst.email"
                      maxlength="50"
                      placeholder="이메일">
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('email')">
                    이메일을 정확하게 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div :class="{error : errors.has('password')}">
                    <input
                      autocomplete="new-password"
                      type="password"
                      class="form-input"
                      placeholder="비밀번호 8자리 이상의 영문,숫자,특수문자 포함"
                      name="password"
                      v-validate="{ required: true, regex: pwdRegex }"
                      @keyup="pwdCheck(errors.has('password'))"
                      v-model="joinFirst.password"
                      maxlength="256">
                  </div>
                  <p
                    class="txt-error"
                    v-show="errors.has('password')">
                    {{ pwdMsg }}
                  </p>
                </div>
                <div class="form-row">
                  <div :class="{error : errors.has('password_confirm')}">
                    <input
                      autocomplete="new-password"
                      type="password"
                      class="form-input"
                      name="password_confirm"
                      placeholder="비밀번호 확인"
                      v-validate="'required|confirmed:password'"
                      @change="pwdConfirm(errors.has('passwordConfirmation'))"
                      maxlength="256">
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('password_confirm')">
                    비밀번호가 일치하지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!--Right Side-->
          <div class="
          content">
            <!-- 연락처 정보 -->
            <div class="contact-info">
              <p class="txt-point">연락처 정보</p>
              <div>
                <div class="form-row">
                  <div class="form-group" data-grid="7:3" :class="{error : errors.has('phone')}">
                    <input
                      autocomplete="tel-national"
                      type="tel"
                      class="form-input"
                      name="phone"
                      v-validate="'required'"
                      maxlength="14"
                      v-model="joinFirst.phone"
                      placeholder="핸드폰번호">
                    <button
                      @click="phoneVerify"
                      type="button"
                      id="phoneVerify"
                      class="btn btn-secondary">
                      인증
                    </button>
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('phone')">
                    휴대전화를 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div class="form-group" data-grid="7:3" :class="{error : errors.has('phone_auth_number')}">
                    <input
                      autocomplete="tel-extension"
                      name="phone_auth_number"
                      type="number"
                      class="form-input"
                      v-validate="'required'"
                      placeholder="인증번호">
                    <button
                      type="button"
                      id="authKeyConfirm"
                      @click="authKeyConfirm"
                      class="btn btn-secondary">
                      확인
                    </button>
                  </div>
                  <p
                    class="txt-error"
                    v-if="authErr">
                    {{ authErrMessage }}
                  </p>
                </div>
                <div class="form-row">
                  <div class="form-group" data-grid="7:3" :class="{error : errors.has('zipcode')}">
                    <input
                      autocomplete="postal-code"
                      type="text"
                      class="form-input"
                      placeholder="우편번호"
                      v-validate="'required'"
                      v-model="joinFirst.zipcode"
                      @click="openDaumPopup"
                      readonly
                      name="zipcode">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="openDaumPopup">
                      주소찾기
                    </button>
                  </div>
                  <p></p>
                </div>
                <div class="form-row">
                  <div :class="{error : errors.has('address')}">
                    <input
                      autocomplete="address-line1"
                      type="text"
                      class="form-input"
                      placeholder="주소"
                      v-validate="'required'"
                      readonly
                      maxlength="30"
                      v-model="joinFirst.addr"
                      @click="openDaumPopup"
                      name="address">
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('address')">
                    주소가 입력되지 않았습니다.
                  </p>
                </div>
                <div class="form-row">
                  <div :class="{error : errors.has('detail_address')}">
                    <input
                      autocomplete="address-line2"
                      type="text"
                      class="form-input"
                      placeholder="상세주소"
                      v-validate="'required'"
                      maxlength="30"
                      v-model="joinFirst.addrDetail"
                      name="detail_address">
                  </div>
                  <p
                    class="txt-error"
                    v-if="errors.has('detail_address')">
                    상세주소가 입력되지 않았습니다.
                  </p>
                </div>
              </div>
            </div>
            <!-- 추가 정보 -->
            <div class="more-info">
              <p class="txt-point">[선택] 추가 정보</p>
              <div class="form-row">
                <datepicker
                  name="ann"
                  input-class="form-input"
                  placeholder="기념일을 입력하시면, 기념일날 할인 쿠폰 지급"
                  language="ko"
                  v-model="joinFirst.ann"
                  format="MM.dd">
                </datepicker>
                <!--<input
                  placeholder="기념임을 입력하시면, 기념일날 할인 쿠폰 지급"
                  class="form-input"
                  type="text"
                  onfocus="(this.type='date')"
                  onfocusout="(this.type='text')"
                  id="date">-->
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
        <div class="btn-next">
          <button class="btn btn-primary" type="button" @click="validateBeforeSubmit">다음</button>
        </div>
      </form>
    </div>
    <address-modal ref="address" dataId="address"></address-modal>
    <signup-modal ref="private" dataId="private" title="개인 정보 관리 지침" :content="personalText"></signup-modal>
    <signup-modal ref="use" dataId="use" title="서비스 약관" :content="termsText"></signup-modal>
    <signup-modal ref="marketing" dataId="marketing" title="마케팅 정보 수신 동의" :content="marketingText"></signup-modal>
    <alert-modal ref="view" width="320" height="190"></alert-modal>
  </div>
  <!--<div class="signup subContent mauto">
    <div class="content-title mt70">정기구독/회원가입</div>
    <div class="signupLine mt25"></div>

    <div class="w100 mt30 mauto">
      <div class="signup-area d-inlinetable" style="margin-right: 30px;">
        <div class="signup-title-detail">사용자 계정</div>
        <div class="field" :class="{ error: errors.has('name') }">
          <input type="text" name="name" class="form-login-input mt20" placeholder="이름" v-validate="'required'" maxlength="15" />
          <span class="error" v-show="errors.has('name')">이름을 입력해주세요.</span>
        </div>
        <div class="field" :class="{ error: errors.has('email') }">
          <input type="text" name="email" class="form-login-input mt12" placeholder="이메일" v-validate="'required|email'" maxlength="50" />
          <span class="error" v-show="errors.has('email')">이메일을 정확하게 입력해주세요.</span>
        </div>
        <div class="field" :class="{ error: errors.has('password') }">
          <input type="password" name="password" class="form-login-input mt12" placeholder="비밀번호 8자리 이상의 영문,숫자,특수문자 포함" v-validate="{ required: true, regex: pwdRegex }" @keyup="pwdCheck(errors.has('password'))" maxlength="256" />
          <span class="error" v-show="errors.has('password')">{{ pwdMsg }}</span>
        </div>
        <div class="field" :class="{ error: errors.has('password_confirm') }">
          <input type="password" name="password_confirm" class="form-login-input mt12" placeholder="비밀번호 확인" v-validate="'required|confirmed:password'" @change="pwdConfirm(errors.has('passwordConfirmation'))" maxlength="256" />
          <span class="error" v-show="errors.has('password_confirm')">비밀번호가 일치하지 않습니다.</span>
        </div>
      </div>
      <div class="signup-area signup-area-last d-inlinetable">
        <div class="signup-title-detail">연락처 정보</div>
        <div class="field" :class="{ error: errors.has('phone') }">
          <div class="inputGroup">
            <input type="text" name="phone" class="form-login-group mt20" placeholder="휴대전화" style="width: 72%;" v-validate="'required'" maxlength="14" />
            <div style="display: inline-table; width: 3%;"></div>
            <button id="phoneVerify" class="button-grey" style="width: 25%;" @click="phoneVerify">인증</button>
          </div>
          <span class="error" v-show="errors.has('phone')">휴대전화를 입력해주세요.</span>
        </div>
        <div class="field" :class="{ error: errors.has('phone_auth_number') }">
          <div class="inputGroup">
            <input type="text" name="phone_auth_number" class="form-login-group mt12" placeholder="인증번호" style="width: 72%;" v-validate="'required'" />
            <div style="display: inline-table; width: 3%;"></div>
            <button id="authKeyConfirm" class="button-grey" style="width: 25%;" @click="authKeyConfirm">확인</button>
          </div>
          <span class="error" v-show="authErr">{{ authErrMessage }}</span>
        </div>
        <div class="field datepicker">
          <datepicker name="ann" class="mt12" input-class="form-login-input" placeholder="기념일을 입력하시면, 기념일날 할인 쿠폰 지급" language="ko" format="MM.dd"></datepicker>
        </div>
        <div class="field" :class="{ error: errors.has('zipcode') }">
          <div class="inputGroup">
            <input type="text" name="zipcode" class="form-login-group mt12" placeholder="우편번호" style="width: 72%;" v-validate="'required'" />
            <div style="display: inline-table; width: 3%;"></div>
            <button class="button-grey" style="width: 25%;" @click="openDaumPopup">주소찾기</button>
          </div>
        </div>
        <div class="field" :class="{ error: errors.has('address') }">
          <input type="text" name="address" class="form-login-input mt12" placeholder="주소" v-validate="'required'" maxlength="30" />
          <span class="error" v-show="errors.has('address')">주소가 입력되지 않았습니다.</span>
        </div>
        <div class="field" :class="{ error: errors.has('detail_address') }">
          <input type="text" name="detail_address" class="form-login-input mt12" placeholder="상세주소" v-validate="'required'" maxlength="30" />
          <span class="error" v-show="errors.has('detail_address')">상세주소가 입력되지 않았습니다.</span>
        </div>
        <div class="signup-chk-area mt15">
          <label class="container">
            <input type="checkbox" name="private_flag" value="Y" />
            <span class="checkmark"></span>
          </label>
          <div class="checkboxText">
            개인정보의 수집 및 이용에 대한 동의
            <span style="margin-left: 5px;" @click="viewModal('private')">자세히 보기</span>
          </div>
        </div>
        <div class="signup-chk-area mt12">
          <label class="container">
            <input type="checkbox" name="use_flag" value="Y" />
            <span class="checkmark"></span>
          </label>
          <div class="checkboxText">
            이용약관
            <span style="margin-left: 5px;" @click="viewModal('use')">자세히 보기</span>
          </div>
        </div>
      </div>
      <div class="mt40">
        <div id="next-btn" class="next-btn" style="width: 392px; float: right;">
          <button class="button-login button-next" @click="validateBeforeSubmit">
            다음 (12/13)
          </button>
        </div>
      </div>
    </div>
    <address-modal ref="address" dataId="address"></address-modal>
    <signup-modal ref="private" dataId="private" title="개인정보 관리 지침" :content="privateText"></signup-modal>
    <signup-modal ref="use" dataId="use" title="이용약관"></signup-modal>
  </div>-->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import AddressModal from '@/components/common/AddressModal';
import SignupModal from '@/components/common/SignupModal';
import Info from '@/info';
import AlertModal from '@/components/common/AlertModal';

export default {
  name: 'signUp-first',
  components: {
    Datepicker,
    AddressModal,
    SignupModal,
    AlertModal,
  },
  data() {
    return {
      pwdRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&^])[A-Za-z\d$@$!%*?&]{8,}/,
      pwdMsg: '비밀번호를 입력해주세요.',
      isPwd: false,
      isPwdConfirm: false,
      authErr: false,
      authErrMessage: '',
      personalText: Info.Personal.text, // 개인정보취급방침
      termsText: Info.Terms.text, // 서비스 약관
      marketingText: Info.Marketing.text,
      joinFirst: {
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
    };
  },
  computed: mapGetters({
    isLogin: 'login/isLogin',
    phoneAuthKey: 'signup/getPhoneAuthKey',
    phoneVerifyResult: 'signup/getPhoneVerify',
    phoneAuth: 'signup/getPhoneAuth',
  }),
  watch: {
    phoneVerifyResult(value) {
      if (value) {
        this.startTimer();
        this.authErr = true;
      }
    },
  },
  methods: {
    ...mapActions({
      setFirstData: 'signup/setFirstData',
      setJoinFirst: 'signup/setJoinFirst',
      actPhoneVerify: 'signup/phoneVerify',
      actPhoneCheckVerify: 'signup/phoneCheckVerify',
    }),
    viewModal(ref) {
      this.$refs[ref].openModal();
    },
    closeModal(ref) {
      this.$refs[ref].closeModal();
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

      if (checkBoolean) this.isPwd = false;
      else this.isPwd = true;
    },
    pwdConfirm(isBoolean) {
      if (isBoolean) this.isPwdConfirm = false;
      else this.isPwdConfirm = true;
    },
    async phoneVerify() {
      const email = document.querySelector('input[name=email]');
      const phone = document.querySelector('input[name=phone]');

      if (!this.$common.InputDataValidation(email, '이메일을 먼저 입력해주세요.', true)) return;

      this.$validator.validate('phone', phone.value).then((result) => {
        if (result) {
          if (this.$common.phoneValidation(phone.value)) {
            this.actPhoneVerify({
              email: email.value,
              phone: phone.value.split('-').join(''),
            });

            return true;
          }
          this.$common.viewAlertModal('올바른 휴대폰번호를 입력해주세요.', this.$refs, 'alert');
          // alert('올바른 휴대폰번호를 입력해주세요.');
        }

        phone.focus();
        return false;
      });
    },
    async authKeyConfirm() {
      const phoneAuthNumber = document.querySelector('input[name=phone_auth_number]');

      if (!this.phoneAuthKey) {
        this.$common.viewAlertModal('먼저 휴대전화를 입력하고 인증버튼을 눌러주세요.', this.$refs, 'alert');
        // alert('먼저 휴대전화를 입력하고 인증버튼을 눌러주세요.');
        return false;
      }

      if (!this.$common.InputDataValidation(phoneAuthNumber, '인증번호를 입력해주세요.', true)) return false;

      await this.actPhoneCheckVerify({
        authNumber: phoneAuthNumber.value,
      });

      if (this.phoneAuth) {
        const phone = document.querySelector('input[name=phone]');

        alert('인증되었습니다.');
        document.querySelector('#phoneVerify').disabled = true;
        document.querySelector('#authKeyConfirm').disabled = true;
        phone.disabled = true;
        phoneAuthNumber.disabled = true;
        this.authErr = false;
      } else this.$common.viewAlertModal('인증번호를 다시 확인하시고 진행해주세요.', this.$refs, 'alert'); /*alert('인증번호를 다시 확인하시고 진행해주세요.');*/

      return true;
    },
    validateBeforeSubmit() {
      const joinForm = document.joinForm;
      const $this = this;

      this.$validator.validateAll().then((result) => {
        if (result) {
          const privateFlag = joinForm.private_flag.checked;
          const useFlag = joinForm.use_flag.checked;
          if (!privateFlag) {
            this.$common.viewAlertModal('개인정보의 수집 및 이용에 동의해주세요.', this.$refs, 'alert');
            // alert('개인정보의 수집 및 이용에 동의해주세요.');
            return;
          }
          if (!useFlag) {
            this.$common.viewAlertModal('이용약관을 확인해주세요.', this.$refs, 'alert');
            // alert('이용약관을 확인해주세요.');
            return;
          }
          if (this.phoneAuth) {

            if (this.joinFirst.ann !== null) {
              this.joinFirst.ann = this.$moment(this.joinFirst.ann).format('MM.DD');
            }

            // LocalStorage에 보내기
            this.$localStorage.set('JoinFirst', JSON.stringify(_.omit(this.joinFirst, ['password'])));
            // Store에 보내기
            this.setJoinFirst(this.joinFirst);
            this.$router.push({ path: '/join/signup/2' });
            return;
          }
          this.$common.viewAlertModal('휴대전화 인증을 진행해주세요.', this.$refs, 'alert');
          // alert('휴대전화 인증을 진행해주세요.');
          return;
        }
        document.querySelectorAll('div.error')[0].setAttribute('tabindex', -1);
        document.querySelectorAll('div.error')[0].focus();
        document.querySelectorAll('div.error')[0].setAttribute('tabindex', null);
      });
    },
    openDaumPopup() {
      this.viewModal('address');
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
            this.joinFirst.zipcode = data.zonecode;
            // zipcode.value = data.zonecode;

            if (data.userSelectedType === 'R') {
              this.joinFirst.addr = data.roadAddress;
            } else {
              this.joinFirst.addr = data.jibunAddress;
            }
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
    // 마케팅 정보 수신 동의관련 스크립트.
    toggleMarketing() {
      const isChecked = document.joinForm.marketingFlag.checked;
      if (isChecked) {
        this.joinFirst.marketingAgree = 'N';
      } else {
        this.joinFirst.marketingAgree = 'Y';
      }
    },
  },
  created() {
    const htmlScript = document.createElement('script');
    htmlScript.setAttribute('src', 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false');
    document.head.appendChild(htmlScript);
  },
  mounted() {
    let localStorage = this.$localStorage.get('JoinFirst');
    if (localStorage) {
      localStorage = JSON.parse(localStorage);
      _.assign(this.joinFirst, localStorage);
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.btnFixedEvt);
  },
  destroyed() {
    window.removeEventListener('scroll', this.btnFixedEvt);
  },
};
</script>

<style scoped lang="scss">
  @mixin clearfix {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .container {
    padding: {
      top: 24px;
      left: 20px;
      right: 20px;
      bottom: 17px;
    }
    .container-header {
      .signup-title {
        font-size: 26px;
        line-height: 34px;
        letter-spacing: -1.4px;
        text-align: center;
      }
    }
    .contents {
      .content {
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
      .btn-next {
        width: 100%;
        margin-top: 41px;
        button {
          width: 100%;
          height: 50px;
        }
      }
    }
  }

  .txt-point {
    margin-bottom: 13px;
  }
  .form-row {
    margin-bottom: 10px;
  }
  .line {
    margin: 16px 0;
    border-width: 2px;
  }
  @media (min-width:768px) {
    .container {
      width: 795px;
      margin-top: 0px;
      margin-right: auto;
      margin-bottom: 0px;
      margin-left: auto;
      padding: 74px 0 0 0;
      .container-header {
        .signup-title {
          font-size: 32px;
          line-height: 40px;
          letter-spacing: -1.7px;
        }
        .line {
          margin: 26px 0 24px 0;
        }
      }
      .contents {
        display: table;
        margin: 0 auto;
        .inner {
          @include clearfix;
        }
        .content {
          width: 382px;
          &:nth-child(1) {
            float: left;
            margin-right: 30px;
          }
          &:nth-child(2) {
            float: left;
          }
          .contact-info {
            padding-top: 0;
          }
        }
        .btn-next {
          position: relative;
          margin-top: 35px;
          left: auto;
          bottom: auto;
          right: auto;
          text-align: right;
          button {
            width: 382px;
            font-size: 16px;
          }
        }

      }
    }
  }
</style>
